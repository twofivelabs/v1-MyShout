<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:43vh;">
        <v-img alt="MyShout Logo" src="/logo/MyShout-Logo.svg"
             class="mx-auto"
             contain
             max-width="200"
             v-anime="{
                        translateY: [100, 0],
                        duration: 1200
                     }"
        />
        <OnboardingCardheader class="gray--text mb-10 mx-14" h1="Let family & friends know you're safe!" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:57vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 900,
                delay:900
              }">
        <div v-if="!showNext">
          <h5 class="text-h5 text-center">Provide your phone number to start chatting</h5>
          <FormsRegisterbyphoneweb v-if="device === 'web'" class="pt-6" goTo="/" @response="emittedResponseFunc" />
          <FormsRegisterbyphonemobile v-else class="pt-6" goTo="/" @response="emittedResponseFunc" />
        </div>

        <div class="text-center mt-5">
          <OnboardingPrivacypolicy class="mt-15" />
          <div class="d-inline-flex justify-center agreeToTerms">
            <v-checkbox
                v-model="agreeToTerms"
                label="Yes, I agree to terms"
                required
            ></v-checkbox>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent, reactive,
  ref,
  useContext,
  useMeta, onMounted, watch, useRouter
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingPage2',
  layout: 'onboarding',
  setup () {
    const {
      $config, $capacitor, $ttlStorage, $notify
    } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const showNext = ref(false)
    const device = ref('mobile')
    const agreeToTerms = ref(false)
    const onboardingState = reactive({
      phoneNumber: null,
      phoneNumberFormatted: null,
      otpProvided: null,
      showOtpInput: false,
    })
    const goTo = ref('/onboarding/2.1')

    // METHODS
    const updatePhoneNumber = (e) => {
      onboardingState.phoneNumberFormatted = e.formattedNumber
    }
    const emittedResponseFunc = (res) => {
      if (res.status === 'success') {
        goTo.value = res.goTo
        onboardingState.showOtpInput = false
        showNext.value = true
        $ttlStorage.set('onboardingComplete', true)
      }
    }

    // MOUNTED
    onMounted(async() => {
      const d = await $capacitor.device()
      if(d.platform === 'web') {
        device.value = 'web'
      }
    })

    // WATCH
    watch(showNext, (val) => {
      if (val) {
        if (agreeToTerms.value) {
          router.push(goTo.value)
        } else {
          $notify.show({ text: 'You must agree to terms before continuing', color: 'error' })
        }
      }
    })
    watch(agreeToTerms, (val) => {
      if (val) {
        if (showNext.value) {
          router.push(goTo.value)
        } else {
          $notify.show({ text: 'You must validate your phone number before continuing', color: 'error' })
        }
      }
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
      onboardingState,
      showNext,
      device,
      agreeToTerms,
      updatePhoneNumber,
      emittedResponseFunc
    }
  },
  head: {}
})
</script>
<style>
.agreeToTerms label {
  font-size:13px;
}
</style>
