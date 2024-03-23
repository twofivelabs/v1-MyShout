<template>
  <v-app-bar color="transparent" class="align-center formMessageInput" flat bottom fixed :style="`${!reply ? 'top:calc(100% - 145px)' : 'top:calc(100% - 165px)'}`">
    <v-row class="px-2">
      <v-col cols="12" v-if="reply" class="reply-preview">
        {{$t('chats.replying_to')}}: {{ truncateMessage(reply.message) }}
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
        <template v-slot:prepend-inner v-if="imageUrl || videoUrl || fileUrl">
          <v-badge
            :bordered="false"
            icon="mdi-delete-outline"
            color="red"
            size="small"
            overlap
          >
            <v-img
              v-if="imageUrl"
              @click="imageUrl = null"
              :src="imageUrl"
              max-width="40"
              max-height="40"
              contain
            />
            <v-icon v-if="videoUrl" @click="videoUrl = null">
              mdi-video-vintage
            </v-icon>
            <v-icon v-if="fileUrl" @click="fileUrl = null">
              mdi-paperclip
            </v-icon>
          </v-badge>
        </template>

        <template v-slot:append-outer>
          <v-btn @click="sendMessage" :loading="isSendingMessage" fab>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>

        <template v-slot:append v-if="chat && chat.id">
          <v-btn
            color="transparent"
            elevation="0"
            class="pa-0 ma-0"
            small fab
            @click="addToMessage = true"
          >
            <v-icon>mdi-plus</v-icon>

            <v-menu v-model="addToMessage" transition="slide-x-transition">
              <template v-slot:activator="{ on }">
                <div v-on="on" ref="menuActivator"></div>
              </template>
              <v-card>
                <v-card-text class="pa-0">
                  <v-list density="compact" nav>
                    <v-list-item>
                      <ChatUploadfile :chat="chat" :currentUrl="fileUrl" @url="fileCallback" />
                    </v-list-item>
                    <v-list-item>
                      <ChatUploadimage :chat="chat" :currentUrl="imageUrl" @url="imageCallback" />
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        :to="`/chats/chat/video?chatId=${chat.id}`"
                        color="transparent"
                        elevation="0"
                        class="pa-0 ma-0"
                        small
                        fab
                      >
                        <v-icon color="black">
                          mdi-video-vintage
                        </v-icon>
                      </v-btn>
