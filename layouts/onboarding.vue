<template>
  <v-app dark class="" :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`">
    <v-main>
      <div v-if="$nuxt.isOffline" class="text-center">
        Uh Oh! It looks like you are offline. We require a network connection.
      </div>
      <div v-else>
        <Nuxt keep-alive />
      </div>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>
<script>

import {
  defineComponent, onMounted,
  ref, useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingLayout',
  setup () {
    const loading = ref(false)
    const {
      $capacitor
    } = useContext()
    // DEFINE CONTENT

    // MOUNT
    onMounted(() => {
      $capacitor.AdMob_hideBanner()
    })

    return {
      loading
    }
  }
})
</script>
