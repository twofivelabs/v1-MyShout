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

      <v-card color="transparent" class="chatBox elevation-0 pt-14 pb-14 mt-5 mb-14">
          <template v-for="(message, index) in messages">
            <ChatMessage :message="message" :key="index" v-intersect="onIntersect" class="chat-message" :id="`message-${message.id}`" />
          </template>
          <div id="bottomOfChat"></div>
      </v-card>

      <v-app-bar color="transparent" class="align-center" flat bottom fixed style="top:calc(100% - 150px)">
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
            <v-btn
                :loading="imageButtonLoading"
                @click="loadImageHandler"
                color="transparent"
                elevation="0"
                class="pa-0"
                small
                fab
            >
              <v-badge
                  :content="1"
                  :value="imageAddedToMessage"
                  color="green"
                  overlap
              >
                <v-icon>
                  mdi-image
                </v-icon>
              </v-badge>
            </v-btn>
            <v-btn
                :loading="loading"
                @mousedown.prevent="startRecording"
                @touchstart="startRecording"
                @mouseup.prevent="stopRecording"
                @mouseout="stopRecording"
                @touchend="stopRecording"
                @touchcancel="stopRecording"
                @contextmenu.prevent="startRecording"
                color="transparent"
                elevation="0"
                class="pa-0"
                small
                fab
            >
              <v-icon v-if="!buttonText">mdi-microphone</v-icon>
              {{ buttonText }}
            </v-btn>
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
import lodash from 'lodash'
import firebase from 'firebase'
import { Intersect } from 'vuetify/lib/directives'

import {
  defineComponent,
  ref,
  useContext,
  useRoute,
  useFetch,
  useStore, computed,
    watch
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
      $db,
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
    // -- AUDIO MESSAGE --
    const buttonText = ref()
    const isRecording = ref(false)
    const audioUrl = ref(null)
    const timerCount = ref(120)
    const timerInterval = new Set()
    // -- IMAGE MESSAGE --
    const imageButtonLoading = ref(false)
    const imageAddedToMessage = ref(false)
    const imageMessageUrl = ref()

    // GET CONTENT
    useFetch(async () => {
      try {
        chatLoading.value = true
        await dispatch('chats/getOne', route.value.params.id).then(async (res) => {
          if (res !== false) {
            chat.value = res

            // LOAD USERS
            for(const id in res.participants) {
              const u = await dispatch('user/getOne', res.participants[id])
              if (u) {
                users.value[res.participants[id]] = {...u}
              }
            }
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatsChatId',
          msg: 'getOne',
          val: e
        })
        error({ statusCode: 404 })
      } finally {
        chatLoading.value = false
      }
    })

    // METHODS
    const loadMessages = () => {
      messages.value = []
      try {
        loading.value = true
        messageListener.value = $fire.firestore
            .collection(`Chats/${chatId.value}/Messages`)
            .orderBy('created_at', 'asc')
            .limitToLast(100)
            .onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                // TODO: Add 'modified' / 'removed' as options here too
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
        /*console.log({
          chatId: chatId.value,
          message: {
            message: encryptedMessage,
            image: imageMessageUrl.value || null,
            owner: user.value.data.uid,
            seen: [
              user.value.data.uid
            ]
          }
        })*/
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
          lastMessage: newMessage.value || null,
          seen: [
            user.value.data.uid
          ]
        })

        // Reset
        newMessage.value = null
        imageAddedToMessage.value = false
        imageMessageUrl.value = null
        await goToBottom(0)
      } catch (e) {
        $notify.show({
          text: i18n.t('notify.error_try_again'),
          color: 'error'
        })
      }
    }
    const startRecording = async () => {
      if (isRecording.value) return
      isRecording.value = true

      try {
        buttonText.value = '120'

        // count down timer
        timerInterval.add(setInterval(() => {
          timerCount.value--;
          buttonText.value = `${timerCount.value}`
          if (timerCount.value <= 0) {
            stopRecording()
          }
        }, 1000))

        await $capacitor.microphoneStart()

      } catch (e) {
        console.log('Error starting ', e)
      }
    }
    const stopRecording = async () => {
      isRecording.value = false
      buttonText.value = null
      timerCount.value = 120

      // Clear timers
      for (const id of timerInterval) {
        timerInterval.delete(id)
        clearInterval(id)
      }

      // Try and stop recorder
      try {
        const audio = await $capacitor.microphoneStop()

        // Upload Audio File
        if (audio) {
          audioUrl.value = await $db.upload({
            path: `/CHATS/${chatId.value}/${user.value.data.uid}-${Date.now()}.wav`,
            data: audio.recordDataBase64,
            base64: true
          })

          // Send Message
          await dispatch('chats/messages/add', {
            chatId: chatId.value,
            message: {
              message: '',
              owner: user.value.data.uid,
              audioUrl: audioUrl.value
            }
          })
          try {
            await $vuetify.goTo('#bottomOfChat')
          } catch {
            // ...
          }
        }
      } catch (e) {
        // ...
        console.log('ERROR STOPPING', e)
      }
    }
    const goToBottom = async (delay = 1000) => {
      setTimeout(() => {
        $vuetify.goTo('#bottomOfChat').then(() => {

          // Update Chat of seen messages
          try {
            if (!chat.value.seen.includes(user.value.data.uid)) {
              $fire.firestore.doc(`Chats/${chatId.value}`).update({
                "seen": firebase.firestore.FieldValue.arrayUnion(user.value.data.uid)
              })
            }
            // update notification bubble
            $fire.firestore.doc(`Users/${user.value.data.uid}`).update({
              "notifications.hasMessages": false
            })
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
    const loadImageHandler = async () => {
      imageButtonLoading.value = true
      imageAddedToMessage.value = false

      try {
        const photoBase64 = await $capacitor.cameraTakePicture(false)
        const photoUrl = await $db.upload({
          path: `/CHATS/${chatId.value}/${ new Date().getTime() }.jpg`,
          data: photoBase64,
          base64: true
        })
        // console.log('photoUrl', photoUrl)

        if (photoUrl) {
          imageAddedToMessage.value = true
          imageMessageUrl.value = photoUrl
        }
      } catch {
        // ...
      } finally {
        imageButtonLoading.value = false
      }
    }

    // WATCH
    // Wait for chat to finish loading then messages
    watch(chatLoading, () => {
      if (chatLoading.value === false) {
        if (route.value.params.id) {
          chatId.value = route.value.params.id
          loadMessages()
          goToBottom(2500)
        }
      }
    })
    // This will load with moving back and forth
    watch(route, (r) => {
      if (r.name === 'chats-chat-id') {
        chatId.value = route.value.params.id
        loadMessages()
        goToBottom()
      } else {
        // Need to stop listening to the changes made to the chat
        try {
          console.log('STICKY: REMOVE CHAT MESSAGE LISTENER')
          messageListener.value()
        } catch {
          // ...
        }
      }
    })
    watch(timerInterval, (t) => {
      console.log('TIMER2', t)
    })

    return {
      loading,
      chat,
      newMessage,
      messages,
      users,
      buttonText,
      timerCount,
      user,
      imageButtonLoading,
      imageAddedToMessage,
      loadImageHandler,
      sendMessage,
      onIntersect,
      startRecording,
      stopRecording,
      goTo
    }
  }
})

</script>
<style>
* {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

#chatBox * {
  overflow-anchor: none;
}
#bottomOfChat {
  overflow-anchor: auto;
  height: 1px;
}
.v-text-field .v-input__control {
  margin-top:5px !important;
}
.v-text-field .v-input__append-outer {
  margin-top:0 !important;
}

</style>
