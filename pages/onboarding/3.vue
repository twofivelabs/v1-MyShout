<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style="width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" :h1="$t('onboarding.profile_setup_heading')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                duration: 600,
                delay:600,
                opacity: [0, 1],
                easing: 'easeInOutQuad'
              }">
        <div class="d-flex flex-column align-center">
          <div>
            <h5 class="text-h5 text-center">{{ $t('onboarding.profile_setup_sub') }}</h5>
          </div>
          <v-spacer />
          <v-btn
              color="primary"
              fab
              dark
              x-large
              class="white--text mt-15"
              to="/onboarding/4"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
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

export default defineComponent({
  name: 'OnboardingPage3',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config, $ttlStorage
    } = useContext()
    const loading = ref(false)

    // Technically they have an account now, so we can bypass onboarding IF they are already a user
    $ttlStorage.set('onboardingComplete', true)

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
    }
  },
  head: {}
})
</script>
