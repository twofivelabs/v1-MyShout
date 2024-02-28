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
                easing: 'easeInOutQuad',
                duration: 600,
                delay:600
              }">
        <div class="text-center">
          <h5 class="text-h5 text-center mb-6">
            {{ $t('onboarding.enable_location_permissions_sub') }}
          </h5>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.location_requirements_1') }}
          </h6>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.location_requirements_3') }}
          </h6>
<!--          <h6 class="primary&#45;&#45;text text-h6 text-center mb-6">
            {{ $t('onboarding.location_requirements_4') }}
          </h6>-->

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
            <OnboardingPrivacypolicy :showTermsText="false" class="" />

            <v-btn
                :loading="loading"
                @click="goNext"
                color="primary"
                dark
                x-large
                type="submit"
                class="white--text mt-10"
            >
              <v-icon>mdi-check</v-icon>
              {{ $t('btn.yes_i_agree') }}
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
  useRouter
} from '@nuxtjs/composition-api'
//import {Geolocation} from '@capacitor/geolocation'

export default defineComponent({
  name: 'OnboardingPage6',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config, $capacitor, $services
    } = useContext()
    const {
      state, dispatch
    } = useStore()
    const router = useRouter()
    const profile = computed(() => state.user.profile)
    const loading = ref(false)
    const hasPermission = ref(false)

    // METHODS
    const goNext = async () => {
      loading.value = true

      setTimeout(async () => {
        //Geolocation.checkPermissions().then(async (permission) => {
        //  if (permission.location === 'granted') {
        //    hasPermission.value = true
        //  }
        //})

        $capacitor.gpsInit()
        // await $capacitor.positionPermissions()
        await $services.getSetUserGeneralLocation()

        await dispatch('user/updateField', {
          permissions: {
            location: true
          }
        })

        loading.value = false
        router.push('/onboarding/7')

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
      hasPermission,
      goNext
    }
  },
  head: {}
})
</script>
