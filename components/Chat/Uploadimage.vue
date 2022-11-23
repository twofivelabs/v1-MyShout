<template>
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
</template>
<script>

import {
  defineComponent, useContext, ref, watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatUploadimage',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentUrl: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  emits: [
    'url'
  ],
  setup (props, { emit }) {
    const { $capacitor, $db } = useContext()
    const imageButtonLoading = ref(false)
    const imageAddedToMessage = ref(false)
    const imageMessageUrl = ref()

    // METHODS
    const loadImageHandler = async () => {
      imageButtonLoading.value = true
      imageAddedToMessage.value = false

      try {
        const photoBase64 = await $capacitor.cameraTakePicture(false)
        const photoUrl = await $db.upload({
          path: `/CHATS/${props.chat.id}/${ new Date().getTime() }.jpg`,
          data: photoBase64,
          base64: true
        })
        // console.log('photoUrl', photoUrl)

        if (photoUrl) {
          imageAddedToMessage.value = true
          imageMessageUrl.value = photoUrl
          emit('url', imageMessageUrl.value)
        }
      } catch {
        // ...
      } finally {
        imageButtonLoading.value = false
      }
    }

    watchEffect(() => {
      imageAddedToMessage.value = !!props.currentUrl;
    })


    return {
      loadImageHandler,
      imageButtonLoading,
      imageAddedToMessage,
      imageMessageUrl
    }
  }
})
</script>
