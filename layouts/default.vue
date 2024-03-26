<template>
  <v-app
    :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`"
    :class="`grey lighten-5`"
    dark
  >
    <v-progress-linear v-if="$store.state.appLoading" class="mb-0" indeterminate />
    <v-main v-if="!$store.state.appLoading">
      <div>
        <GlobalIsoffline/>
        <Nuxt keep-alive/>
      </div>
    </v-main>
    <GlobalSnackbar v-if="!$store.state.appLoading"/>
    <GlobalMobilefooter v-if="!$store.state.appLoading"/>
  </v-app>
</template>
<script>

import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  useContext,
  //useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DefaultLayout',
  setup () {
    const {
      state,
    } = useStore()

    const {
      $ttlStorage,
      $system,
      i18n,
      $capacitor
    } = useContext()
    const loading = ref(false)
    const extraClassNames = ref(null)

    onBeforeMount(async () => {
      /**
       * Deep Linking for mobile
       * This should open the app if someone clicks a link, and they have the app installed
       */
      /*if ((isIphone === 'iPhone' || isAndroid === 'Android') && isIpad === 'null') {
        window.location = `${$config.deepLink}://${location}`
      }*/
    })
    onMounted(() => {
      const code = $ttlStorage.get('locale')
      i18n.setLocale(code)

      $system.initDarkMode()

      setTimeout(() => {
        //Do not initiate AdMob if the user's role is Admin
        if (state.user.profile.role.isAdmin) return;

        $capacitor.AdMob_init()
        $capacitor.AdMob_banner()

        // BACKGROUND TASKS
        // $capacitor.background_tasksInit()

      }, 2500)
    })

    return {
      loading,
      extraClassNames
    }
  }
})
</script>