<!--                      <ChatUploadvideo :chat="chat" :currentUrl="imageUrl" @url="imageCallback" />-->
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-btn>
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
    computed,
    useRoute
  } from '@nuxtjs/composition-api';

  import debounce from 'lodash/debounce';
  import * as linkify from 'linkifyjs';
  import { Filesystem } from '@capacitor/filesystem'

  export default defineComponent({
    name: 'ChatInput',
    props: {
      chat: { type: Object, default: () => ({}) },
      reply: { type: Object, default: () => ({}) }
    },
    setup(props, { emit }) {
      const { state } = useStore()
      const { i18n, $notify, $db, $encryption } = useContext()
      const route = useRoute()
      const user = computed(() => state.user)

      const newMessage = ref('')
      const addToMessage = ref(false)
      const imageUrl = ref(null)
      const videoUrl = ref(null)
      const uploadedVideoUrl = ref(null)
      const videoThumbnailUrl = ref(null)
      const fileUrl = ref(null)
      const isSendingMessage = ref(false)

      const clearReply = () => emit('updateReply', null);
      const imageCallback = (url) => imageUrl.value = url;
      const fileCallback = (url) => fileUrl.value = url;
      const truncateMessage = (message, length = 25) => message ? (message.length > length ? message.substring(0, length) + '...' : message) : '';
      const sendMessage = async () => {
        isSendingMessage.value = true

        try {
          // If no user, OR no message, but it should be ok to just send a video/image/file etc.
          if (!newMessage.value && (imageUrl.value || uploadedVideoUrl.value || fileUrl.value)) {
            // we are good to send just the media, no need for a message
          } else if(!user.value.data.uid || !newMessage.value) {
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' });
            return;
          }

          // Upload video if there is one
          if (videoUrl.value) {
            uploadedVideoUrl.value = await uploadVideo(videoUrl.value)
            // Could add thumbnail here too
          }

          // Encrypt message
          let encryptedMessage = null;
          if (newMessage.value) encryptedMessage = $encryption.encrypt(newMessage.value);

          // Dispatch action to add a new message.
          const res = await $db.save(`Chats/${props.chat.id}/Messages`, {
            message: encryptedMessage,
            urls: linkify.find(newMessage.value) || [],
            replyTo: props.reply ? props.reply.id : null,
            image: imageUrl.value || null,
            file: fileUrl.value || null,
            videoUrl: uploadedVideoUrl.value || null,
            videoThumbnailUrl: videoThumbnailUrl.value || null,
            owner: user.value.data.uid,
            seen: [user.value.data.uid]
          })
          /* const res = await dispatch('chats/messages/add', {
            chatId: props.chat.id,
            message: {
              message: encryptedMessage,
              urls: linkify.find(newMessage.value) || [],
              replyTo: props.reply ? props.reply.id : null,
              image: imageUrl.value || null,
              file: fileUrl.value || null,
              videoUrl: uploadedVideoUrl.value || null,
              videoThumbnailUrl: videoThumbnailUrl.value || null,
              owner: user.value.data.uid,
              seen: [user.value.data.uid]
            }
          }); */

          if (res && props.reply) {
            console.log('STICKY: Array Union: ', res.id, JSON.stringify(res.id))

            $db.save(`Chats/${props.chat.id}/Messages/${props.reply.id}`, {
              replies: $db.fire().arrayUnion(res.id)
            }).catch((e) => {
              console.log('STICKY: Reply error:', e, JSON.stringify(e))
            })
            /*
            await $db.fire().fs.collection("Chats").doc(props.chat.id).collection("Messages").doc(props.reply.id).update({
              replies: $db.fire().fs.FieldValue.arrayUnion(res.id)
            }).catch((e) => {
              console.log('STICKY: Reply error:', e, JSON.stringify(e))
            }) */
          }

          // Update chat's last message information.
          $db.save(`Chats/${props.chat.id}`, {
            created_at: new Date(),
            snippet: truncateMessage(newMessage.value) || null,
            sent_by: user.value.data.uid,
            message: {
              created_at: new Date(),
              snippet: truncateMessage(newMessage.value) || null,
              sent_by: user.value.data.uid
            }
          })

          // Reset message
          clearReply()
          newMessage.value = null;
          imageUrl.value = null;
          videoUrl.value = null;
          videoThumbnailUrl.value = null;
          fileUrl.value = null;

          // This will remove any url params (ie: video Url)
          window.history.replaceState(null, '', window.location.pathname);

          emit("messageSent")

        } catch (e) {
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' });
          console.log("STICKY: Cannot Send Message", e);

        } finally {
          isSendingMessage.value = false
        }
      };
      const updateTyping = debounce((isTyping) => {
        emit('updateTyping', isTyping);
      }, 500);
      const uploadVideo = async (filePath) => {
        console.log('[camera] Start video upload')
        try {
          const fileConverted = await convertFileUrlToBase64(filePath)
          if (!fileConverted) return

          const fileDestination = `/CHATS/${props.chat.id}/${new Date().getTime()}.mp4`
          const url = await $db.upload(fileDestination, fileConverted, {
            base64: true,
            metaData: {
              contentType: 'video/mp4'
            }
          })
          console.log('[camera] videoUrl:', url);
          return url;
        } catch (error) {
          console.error('[camera] uploadVideo Error: ', error);
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' });
          return null;
        }
      };
      const convertFileUrlToBase64 = async (fileUrl) => {
        console.log('[camera] Read and convert file: ', fileUrl)
        if (!fileUrl) return

        return await Filesystem.readFile({
          path: `file://${fileUrl}`,
        }).then((r) => {
          return r.data
        }).catch((e) => {
          console.log('[camera] Read File Error: ', e, JSON.stringify(e))
        });
      };

      watch(newMessage, (newValue) => updateTyping(!!newValue), { immediate: true });
      watch(route, (to) => {
        // Watch URL Params for VIDEO
        if (to.query?.videoUrl) {
          //console.log('[input] to: ', to, JSON.stringify(to))
          //console.log('[input] VideoURL: ', to.query.videoUrl)
          // console.log('[cameraStepper] input ', to.query.videoUrl)
          videoUrl.value = to.query.videoUrl
          videoThumbnailUrl.value = to.query.videoThumbnailUrl
        }
      }, { immediate: true });

      return {
        newMessage, imageUrl, fileUrl, videoUrl,
        addToMessage, isSendingMessage,
        sendMessage, clearReply, truncateMessage,
        imageCallback, fileCallback
      };
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
