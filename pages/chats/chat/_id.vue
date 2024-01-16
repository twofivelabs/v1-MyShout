<template>
  <div>
    <v-app-bar color="white" class="mobileNotch pb-1" app fixed top>
      <v-app-bar-nav-icon>
        <v-btn to="/chats" text color="transparent">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ChatTopavatar v-if="chat" :chat="chat" class="mr-2" />
          <ChatUsername v-if="chat" :chat="chat" :loggedInUser="user.data.uid" />
        </div>
      </v-toolbar-title>

      <v-spacer />

      <ChatActionsbtn v-if="chat && participants" :chat="chat" :participants="participants" />
    </v-app-bar>
    <v-container class="pa-0 fill-height align-end">
      <v-row class="pa-6 mt-5" v-if="messagesLoading">
        <v-col>
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
        </v-col>
      </v-row>

      <v-card color="transparent" class="chatBox elevation-0 pt-14 mt-5 mb-14">
          <template v-for="(message, index) in messages">
            <ChatMessage :message="message" :chat="chat" :owner="participants[message.owner]" :key="index" v-intersect="onIntersect" class="chat-message" :id="`message-${message.id}`" />
          </template>
          <div v-if="chat && chat.typing.length > 0" class="typing-indicator">
            {{ formatTypingUsers(chat.typing) }}
          </div>
          <div id="bottomOfChat"></div>
      </v-card>

      <v-app-bar color="transparent" class="align-center formMessageInput" flat bottom fixed style="top:calc(100% - 145px)">
        <v-text-field
            v-model="newMessage"
            @keydown.enter="sendMessage"
            :label="$t('form.message')"
            type="text"
            hide-details
            solo
        >
          <template v-slot:append-outer>
            <v-btn @click="sendMessage" fab>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
          <template v-slot:append>
            <ChatUploadimage :chat="chat" :currentUrl="imageMessageUrl" @url="imageMessageUrlCallback" />
            <ChatRecordaudio :chat="chat" />

          </template>
        </v-text-field>
      </v-app-bar>
  </v-container>
  </div>
</template>
<script>

// https://fireship.io/courses/vue/
// https://github.com/berksaribas/vuetify-chat/blob/master/src/components/Chat/Chat.vue
// https://github.com/prateekgurnani10/walkie-talkie-chatapp
import lodash from 'lodash';
import firebase from 'firebase';
import 'firebase/functions';

import { Intersect } from 'vuetify/lib/directives';

