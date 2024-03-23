<template>
  <div>
    <v-app-bar color="white" class="mobileNotch elevation-0 appBarHeight" app fixed top>
      <v-app-bar-nav-icon>
        <v-btn to="/chats" text color="transparent">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ChatTopavatar :chat="chat" class="mr-2" />
          <ChatUsername :chat="chat" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <ChatActionsbtn v-if="chat && participants" :chat="chat" :participants="participants" :admins="admins" />
    </v-app-bar>


    <v-container v-if="!messagesLoading" style=" z-index: 0; width: 100%;">
      <div v-if="chatMessages &&  Object.keys(chatMessages).length > 0">
        <ChatMessage v-for="(message) in chatMessages" :key="message.id" :message="message" :chat="chat" :owner="participants[message.owner]" :participants="participants" v-intersect="onMessageInterest(message)" class="chat-message" :id="`message-${message.id}`" @reply="handleReply" />
<!--        <ChatMessage v-for="(message) in messages" :key="message.id" :message="message" :chat="chat" :owner="participants[message.owner]" :participants="participants" v-intersect="onMessageInterest(message)" class="chat-message" :id="`message-${message.id}`" @reply="handleReply" />-->
      </div>
      <div v-else class="text-center pt-10" style="opacity:0.5">
        {{$t('chat.no_messages')}}
      </div>
      <ChatTyping :chat="chat" :participants="participants" />
    </v-container>
    <v-container v-else class="pa-6 mt-5">
      <v-skeleton-loader v-for="x of 4" :key="x" width="100%" max-height="50" type="text" class="mb-6" />
    </v-container>

    <div id="bottomOfChat" style="padding-bottom: 100px !important;"></div>
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
import Vue from 'vue'
//import Vue from 'vue'


