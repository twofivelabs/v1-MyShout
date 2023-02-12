<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" :h1="$t('onboarding.add_photo_heading')" />
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
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.add_photo_sub') }}</h5>

          <UserProfileavatar :user="profile" :size="120" class="mt-5 mx-auto" />

          <div class="text-center mt-15">
            <v-btn
                :loading="loading"
                color="primary"
                fab
                dark
                x-large
                type="submit"
                class="white--text"
                to="/onboarding/6"
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
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingPage5',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config,
    } = useContext()
    const {
      state
    } = useStore()
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

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
      profile
    }
  },
  head: {}
})
</script>
