<template>
  <div>
    <v-app-bar color="white" class="mobileNotch pb-1" app fixed top>
      <v-app-bar-nav-icon>
        <v-btn to="/chats" text color="transparent">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0" v-if="chat">
        <div class="d-flex align-center">
          <ChatTopavatar :chat="chat" class="mr-2" />
          <ChatUsername :chat="chat" :loggedInUser="user.data.uid" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <ChatActionsbtn v-if="chat && participants" :chat="chat" :participants="participants" :admins="admins" />
    </v-app-bar>

    <v-container v-if="messages && messages.length > 0" style=" z-index: 0; width: 100%; padding-bottom: 100px !important;">
      <template v-for="(message, index) in messages">
        <ChatMessage :key="index" :message="message" :chat="chat" :owner="participants[message.owner]" :participants="participants" v-intersect="onMessageInterest(message)" class="chat-message" :id="`message-${message.id}`" @reply="handleReply" />
      </template>
      <div id="bottomOfChat" />
      <ChatTyping :chat="chat" :participants="participants" />
    </v-container>
    <v-container v-else class="pa-6 mt-5">
      <v-skeleton-loader v-for="x of 4" :key="x" width="100%" max-height="50" type="text" class="mb-6" />
    </v-container>

    <ChatInput :chat="chat" :reply="isReply" @updateReply="handleReply" @updateTyping="updateTypingStatus" />
  </div>
</template>

<script>
import {
  defineComponent,
  nextTick,
  ref,
  useContext,
  useRoute,
  useStore,
  computed,
  watch,
  onMounted, onUnmounted
} from '@nuxtjs/composition-api';

import { Intersect } from 'vuetify/lib/directives';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default defineComponent({
  name: 'ChatsChatId',
  middleware: 'authenticated',
  directives: { Intersect },
  setup() {
    const { $vuetify, $fire, $capacitor, $encryption } = useContext();
    const { dispatch, state } = useStore();
    const route = useRoute();
    const user = computed(() => state.user);

    const chatLoading = ref(true);
    const chatListener = ref(null);
    const chatId = ref('');
    const chat = ref(null);
    const admins = ref({});
    const participants = ref({});
    const messagesLoading = ref(true);
    const messages = ref([]);
    const messageListener = ref(null);
    const isReply = ref(null);

    $capacitor.AdMob_hideBanner();

    const loadChat = async () => {
      try {
        chatLoading.value = true;
        if (chatId.value) {
          chatListener.value = $fire.firestore.doc(`Chats/${chatId.value}`).onSnapshot(doc => {
            if (doc.exists) {
              chat.value = doc.data();
              loadParticipants();
              loadMessages();
            }
          }, error => console.error("Error listening to chat updates:", error));
          chatLoading.value = false;
        }
      } catch (e) {
        console.log("Error Loading Chat", e)
      }
    };

    const loadParticipants = async () => {
      try {
        const participantProfiles = await Promise.all(
          chat.value.participants.map(participantUid => dispatch('user/getOne', participantUid))
        );
        
        participantProfiles.forEach(profile => {
          if (profile) participants.value[profile.uid] = profile;
        });

        chat.value.admins.forEach(adminUid => {
          if (participants.value[adminUid]) admins.value[adminUid] = participants.value[adminUid];
        });
      } catch (e) {
        console.error("Error Loading Participants", e);
      }
    };

    const loadMessages = async () => {
      messagesLoading.value = true;
      messageListener.value = await $fire.firestore
        .collection(`Chats/${chatId.value}/Messages`)
        .orderBy('created_at', 'asc')
        .limitToLast(100)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const data = change.doc.data();
              data.id = change.doc.id;
              data.ownerData = participants.value[data.owner];
              if (data.message) data.message = $encryption.decrypt(data.message);

              // Check if the message already exists before adding
              const messageExists = messages.value.some(message => message.id === data.id);
              if (!messageExists) messages.value.push(data);
            } else if (change.type === 'modified') {
              const data = change.doc.data();
              const index = messages.value.findIndex(m => m.id === change.doc.id);

              if (index !== -1) messages.value[index] = { ...messages.value[index], ...data };
            }
          });
          messagesLoading.value = false;
        }, error => {
          console.error('ERROR LOADING MESSAGES', error);
          messagesLoading.value = false;
        });
    };

    const updateTypingStatus = (typing) => {
      const value = typing ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid);
      dispatch('chats/updateField', { id: chatId.value, typing: value });
    };

    const scrollToUnseenMessage = () => {
      nextTick(() => {
        const unseenMessage = messages.value.find(message => !message.seen.includes(user.value.data.uid));

        if (unseenMessage) {
          const messageElement = document.getElementById(`message-${unseenMessage.id}`);
          if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          $vuetify.goTo('#bottomOfChat', { behavior: "smooth" });
        }
      });
    };

    const onMessageInterest = (message) => {
      if (!message.seen.includes(user.value.data.uid)) {
        dispatch('chats/messages/updateField', {
          chatId: chatId.value,
          id: message.id,
          data: {
            seen: firebase.firestore.FieldValue.arrayUnion(user.value.data.uid)
          }
        })
      }
    }

    const handleReply = message => isReply.value = message;

    watch(route, (to, from) => {
      chatId.value = to.params.id;
      if (to.params.id && !from || (to.params.id !== from.params.id)) loadChat();
    }, { immediate: true });

    watch(() => messages.value, () => {
      scrollToUnseenMessage();
    }, { deep: true });

    onMounted(() => {
      $capacitor.AdMob_hideBanner();
    });

    onUnmounted(() => {
      $capacitor.AdMob_init();
      $capacitor.AdMob_banner();
      messageListener.value && messageListener.value();
      chatListener.value && chatListener.value();
    });

    return {
      messagesLoading,
      chat,
      isReply,
      messages,
      participants,
      admins,
      user,
      onMessageInterest,
      handleReply, updateTypingStatus
    };
  }
});
</script>

<style scope>

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0 0 100px;
}

.messages-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  overflow-y: hidden;
  padding: 0 16px;
}
</style>
