<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" prependIcon="mdi-google-maps" :h1="$t('onboarding.enable_location_permissions_heading')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 900,
                delay:900
              }">
        <div class="text-center">
          <h5 class="text-h5 text-center mb-6">
            {{ $t('onboarding.enable_location_permissions_sub') }}
          </h5>

          <v-icon
              v-if="hasPermission"
              class="mt-7"
              color="green"
              size="120"
              v-anime="{
                translateY: [100, 0],
                duration: 1200
              }"
          >
            mdi-checkbox-marked-circle-outline
          </v-icon>

          <div class="text-center mt-15">
            <v-btn
                :loading="loading"
                color="primary"
                fab
                dark
                x-large
                type="submit"
                class="white--text"
                to="/onboarding/7"
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
  useMeta,
  useStore,
  onMounted
} from '@nuxtjs/composition-api'
import {Geolocation} from '@capacitor/geolocation'

export default defineComponent({
  name: 'OnboardingPage6',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config, $capacitor
    } = useContext()
    const {
      state
    } = useStore()
    const profile = computed(() => state.user.profile)
    const loading = ref(false)
    const hasPermission = ref(false)

    // METHODS

    // MOUNT
    onMounted(() => {
      Geolocation.checkPermissions().then(async (permission) => {
        if (permission.location === 'granted') {
          hasPermission.value = true
        }
      })

      setTimeout(() => {
        $capacitor.positionPermissions()
      },1500)
    })

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
      hasPermission
    }
  },
  head: {}
})
</script>
