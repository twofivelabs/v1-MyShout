<template>
  <v-container class="mobileNotch" style="height:calc(100vh - 75px);">
    <div class="d-flex flex-column justify-space-between" style="height:75vh;">
      <VideoCamera :chatId="chatId" @url="urlCallback" @close="closeCamera" />
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  useContext,
  useMeta, useRoute,
  useRouter, onMounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatVideoPage',
  middleware: 'authenticated',
  setup () {
    const {
      $config,
    } = useContext()
    const route = useRoute()
    const router = useRouter()
    const chatId = ref(null)

    const urlCallback = (url) => {
      console.log('urlCallback: ', url)
      setTimeout(() => {
        router.push(`/chats/chat/${chatId.value}?videoUrl=${url}`)
      }, 1500)
    }

    const closeCamera = () => {
      return router.push(`/chats/chat/${chatId.value}`)
    }

    onMounted(() => {
      chatId.value = route.value?.query?.chatId
    })

    // PAGE META
    useMeta({
      title: `${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: ``
      }]
    })

    return {
      chatId,
      urlCallback, closeCamera
    }
  },
  head: {}
})
</script>
<style scoped>
.v-main {
  padding:0 !important;
}
</style>