export default defineComponent({
  name: 'ChatsChatId',
  middleware: 'authenticated',
  directives: { Intersect },
  setup() {
    const { $db, $capacitor,
      $helper, $encryption, $services
    } = useContext();
    const { state } = useStore();
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
    const chatMessages = ref({});
    const messageListener = ref(null);
    const isReply = ref(null);

    $capacitor.AdMob_hideBanner();

    const loadChat = async () => {
      chatLoading.value = true;

      try {
        if (!chatId.value) {
          console.log("Error no chat id")
          return
        }

        chatListener.value = await $db.listen(`Chats/${chatId.value}`, {where: null}).then(() => {
          loadMessages()
        })

      } catch (e) {
        console.log("Error Loading Chat", e)
      } finally {
        chatLoading.value = false
        messagesLoading.value = false

        setTimeout(() => {
          try {
            document.getElementById(`bottomOfChat`).scrollIntoView({behavior: "smooth"});
          } catch { /**/ }
        }, 500)
      }
    };

    const loadParticipants = async () => {
      try {
        const participantProfiles = await Promise.all(
          chat.value?.participants?.map(participantUid => {
              return $db.get(`Users/${participantUid}`)
          })
        )
        participantProfiles?.forEach(profile => {
          if (profile) {
            participants.value[profile.id] = profile;
          }
        })
      } catch (e) {
        console.error("Error Loading Participants", e);
      }

      try {
        chat.value.admins?.forEach(adminUid => {
          if (participants.value[adminUid]) admins.value[adminUid] = participants.value[adminUid];
        });
      } catch (e) {
        console.error("Error Loading Admins", e);
      }
    };

    const loadMessages = async () => {
      messagesLoading.value = true;
      messageListener.value = await $db.listen(`Chats/${chatId.value}/Messages`, {
        limit: 100,
        orderBy: 'created_at',
        orderDirection: 'asc'
      }).then(() => {
        /* console.log('CHANGED', docs)

        docs.all.forEach((data) => {
          data.ownerData = participants.value[data.owner]
          if (data?.message) data.message = $encryption.decrypt(data.message)
          if (data?.urls?.length > 0) data.message = $helper.linkifyText(data.message)

          // Parse Date Issues
          if (data?.created_at && (typeof data.created_at === 'string' || data.created_at instanceof String)) {
            data.created_at = Date.parse(data.created_at)
          }
          messages.value.push(data)
          /!* const messageExists = messages.value.some(message => message.id === data.id)
          if (!messageExists) messages.value.push(data) *!/
        }) */

        messagesLoading.value = false
      }).catch(e => {
        messagesLoading.value = false
        console.error('STICKY: ERROR LOADING MESSAGES', e);
      })
      /*     messageListener.value = await $db.fire().fs
          .collection(`Chats/${chatId.value}/Messages`)
          .orderBy('created_at', 'asc')
          .limitToLast(100)
          .onSnapshot( (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                const data = change.doc.data()
                data.id = change.doc.id
                data.ownerData = participants.value[data.owner]

                if (data.message) data.message = $encryption.decrypt(data.message)
                if (data.urls?.length > 0) data.message = $helper.linkifyText(data.message)

                const messageExists = messages.value.some(message => message.id === data.id)
                if (!messageExists) messages.value.push(data)

              } else if (change.type === 'modified') {
                console.log('STICKY: MESSAGE WAS MODIFIED')
                const data = change.doc.data();
                const index = messages.value.findIndex(m => m.id === change.doc.id);

                if (data.message) data.message = $encryption.decrypt(data.message)
                if (data.urls?.length > 0) data.message = $helper.linkifyText(data.message)
                if (index !== -1) {
                  messages.value[index] = {...messages.value[index], ...data};
                  //Vue.set(messages.value, index, {...data})
                }
              }
            });
            messagesLoading.value = false;
          }); */
    };

    const updateTypingStatus = async (typing) => {
      try {
        const value = typing ? $db.fire().arrayUnion(user.value.data.uid) : $db.fire().arrayRemove(user.value.data.uid);
        await $db.save(`Chats/${chatId.value}`, {
          typing: value
        })
      } catch (error) {
        console.error('STICKY: ERROR UPDATING TYPING STATUS', error);
      }
    };

    const scrollToUnseenMessage = () => {
      try {
        nextTick(() => {
          const unseenMessage = messages.value.find(message => !message.seen.includes(user.value.data.uid));

          if (unseenMessage) {
            try {
              document.getElementById(`message-${unseenMessage.id}`).scrollIntoView({ behavior: "smooth" });
            } catch { /**/ }
          }
        });
      } catch (error) {
        console.error('STICKY: ERROR SCROLLING TO UNSEEN MESSAGE', error);
      }
    };

    const onMessageInterest = async (message) => {
      try {

          if (!message?.seen?.includes(user.value.data.uid)) {
            await $services.viewMessage({chatId: chatId.value, messageId: message.id})

            /*$db.save(`Chats/${chatId.value}/Messages/${message.id}`, {
              seen: $db.fire().arrayUnion(user.value.data.uid)
            })*/
          }
      } catch (error) {
        console.error('STICKY: ERROR UPDATING MESSAGE INTEREST', error);
      }
    };

    const handleReply = message => isReply.value = message;

    watch (state.listeners, (_, listener) => {
      // TODO: Noticed that the Chats/*** was getting an extra listener when switching to a user profile
      if (listener[`Chats/${chatId.value}`]) {
        chat.value = state.listeners[`Chats/${chatId.value}`]
        if (chat.value && chat.value?.participants) loadParticipants()
      }

      // MESSAGES
      if (listener[`Chats/${chatId.value}/Messages`]) {
        listener[`Chats/${chatId.value}/Messages`].forEach(async (message) => {
          message.ownerData = participants.value[message.owner]
          if (message?.message) message.message = $encryption.decrypt(message.message)
          if (message?.urls?.length > 0) message.message = $helper.linkifyText(message.message)

          // Parse Date Issues
          if (message?.created_at && (typeof message.created_at === 'string' || message.created_at instanceof String)) {
            message.created_at = Date.parse(message.created_at)
          }

          if (message._changeType === "added" || message._changeType === "modified") {
            Vue.set(chatMessages.value, message.id, message)
          } else {
            Vue.delete(chatMessages.value, message.id)
          }

        })
      }
    })
    watch(route, (to, from) => {
      chatId.value = to.params.id;
      if (to.params.id && !from || (to.params.id !== from.params.id)) {
        //console.log('WATCHING >> Load Chat')
        loadChat();

      }
    }, { immediate: true });

    watch(() => messages.value, (newMessages, oldMessages) => {
      if (newMessages && oldMessages && newMessages !== oldMessages) {
        //console.log('WATCHING >> scroll messages')
        return scrollToUnseenMessage();
      }
    }, { deep: true });

    onMounted(() => {
      $capacitor.AdMob_hideBanner();

      setTimeout(() => {
        try {
          document.getElementById(`bottomOfChat`).scrollIntoView({ behavior: "smooth" })
        } catch { /**/ }
      },400)
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
      chatMessages,
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