import {
  defineComponent,
  ref,
  useContext,
  useRoute,
  useStore,
  computed,
  watch,
  onMounted,
  onUnmounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatsChatId',
  middleware: 'authenticated',
  directives: { Intersect },
  setup () {
    // Extracting various functionalities and state from the context.
    const {
      $notify, // Notification functionality.
      $fire, // Firebase functionality.
      $vuetify, // Vuetify functionality.
      $capacitor, // Capacitor (for native mobile functionality).
      $encryption, // Encryption functionality.
      i18n, // Internationalization.
    } = useContext();

    const {
      dispatch, // Vuex dispatch function.
      state // Vuex state.
    } = useStore();
    
    const route = useRoute(); // Current route information.
    const user = computed(() => state.user); // Computed property for the current user.

    // State variables
    const chatLoading = ref(true); // Indicates if the chat document is loading.
    const chatListener = ref(); // Reference for the chat listener
    const chatId = ref(); // ID of the current chat.
    const chat = ref(); // Current chat information.
    const participants = ref({}); // Object of users involved in the chat.
    const messagesLoading = ref(true); // Indicates if the chat messages are loading.
    const messages = ref([]); // Array of chat messages.
    const messageListener = ref(); // Listener for message changes.
    const isTyping = ref(false); // Indicates if the current user is typing.
    const typingUsers = ref([]); // Array of users who are currently typing.
    const newMessage = ref(); // New message input.
    const imageMessageUrl = ref(); // URL for an image message.  

    $capacitor.AdMob_hideBanner(); // Hides the AdMob banner.

    // Load chat document information
    const loadChat = () => {
      chatLoading.value = true
     
      try {
        if (chatId.value) {
          // Listening for changes in the chat document.
          chatListener.value = $fire.firestore.collection("Chats").doc(chatId.value).onSnapshot(async (res) => {
            if (res.exists) {
              chat.value = res.data(); 
              await loadParticipants();
              await loadMessages();
            }
          }, error => {
            console.error("Error listening to chat updates:", error);
          });
        }
      } catch(e) {
        console.log("Error Loading Chat", e)
      } finally {
        // Sets chatLoading to false once the operation is complete
        chatLoading.value = false
      }
    };

    const loadParticipants = async () => {
      try {
        // Looping through the participants of the chat to get their details.
        for(const index in chat.value.participants) {
          const participantUid = chat.value.participants[index]
          const participantProfile = await dispatch('user/getOne', participantUid)
          if (participantProfile) participants.value[participantUid] = participantProfile

        }
      } catch (e) {
        console.log("Error Loading Participants", e)
      }
    }

    // Function to load messages of the chat.
    const loadMessages = () => {
      messages.value = []; // Resets the messages array.
      messagesLoading.value = true // Indicates that message loading is in progress.

      try {
        // Setting up a listener for new messages in the chat.
        messageListener.value = $fire.firestore
          .collection(`Chats/${chatId.value}/Messages`)
          .orderBy('created_at', 'asc') // Orders messages by creation time.
          .limitToLast(100) // Limits the number of messages to the last 100.
          .onSnapshot((snapshot) => {
            // Handling document changes in the chat messages.
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                const data = change.doc.data()
                data.id = change.doc.id // Setting message ID.
                // Merging user data with the message.
                data.ownerData = participants.value[data.owner]

                if (data.message) {
                  data.message = $encryption.decrypt(data.message) // Decrypting the message.
                }
                messages.value.push(data) // Adding the message to the messages array.
                goToBottom() // Scrolls to the bottom of the chat.
              }
            })
          })
      } catch (e) {
        console.log('ERROR LOADING MESSAGES', e)
      } finally {
        // Indicates that message loading is complete.
        messagesLoading.value = false
      }
    }

    // Function to update typing status in Firestore.
    const updateTypingStatus = async (typing) => {
      try {
        const value = typing ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) 
                            : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
        // Dispatches an action to update the 'typing' field in the chat document.
        return await dispatch('chats/updateField', {
            id: chatId.value,
            typing: value
          })
      } catch (error) {
        console.error('Error updating typing status', error); // Logs error on failure.
      }
    };

    // Function to format the usernames of users who are typing.
    const formatTypingUsers = (typingUsers) => {
      const otherTypingUsers = typingUsers.filter(userId => userId !== user.value.data.uid);

      const userNames = otherTypingUsers
        .map(userId => {
          const user = participants.value[userId];
          return user ? user.username : null; // Maps user IDs to usernames.
        })
        .filter(name => name != null); // Filters out null values.

      // Formats the string based on the number of users typing.
      if (userNames.length === 0) {
        return '';
      } else if (userNames.length === 1) {
        return `${userNames[0]} is typing...`;
      } else {
        return `${userNames.join(', ')} are typing...`;
      }
    };

    // Sends a new message.
    const sendMessage = async () => {
      try {
        if((!newMessage.value && !imageMessageUrl.value) || !user.value.data.uid) {
          $notify.show({
            text: i18n.t('notify.error_try_again'),
            color: 'error'
          });
          return;
        }

        let encryptedMessage = null;

        if (newMessage.value) {
          encryptedMessage = $encryption.encrypt(newMessage.value);
        }

        // Dispatch action to add a new message.
        await dispatch('chats/messages/add', {
          chatId: chatId.value,
          message: {
            message: encryptedMessage,
            image: imageMessageUrl.value || null,
            owner: user.value.data.uid,
            seen: [user.value.data.uid]
          }
        });

        // Update chat's last message information.
        await dispatch('chats/updateField', {
          id: chatId.value,
          lastMessageSent: new Date(),
          lastMessage: newMessage.value || null,
          seen: [user.value.data.uid]
        });

        newMessage.value = null;
        imageMessageUrl.value = null;
        await goToBottom(0); // Scroll to bottom after sending a message.
      } catch (e) {
        $notify.show({
          text: i18n.t('notify.error_try_again'),
          color: 'error'
        });
        console.log("STICKY: Cannot Send Message", e);
      }
    };

    // Scrolls to the bottom of the chat.
    const goToBottom = async (delay = 1000) => {
      setTimeout(() => {
        $vuetify.goTo('#bottomOfChat');
      }, delay);
    };

    // Scrolls to a specific message.
    const goTo = (messageId) => {
      $vuetify.goTo(`#message-${messageId}`);
    };
    
    // Intersection handler for messages (e.g., for read receipts).
    const onIntersect = (entries) => {
      const messageId = entries[0].target.id.substring(8)
      const message = lodash.find(messages.value, { id:messageId })

      // Add update chat message
      try {
        if (!message.seen.includes(user.value.data.uid)) {
          $fire.firestore.doc(`Chats/${chatId.value}/Messages/${messageId}`).update({
            "seen": firebase.firestore.FieldValue.arrayUnion(user.value.data.uid)
          })
        }
      } catch (e) {
        // ...
      }
    }

    // Callback for uploading image URL.
    const imageMessageUrlCallback = (url) => {
      imageMessageUrl.value = url
    }

    // Watch for changes in route
    watch(route, (newRoute, oldRoute) => {
      chatId.value = newRoute.params.id

      if (chatId.value && newRoute !== oldRoute) {
        $capacitor.AdMob_hideBanner();
        loadChat(); // Load chat details when route changes
      }
    }, { immediate: true });

   
    // Watches for changes in the newMessage to update typing status.
    watch(newMessage, (newValue) => {
      if (newValue && !isTyping.value) {
        isTyping.value = true;
        updateTypingStatus(true);
      } else if (!newValue && isTyping.value) {
        isTyping.value = false;
        updateTypingStatus(false);
      }
    }, { immediate: true });

    // Handles updating the typing status when the window is unloaded or navigated away from.
    const handleBeforeUnload = () => {
      if (isTyping.value && chatId.value) {
        updateTypingStatus(false);
        isTyping.value = false;
      }
    };

    // Registers event listeners for window unload and navigation away.
    onMounted(() => {
      window.addEventListener('beforeunload', handleBeforeUnload);
    });

    // Cleans up event listeners and updates typing status when the component is unmounted.
    onUnmounted(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Detach Firestore listeners
      if (messageListener.value) messageListener.value();
      if (chatListener && chatListener.value) chatListener.value();
      
      $capacitor.AdMob_init();
      $capacitor.AdMob_banner();

      // Update typing status if it hasn't been updated already
      if (isTyping.value && chatId.value) {
        updateTypingStatus(false);
      }
    });

    return {
      messagesLoading,
      chat,
      newMessage,
      messages, participants,
      typingUsers, formatTypingUsers,
      user,
      imageMessageUrl,
      sendMessage,
      onIntersect,
      goTo,
      imageMessageUrlCallback
    }
  }
})

</script>
<style>

.chatBox { z-index:0; width: 100%; padding-bottom:80px !important; }

#bottomOfChat {
  overflow-anchor: auto;
  height: 1px;
}
.formMessageInput {
  z-index: 999999999;
}
.v-text-field .v-input__control {
  margin-top:5px !important;
}
.v-text-field .v-input__append-outer {
  margin-top:0 !important;
}
.typing-indicator {
  padding: 10px;
  text-align: center;
  color: #666;
  font-size:11px;
}

</style>