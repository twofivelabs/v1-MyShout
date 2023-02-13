<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style="width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" :h1="$t('onboarding.thank_you_heading')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: 600,
                delay:600
              }">
        <div class="text-center d-flex flex-column justify-space-around">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.thank_you_sub') }}</h5>
          <div class="text-center mt-15">
            <v-btn
                :loading="loading"
                @click="goNext"
                color="primary"
                fab
                dark
                x-large
                type="submit"
                class="white--text"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
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
  useMeta, useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingPage8',
  layout: 'onboarding',
  setup () {
    const {
      $config, $capacitor
    } = useContext()
    const {
      state,
    } = useStore()
    const profile = computed(() => state.user.profile)
    // const user = computed(() => state.user.data)
    const loading = ref(false)
    const router = useRouter()

    const goNext = () => {
      loading.value = true

      setTimeout(async () => {
        try {
          await $capacitor.localNotificationRequestPermission()
          await $capacitor.localNotificationSchedule()

        } catch(e) {
          console.log('STICKY: local notifications issue', e)
        }

        // PUSH NOTIFICATION PERMISSIONS
        try {
          await $capacitor.pushNotificationsListeners()
          await $capacitor.pushNotificationsGetToken()
          await $capacitor.pushNotificationsListeners()
          console.log('STICKY: NOTIFICATIONS > Mobile > True')

          return true
        } catch(e) {
          console.log('STICKY: 8-CheckPermissions: ', e)

        } finally {
          loading.value = false
          router.push('/')
        }

      },1500)
    }

    // PAGE META
    useMeta({
      title: `${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Discover ${$config.appTitle}`
      }]
    })

    return {
      loading,
      profile,
      goNext
    }
  },
  head: {}
})
</script>
