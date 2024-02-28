<template>
  <v-btn
      :loading="imageLoading"
      @click="loadImageHandler"
      :disabled="imageUrl ? true : false"
      color="transparent"
      elevation="0"
      class="pa-0 ma-0"
      small
      fab
  >
    <v-icon>
      mdi-image
    </v-icon>
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
    const imageLoading = ref(false)
    const uploadComplete = ref(false)
    const imageUrl = ref()

    // METHODS
    const loadImageHandler = async () => {
      imageLoading.value = true
      uploadComplete.value = false

      try {
        const photoBase64 = await $capacitor.cameraTakePicture(false)
        const photoUrl = await $db.upload({
          path: `/CHATS/${props.chat.id}/${ new Date().getTime() }.jpg`,
          data: photoBase64,
          base64: true
        })
        // console.log('photoUrl', photoUrl)

        if (photoUrl) {
          uploadComplete.value = true
          imageUrl.value = photoUrl
          emit('url', imageUrl.value)
        }
      } catch {
        // ...
      } finally {
        imageLoading.value = false
      }
    }

    watchEffect(() => {
      uploadComplete.value = !!props.currentUrl;
    })


    return {
      loadImageHandler,
      imageLoading,
      uploadComplete,
      imageUrl
    }
  }
})
</script>
