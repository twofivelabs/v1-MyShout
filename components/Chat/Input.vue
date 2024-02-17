<template>
  <v-app-bar color="transparent" class="align-center formMessageInput" flat bottom fixed :style="`${!reply ? 'top:calc(100% - 145px)' : 'top:calc(100% - 165px)'}`">
    <v-row class="px-2">
      <v-col cols="12" v-if="reply" class="reply-preview">
        Replying to: {{ truncateMessage(reply.message) }}
        <v-icon @click="clearReply">mdi-close</v-icon>
      </v-col>

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
    </v-row>
  </v-app-bar>
</template>
  
<script>
  import { 
    defineComponent,
    ref,
    watch,
    useContext ,
    useStore,
    computed
  } from '@nuxtjs/composition-api';

  import firebase from 'firebase';
  import 'firebase/functions';

  import debounce from 'lodash/debounce';
  import * as linkify from 'linkifyjs';
  
  export default defineComponent({
    name: 'ChatInput',
    props: {
      chat: { type: Object, default: () => ({}) },
      reply: { type: Object, default: () => (null) }
    },
    setup(props, { emit }) {
      const { dispatch, state } = useStore();
      const { i18n, $notify, $fire, $encryption } = useContext();
      const user = computed(() => state.user);
      const newMessage = ref('');
      const imageMessageUrl = ref(null);
  
      const clearReply = () => emit('updateReply', null);
      const imageMessageUrlCallback = (url) => imageMessageUrl.value = url;
  
      const truncateMessage = (message, length = 25) => message ? (message.length > length ? message.substring(0, length) + '...' : message) : '';
  
      const sendMessage = async () => {
        try {
          if((!newMessage.value && !imageMessageUrl.value) || !user.value.data.uid) {
            $notify.show({
              text: i18n.t('notify.error_try_again'),
              color: 'error'
            });
            return;
          }

          const urls = linkify.find(newMessage.value) || []

          let encryptedMessage = null;

          if (newMessage.value) {
            encryptedMessage = $encryption.encrypt(newMessage.value);
          }

          // Dispatch action to add a new message.
          const res = await dispatch('chats/messages/add', {
            chatId: props.chat.id,
            message: {
              message: encryptedMessage,
              urls: urls,
              replyTo: props.reply ? props.reply.id : null,
              image: imageMessageUrl.value || null,
              owner: user.value.data.uid,
              seen: [user.value.data.uid]
            }
          });

          if (res && props.reply) {
            await $fire.firestore.collection("Chats").doc(props.chat.id).collection("Messages").doc(props.reply.id).update({
              replies: firebase.firestore.FieldValue.arrayUnion(res.id)
            })
          } 

          // Update chat's last message information.
          await dispatch('chats/updateField', {
            id: props.chat.id,
            message: {
              created_at: new Date(),
              snippet: newMessage.value || null,
              sent_by: user.value.data.uid
            },
            seen: [user.value.data.uid]
          });

          clearReply()
          newMessage.value = null;
          imageMessageUrl.value = null;

          emit("messageSent")
        } catch (e) {
          $notify.show({
            text: i18n.t('notify.error_try_again'),
            color: 'error'
          });
          console.log("STICKY: Cannot Send Message", e);
        }
      };
  
      const updateTyping = debounce((isTyping) => {
        emit('updateTyping', isTyping);
      }, 500);
  
      watch(newMessage, (newValue) => updateTyping(!!newValue), { immediate: true });
  
      return { newMessage, imageMessageUrl, sendMessage, clearReply, truncateMessage, imageMessageUrlCallback };
    }
  });
</script>
  
<style>
  .reply-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    padding: 8px;
    border-radius: 4px;
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
</style>
