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
                  duration: 900,
                  opacity: [0, 1],
                  easing: 'easeInOutQuad'
               }"
        />
        <OnboardingCardheader class="gray--text mb-10 mx-14" :h1="$t('know_your_safe')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 600,
                delay:900
              }">
        <div>
          <h5 class="text-h5 text-center mb-6">{{ $t('include_email') }}</h5>
          <FormsRegisterbyemail goTo="/onboarding/3" :required="false" />
          <div class="text-center mt-4">
            <v-btn class="elevation-0" primary text to="/onboarding/3">
              {{ $t('skip_for_now') }}
            </v-btn>
          </div>
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
  useMeta,
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'OnboardingPage2',
  layout: 'onboarding',
  setup () {
    const {
      $config,
    } = useContext()
    const loading = ref(false)
    const rules = formRules
    const isFormValid = ref(false)
    const formEl = ref()
    const form = ref({
      email: '',
      password: ''
    })
    const showPassword = ref(false)

    // METHODS

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
      rules,
      isFormValid,
      form,
      formEl,
      showPassword,
    }
  },
  head: {}
})
</script>
