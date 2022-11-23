<template>
  <div>
    <main class="mb-3">
      <div style="" :class="!(message.owner === userId) ? 'd-flex' : 'd-flex flex-row-reverse'">
        <ChatAvatar class="mx-2" v-if="message.ownerData" :user="message.ownerData" :color="`${ (message.owner === userId) ? 'primary' : 'gray' }`" />
        <div style="max-width:350px;" :class="(message.owner === userId) ? 'primary rounded-tr-0 ml-2' : 'rounded-tl-0 gray mr-2'" class="white--text break-words rounded-lg py-2 px-3">
          <div v-if="message.message" class="mb-3">
            {{ message.message }}
          </div>
          <div v-if="message.audioUrl">
            <ChatPlayaudio v-if="!message.audioExpired" :file="message.audioUrl" />
<!--            <audio v-if="!message.audioExpired" controls preload="metadata" style="min-width:220px">
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
          <div class="caption">
               {{ message.created_at.toDate().toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }) }}
            <span v-if="message.audioUrl" class="pl-3">
              <v-btn @click="downloadFile(message.audioUrl)" plain text small class="pa-0 ma-0 white--text text-capitalize">{{$t('btn.download')}}</v-btn>
              <v-btn @click="deleteFile(message.audioUrl)" :loading="loading" plain text small class="pa-0 ma-0 white--text text-capitalize">{{$t('btn.delete')}}</v-btn>
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import {
  defineComponent,
  computed,
  useStore,
  useContext,
  ref
} from '@nuxtjs/composition-api'

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
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { state, dispatch } = useStore()
    const { $helper, $fire } = useContext()
    const user = computed(() => state.user)
    const userId = computed(() => state.user.data.uid)
    const showMedia = ref(false)
    const loading = ref(false)

    // DEFINE CONTENT
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

    return {
      user,
      userId,
      showMedia,
      loading,
      downloadFile,
      deleteFile
    }
  }
})
</script>
<style >
.v-dialog {
  box-shadow: none !important;
}
</style>
