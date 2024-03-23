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
    const { $system, $capacitor, $db, $notify, i18n } = useContext()
    const imageLoading = ref(false)
    const uploadComplete = ref(false)
    const imageUrl = ref()

    // METHODS
    const loadImageHandler = async () => {
      imageLoading.value = true
      uploadComplete.value = false

      try {
        const photoBase64 = await $capacitor.cameraTakePicture(false)

        const filePath = `/CHATS/${props.chat.id}/${ new Date().getTime() }.jpg`
        const photoUrl = await $db.upload(filePath, photoBase64, {
          base64: true,
          metaData: {
            contentType: 'image/jpeg'
          }
        }).catch((e) => {
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
          console.log('STICKY: image upload error: ', e, JSON.stringify(e))
        })

        if (photoUrl) {
          uploadComplete.value = true
          imageUrl.value = photoUrl

          emit('url', imageUrl.value)
        }
      } catch (e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        console.log('STICKY: error trying to take/select picture: ', e, JSON.stringify(e))

        $system.log({ comp: 'ChatUploadimage', msg: 'Error', val: e })
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
