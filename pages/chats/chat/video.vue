<template>
  <v-container class="mobileNotch" style="height:calc(100vh - 75px);">
    <v-row class="pa-6" v-if="loading">
      <v-col>
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
      </v-col>
    </v-row>
    <div v-else class="">
      <div class="d-flex flex-column justify-space-between" style="height:75vh;">
        <div>
          <VideoCamera :chatId="chatId" @url="urlCallback" />
        </div>
      </div>
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

    onMounted(() => {
      console.log('ROUTE:', route)
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
      urlCallback
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
