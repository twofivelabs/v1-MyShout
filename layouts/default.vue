<template>
  <v-app
    :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`"
    :class="`grey lighten-5`"
    dark
  >
    <v-main>
      <div>
        <GlobalIsoffline/>
        <Nuxt keep-alive/>
      </div>
    </v-main>
    <GlobalSnackbar/>
    <GlobalMobilefooter/>
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
      dispatch
    } = useStore()

    const {
      $remoteConfig,
      $ttlStorage,
      $system,
      i18n,
      $capacitor
    } = useContext()
    const loading = ref(false)
    const extraClassNames = ref(null)

    onBeforeMount(async () => {
      try {
        // If state is available load the UID
        let uid = null
        if (state.user.data) {
          uid = await state.user.data.uid
        } else if (state.storage.uid) {
          uid = await state.storage.uid
        }

        // Signing up anonymously, will provide them with an ID with firebase
        if (uid) {
          await dispatch('user/setUserProfile', uid)
        }
      } catch {
        // Error
      }

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

      setTimeout(() => {
        dispatch('user/notifications/listen')
      }, 1500)

      $system.initDarkMode()

      // Load remote config from firebase
      try {
        $remoteConfig.load()
      } catch {
        // ... ERROR
      }

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
