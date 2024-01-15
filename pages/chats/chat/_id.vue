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
          <ChatUsername v-if="chat" :chat="chat" :loggedInUser="user" />
        </div>
      </v-toolbar-title>

      <v-spacer />

      <ChatActionsbtn v-if="chat && chat.id" :chatId="chat.id" />
    </v-app-bar>
    <v-container class="pa-0 fill-height align-end">
      <v-row class="pa-6 mt-5" v-if="loading">
        <v-col>
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
        </v-col>
      </v-row>

      <v-card color="transparent" class="chatBox elevation-0 pt-14 mt-5 mb-14">
          <template v-for="(message, index) in messages">
            <ChatMessage :message="message" :chat="chat" :key="index" v-intersect="onIntersect" class="chat-message" :id="`message-${message.id}`" />
          </template>
          <div v-if="chat && chat.typing.length > 0" class="typing-indicator">
            {{ formatTypingUsers(chat.typing) }}
          </div>
          <div id="bottomOfChat"></div>
      </v-card>

      <v-app-bar color="transparent" class="align-center formMessageInput" flat bottom fixed style="top:calc(100% - 180px)">
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
  onMounted, onUnmounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatsChatId',
  middleware: 'authenticated',
  directives: { Intersect },
  setup () {
    const {
      $notify,
      $fire,
      $vuetify,
      $capacitor,
      $encryption,
      $system, i18n,
      error
    } = useContext()
    const {
      dispatch,
      state
    } = useStore()
    const loading = ref(true)
    const chatLoading = ref(true)
    const route = useRoute()
    const user = computed(() => state.user)

    // DEFINE CONTENT
    const newMessage = ref()
    const messages = ref([])
    const chat = ref()
    const chatId = ref()
    const users = ref({})
    const messageListener = ref()
    const imageMessageUrl = ref()

    const isTyping = ref(false);
    const typingUsers = ref([]);

    $capacitor.AdMob_hideBanner()

    // METHODS
    const loadChat = () => {
      chatLoading.value = true
      
      try {
        if (chatId.value) {
          const chatDocRef = $fire.firestore.collection('Chats').doc(chatId.value);
          chatDocRef.onSnapshot(async (res) => {
            if (res.exists) {
              chat.value = res.data();
              
              for(const id in chat.value.participants) {
                const u = await dispatch('user/getOne', chat.value.participants[id])
                if (u) {
                  users.value[chat.value.participants[id]] = {...u}
                }
              }
            }
          }, error => {
            console.error("Error listening to chat updates:", error);
          });
        }
      } catch(e) {
        console.log(e)
        $system.log({
          comp: 'ChatsChatId',
          msg: 'getOne',
          val: e
        })
        error({ statusCode: 404 })
      } finally {
        chatLoading.value = false
      }
    };
    const loadMessages = () => {
      messages.value = []
      loading.value = true
      try {
        messageListener.value = $fire.firestore
          .collection(`Chats/${chatId.value}/Messages`)
          .orderBy('created_at', 'asc')
          .limitToLast(100)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                const data = change.doc.data()
                data.id = change.doc.id
                // MERGE user data with the message
                data.ownerData = users.value[data.owner]

                if (data.message) {
                  data.message = $encryption.decrypt(data.message)
                }
                messages.value.push(data)
                goToBottom()
              }
            })
          })
      } catch (e) {
        console.log('ERROR LOADING MESSAGES', e)
      } finally {
        loading.value = false
      }
    }
    const updateTypingStatus = async (typing) => {
      try {
        const value = typing ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
        return await dispatch('chats/updateField', {
            id: chatId.value,
            typing: value
          })
      } catch (error) {
        console.error('Error updating typing status', error);
      }
    };
    const formatTypingUsers = (typingUsers) => {
      const userNames = typingUsers
        .map(userId => {
          const user = users.value[userId];
          return user ? user.username : null;
        })
        .filter(name => name != null);
      
      if (userNames.length === 0) {
        return ''; // No users are typing
      } else if (userNames.length === 1) {
        return `${userNames[0]} is typing...`;
      } else {
        return `${userNames.join(', ')} are typing...`;
      }
    };
    const sendMessage = async () => {
      try {
        if((!newMessage.value && !imageMessageUrl.value) || !user.value.data.uid) {
          $notify.show({
            text: i18n.t('notify.error_try_again'),
            color: 'error'
          })
          return
        }

        let encryptedMessage = null

        // Encrypt message
        if (newMessage.value) {
          encryptedMessage = $encryption.encrypt(newMessage.value)
        }

        // Save message
        await dispatch('chats/messages/add', {
          chatId: chatId.value,
          message: {
            message: encryptedMessage,
            image: imageMessageUrl.value || null,
            owner: user.value.data.uid,
            seen: [
              user.value.data.uid
            ]
          }
        })
        // Update chat last message
        await dispatch('chats/updateField', {
          id: chatId.value,
          lastMessageSent: new Date(),
          lastMessage: newMessage.value || null,
          seen: [
            user.value.data.uid
          ]
        })

        // Reset
        newMessage.value = null
        imageMessageUrl.value = null
        await goToBottom(0)
      } catch (e) {
        $notify.show({
          text: i18n.t('notify.error_try_again'),
          color: 'error'
        })
        console.log("STICKY: Cannot Send Message", e)

      }
    }
    const goToBottom = async (delay = 1000) => {
      setTimeout(() => {
        $vuetify.goTo('#bottomOfChat').then(() => {

          // Update Chat of seen messages
          try {
            if (!chat.value?.seen?.includes(user.value.data.uid)) {
              $fire.firestore.doc(`Chats/${chatId.value}`).update({
                "seen": firebase.firestore.FieldValue.arrayUnion(user.value.data.uid)
              })
            }
            // update notification bubble
            $fire.firestore.doc(`Users/${user.value.data.uid}`).update({
              "notifications.hasMessages": false,
              "has.messages": false,
            })
            // Clear the app bubble
            $capacitor.pushNotificationsClearBadge()

          } catch {
            // ...
          }
        })
      }, delay)
    }
    const goTo = (messageId) => {
      $vuetify.goTo(`#message-${messageId}`)
    }
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
    const imageMessageUrlCallback = (url) => {
      imageMessageUrl.value = url
    }

    // WATCH
    // Wait for chat to finish loading then messages
    watch(chatLoading, () => {
      if (chatLoading.value === false) {
        if (route.value.params.id) {
          $capacitor.AdMob_hideBanner()

          chatId.value = route.value.params.id
          loadMessages()
          goToBottom(2500)
        }
      }
    })
    // This will load with moving back and forth
    watch(route, (r) => {
      // console.log('r/route', r)
      if (r.name.includes('chats-chat-id')) {
        $capacitor.AdMob_hideBanner()

        chatId.value = route.value.params.id
        loadMessages()
        goToBottom()

      } else {
        // Need to stop listening to the changes made to the chat
        try {
          console.log('STICKY: REMOVE CHAT MESSAGE LISTENER')
          messageListener.value()

          $capacitor.AdMob_init()
          $capacitor.AdMob_banner()
        } catch {
          // ...
        }
      }
    })
    
    watch(route, (newRoute) => {
      chatId.value = newRoute.params.id;
      loadChat();
      //loadMessages();
    }, { immediate: true });
    watch(newMessage, (newValue) => {
      if (newValue && !isTyping.value) {
        isTyping.value = true;
        updateTypingStatus(true);
      } else if (!newValue && isTyping.value) {
        isTyping.value = false;
        updateTypingStatus(false);
      }
    }, { immediate: true });

    const handleBeforeUnload = () => {
      if (isTyping.value && chatId.value) {
      // Directly update Firestore
      const chatRef = $fire.firestore.collection('Chats').doc(chatId.value);
      chatRef.update({
        typing: firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
      }).catch(error => {
        console.error('Error updating typing status on beforeunload', error);
      });
      isTyping.value = false; // Set isTyping to false
    }
    };

    onMounted(() => {
      window.addEventListener('beforeunload', handleBeforeUnload);
    });

    onUnmounted(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (isTyping.value) {
        updateTypingStatus(false);
      }
    });

    return {
      loading,
      chat,
      newMessage,
      messages,
      typingUsers, formatTypingUsers,
      users,
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

.chatBox { z-index:0; width: 100%; padding-bottom:120px !important; }

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