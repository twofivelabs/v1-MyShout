<template #activator="{ isActive, props }">
  <main class="mb-3 px-3">
    <ChatMessageReply v-if="message.replyTo" :chat="chat" :message="message" :participants="participants"/>

    <v-card 
      v-if="!message.hide || !message.hide.includes(userId)"
      v-longpress="triggerMessageMenu"
      flat color="transparent"
      :class="!(message.owner === userId) ? 'd-flex' : 'd-flex flex-row-reverse'"
    >
      <ChatAvatar v-if="owner && message.owner !== userId" class="mx-2" :user="owner" :color="`${ (message.owner === userId) ? 'primary' : 'gray' }`" />

      <v-card-text
        style="max-width:80%;min-width:50%" 
        :class="!message.deleted ? ((message.owner === userId) ? 'primary rounded-tr-0 white--text ml-2' : 'rounded-tl-0 gray white--text mr-2') : 'message-border caption'" 
        class="break-words rounded-lg py-2 px-3"
      >
        <div v-if="message.deleted">
          {{ $t('chat.message_deleted') }}
        </div>

        <div v-else>
          <div v-if="message.message" class="mb-3">
            {{ message.message }}
          </div>

          <div v-if="message.audioUrl">
            <ChatPlayaudio v-if="!message.audioExpired" :file="message.audioUrl" />
            <!-- <audio v-if="!message.audioExpired" controls preload="metadata" style="min-width:220px">
              <source :src="`${message.audioUrl}`">
            </audio>-->
            <div v-else class="text-center caption font-italic py-4">{{ $t('chat.audio_expired') }}</div>
          </div>

          <div v-if="message.image">
            <v-bottom-sheet v-model="showMedia" style="box-shadow:none !important;" :hide-overlay="true" class="elevation-0" :scrollable="false" width="100%" max-width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-img :src="`${message.image}`" v-bind="attrs" v-on="on" />
              </template>

              <div style="margin-bottom:45%;">
                <v-img :src="`${message.image}`" class="elevation-12 rounded-lg mx-1" />
                <div class="text-center">
                  <v-btn @click="showMedia = !showMedia" color="primary" class="mt-n7" fab>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-bottom-sheet>
          </div>
        </div>

        <div class="caption text-right">
          {{ moment(message.created_at.toDate()).fromNow() }}
          <v-icon v-if="!message.deleted && message.owner === userId" small color="white">{{ getReadStatusIcon(chat, message) }}</v-icon>

          <span v-if="message.audioUrl" class="pl-3">
            <v-btn @click="downloadFile(message.audioUrl)" plain text small class="pa-0 ma-0 white--text text-capitalize">{{$t('btn.download')}}</v-btn>
            <v-btn @click="deleteFile(message.audioUrl)" :loading="loading" plain text small class="pa-0 ma-0 white--text text-capitalize">{{$t('btn.delete')}}</v-btn>
          </span>
        </div>
      </v-card-text>

       <!-- Tooltip -->
      <v-tooltip v-if="longpress" top v-model="messageMenu">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on"></div>
        </template>
        <span>Emoji Bubbles</span>
      </v-tooltip>

      <!-- Message Menu -->
      <v-menu v-if="longpress" v-model="messageMenu" offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <div v-on="on" ref="menuActivator"></div>
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-list class="py-0">
              <v-list-item :key="`info-message-${message.id}`" @click="triggerMessageInfo">
                <v-list-item-avatar class="my-0">
                  <v-icon small>mdi-information-variant-box-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="text-caption">
                  {{ $t('chat.info' )}}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="message.owner !== userId" :key="`edit-message-${message.id}`" @click="startMessageReply">
                <v-list-item-avatar class="my-0">
                  <v-icon small>mdi-account-plus</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="text-caption">
                  {{ $t('chat.reply_to_message' )}}
                </v-list-item-title>
              </v-list-item>
              <v-list-item :key="`forward-message-${message.id}`">
                <v-list-item-avatar class="my-0">
                  <v-icon small>mdi-account-plus</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="text-caption">
                  {{ $t('chat.forward_message' )}}
                </v-list-item-title>
              </v-list-item>
              <v-list-item :key="`delete-message-me-${message.id}`" @click="deleteMessage(0)">
                <v-list-item-avatar class="my-0">
                  <v-icon small color="red">mdi-account-plus</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="text--red text-caption">
                  {{ $t('chat.delete_for_me' )}}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="message.owner === userId" :key="`delete-message-everyone-${message.id}`" @click="deleteMessage(1)">
                <v-list-item-avatar class="my-0">
                  <v-icon small color="red">mdi-account-plus</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="text--red text-caption">
                  {{ $t('chat.delete_for_everyone' )}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-card>
      
    <v-overlay v-model="messageMenu" scroll-strategy="block" />

    <v-bottom-sheet v-model="messageInfo" :scrollable="true" max-width="700" fullscreen>
      <v-sheet class="ma-3" style="padding-bottom:180px;">
        <v-app-bar color="white" class="mobileNotch pb-1" app fixed top>
          <v-app-bar-nav-icon>
            <v-btn @click="messageInfo=false" text color="transparent">
              <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">mdi-arrow-left</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
          <v-toolbar-title class="pl-0 d-flex align-center">
            Message Details
          </v-toolbar-title>
        </v-app-bar>
        <ChatMessageHistory :chat="chat" :message="message" :participants="participants" :owner="participants[message.owner]"  />
      </v-sheet>
    </v-bottom-sheet>
          
   </main>
</template>
<script>

import {
  defineComponent,
  computed,
  useStore,
  useContext,
  ref
} from '@nuxtjs/composition-api'

import { Touch } from 'vuetify/lib/directives'

import moment from 'moment'
import firebase from 'firebase';
import 'firebase/functions';

export default defineComponent({
  name: 'ChatMessage',
  props: {
    color: {
      type: String,
      default: () => {
        return 'primary'
      }
    },
    message: {
      type: Object,
      default: () => {
        return {}
      }
    },
    owner: {
      type: Object,
      default: () => {
        return {}
      }
    },
    participants: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    longpress: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  emits: [
    'reply'
  ],
  directives: { Touch },
  setup(props, { emit }) {
    const { state, dispatch } = useStore()
    const { $helper, $fire } = useContext()
    const user = computed(() => state.user)
    const userId = computed(() => state.user.data.uid)
    const showMedia = ref(false)
    const loading = ref(false)
    
    const messageMenu = ref(false)
    const messageInfo = ref(false)

    const downloadFile = (file) => {
      return $helper.downloadFile(file, 'recording.wav')
    }

    const deleteFile = async (file) => {
      loading.value = true
      try {
        // Hide From UI
        document.getElementById(`message-${props.message.id}`).style.display = 'none';

        // Delete Message
        await dispatch('chats/messages/remove', {
          chatId: props.chat.id,
          id: props.message.id
        })

        // Delete File
        await $fire.storage.refFromURL(file).delete()

      } catch (e) {
        console.log('Error deleting file', e)
      } finally {
        loading.value = false
      }
    }

    const triggerMessageMenu = () => {
      if (!props.longpress) return;
      messageMenu.value = !messageMenu.value
    }

    const triggerMessageInfo = () => {
      messageInfo.value = !messageInfo.value
    }

    const getReadStatusIcon = (chat, message) => {
      const totalParticipantsExcludingSender = chat.participants.length - 1;
      const seenCountExcludingSender = message.seen.filter(userId => userId !== message.owner).length;

      if (seenCountExcludingSender  === 0) {
        return 'mdi-eye-off'; // icon when no one has read
      } else if (seenCountExcludingSender < totalParticipantsExcludingSender) {
        return 'mdi-eye'; // icon when partially read
      } else {
        return 'mdi-eye-check'; // icon when fully read
      }
    };

    const startMessageReply = () => {
      emit('reply', props.message);
      return triggerMessageMenu()
    }

    const deleteMessage = async (d) => {
      const res = await dispatch('chats/messages/updateField', {
          chatId: props.chat.id,
          id: props.message.id,
          data: {
            deleted: d === 1 ? true : false,
            hide: d === 0 ? firebase.firestore.FieldValue.arrayUnion(userId.value) : []
          }
        })
      if (res) return triggerMessageMenu()
    }

    return {
      moment,
      user,
      userId,
      showMedia,
      loading, 
      messageMenu, triggerMessageMenu,
      messageInfo,triggerMessageInfo,
      deleteMessage,
      downloadFile, deleteFile,
      getReadStatusIcon,
      startMessageReply,
    }
  }
})
</script>
<style>

.v-dialog {
  box-shadow: none !important;
}

.message-border {
  border: 1px solid #979797;
  color: #000000;
}

.v-list-item {
 min-height:25px;
 padding:0 20px 0 0;
}

</style>
