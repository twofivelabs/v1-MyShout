<template>
  <v-app :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`"
         class="grey lighten-5"
         dark
  >
    <!--<GlobalNavbar/>-->
    <v-main>
      <div>
        <GlobalIsoffline/>
        <Nuxt keep-alive/>
      </div>
    </v-main>
    <GlobalSnackbar/>
    <GlobalFooter/>
    <GlobalMobilefooter/>
    <!-- <NotificationsPush />-->
  </v-app>
</template>
<script>

import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  useContext,
  useRoute,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DefaultLayout',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const router = useRouter()
    const {
      $config,
      $remoteConfig,
      $ttlStorage,
      $vuetify,
      $fire,
      $system,
      $capacitor,
      i18n
    } = useContext()
    const route = useRoute()
    const loading = ref(false)

    // DEFINE CONTENT
    const isIphone = route.value.query.isIphone
    const isAndroid = route.value.query.isAndroid
    const isIpad = route.value.query.isIpad
    const location = route.value.query.location

    // METHODS

    // MOUNT
    onBeforeMount(async () => {
      /**
       * Check if user has completed onboarding. We check on mobile and storage
       * TODO: Save this in user profile
       */
      if (!$ttlStorage.get('onboardingComplete') && $vuetify.breakpoint.mdAndDown) {
        if (window.location.pathname !== '/onboarding') {
          console.log('go to onboarding, default')
          router.push('/onboarding')
        }
      }

      try {
        // If state is available load the UID
        let uid = null
        if (state.user.data) {
          uid = await state.user.data.uid
        } else if (state.storage.uid) {
          uid = await state.storage.uid
        }

        // Signing up anonymously, will provide them with an ID with firebase
        if (!uid) {
          if ($config.useAnonymousSignUp) {
            try {
              $fire.auth.signInAnonymously()
                  .then(() => {
                    // ... SUCCESS
                  }).catch((e) => {
                    $system.log({
                      comp: 'DefaultLayout',
                      msg: 'Error trying to sign in anonymously',
                      val: e
                    })
                  })
            } catch(e) {
              $system.log({
                comp: 'DefaultLayout',
                msg: 'Error trying to sign in anonymously 2',
                val: e
              })
            }
          }
        }
        else {
          await dispatch('user/setUserProfile', uid)
        }
      } catch {
        // Error
      }

      /**
       * Deep Linking for mobile
       * This should open the app if someone clicks a link, and they have the app installed
       */
      if ((isIphone === 'iPhone' || isAndroid === 'Android') && isIpad === 'null') {
        window.location = `${$config.deepLink}://${location}`
      }
    })
    onMounted(() => {
      const code = $ttlStorage.get('locale')
      i18n.setLocale(code)

      $system.initDarkMode()

      setTimeout(() => {
        $capacitor.AdMob_init()
        $capacitor.AdMob_banner()
      }, 1500)

      // Load remote config from firebase
      try {
        $remoteConfig.load()
      } catch {
        // ... ERROR
      }
    })

    return {
      loading,
    }
  }
})
</script>
