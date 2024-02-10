<template>
  <div>
    <v-app-bar color="white" class="mobileNotch pb-1" app fixed top>
      <v-app-bar-nav-icon>
        <v-btn to="/chats" text color="transparent">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ChatTopavatar v-if="chat" :chat="chat" class="mr-2" />
          <ChatUsername v-if="chat" :chat="chat" :loggedInUser="user.data.uid" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <ChatActionsbtn v-if="chat && participants" :chat="chat" :participants="participants" :admins="admins" />
    </v-app-bar>

    <v-container class="pa-0 fill-height align-end">
      <v-row v-if="messagesLoading" class="pa-6 mt-5">
        <v-skeleton-loader v-for="x of 4" :key="x" width="100%" max-height="50" type="text" class="mb-6" />
      </v-row>
      <v-card v-else color="transparent" class="chatBox elevation-0 pt-14 mt-5 mb-14" ref="chatBox">
        <template v-for="(message, index) in messages">
          <ChatMessage :message="message" :chat="chat" :owner="participants[message.owner]" :participants="participants" :key="index" v-intersect="onIntersect" class="chat-message" :id="`message-${message.id}`" @reply="handleReply" />
        </template>
        <ChatTyping :chat="chat" :participants="participants" />
        <div id="bottomOfChat"></div>
      </v-card>
      <ChatInput :chat="chat" :reply="isReply" @updateReply="handleReply" @updateTyping="updateTypingStatus" @messageSent="goToBottom" />
    </v-container>
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
  onMounted,
  onUnmounted
} from '@nuxtjs/composition-api';

import { Intersect } from 'vuetify/lib/directives';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default defineComponent({
  name: 'ChatsChatId',
  middleware: 'authenticated',
  directives: { Intersect },
  setup() {
    const { $fire, $capacitor, $encryption } = useContext();
    const { dispatch, state } = useStore();
    const route = useRoute();
    const user = computed(() => state.user);

    const chatBoxRef = ref(null);
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
    };

    const loadParticipants = async () => {
      try {
        chat.value.participants.forEach(async participantUid => {
          const participantProfile = await dispatch('user/getOne', participantUid);
          if (participantProfile) {
            participants.value[participantUid] = participantProfile;
          }
        });
        chat.value.admins.forEach(admin => {
          admins.value[admin] = participants.value[admin];
        });
      } catch (e) {
        console.error("Error Loading Participants", e);
      }
    };

    const loadMessages = async () => {
      messagesLoading.value = true;
      messageListener.value = $fire.firestore.collection(`Chats/${chatId.value}/Messages`).orderBy('created_at', 'asc').limitToLast(100).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            data.id = change.doc.id;
            data.ownerData = participants.value[data.owner];
            if (data.message) {
              data.message = $encryption.decrypt(data.message);
            }
            messages.value.push(data);
          } else if (change.type === 'modified') {
            const data = change.doc.data();
            const index = messages.value.findIndex(m => m.id === change.doc.id);
            if (index !== -1) {
              messages.value[index] = { ...messages.value[index], ...data };
            }
          }
        });
        goToBottom();
        messagesLoading.value = false;
      });
    };

    const updateTypingStatus = (typing) => {
      const value = typing ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid);
      dispatch('chats/updateField', { id: chatId.value, typing: value });
    };

    const goToBottom = () => {
      nextTick(() => {
        const chatBoxElement = chatBoxRef.value.$el;
        if (chatBoxElement) {
          const shouldScroll = chatBoxElement.scrollHeight - chatBoxElement.scrollTop - chatBoxElement.clientHeight < 100; // Adjust as needed
          if (shouldScroll) {
            chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
          }
        }
      });
    };

    const handleReply = message => isReply.value = message;

    watch(route, (to, from) => {
      chatId.value = to.params.id;
      if (to.params.id !== from.params.id) {
        loadChat();
      }
    }, { immediate: true });

    onMounted(() => $capacitor.AdMob_hideBanner());
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
      handleReply,
      updateTypingStatus
    };
  }
});
</script>

<style>
.chatBox { z-index: 0; width: 100%; padding-bottom: 80px !important; }
#bottomOfChat { overflow-anchor: auto; height: 1px; }
</style>
