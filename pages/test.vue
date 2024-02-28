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
    <div v-else class="mx-5 pt-2">
      <div class="d-flex flex-column justify-space-between" style="height:75vh;">
        <div>
          <VideoCamera chatId="FtuE04kE72naVBCFk8s2" />
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TestPage',
  middleware: 'authenticated',
  setup () {
    const {
      state,
    } = useStore()
    const {
      $config,
    } = useContext()
    const loading = ref(false)
    const user = computed(() => state.user)

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
      loading,
      user,
    }
  },
  head: {}
})
</script>
<style scoped>
.vue-google-map, .vue-google-map .map-view {
  height: 100vh;
}
</style>
