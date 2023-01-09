<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-around align-center" style="height:100vh">

      <div>
        <OnboardingCardheader class="gray--text mt-6 mx-14" />
        <v-img alt="MyShout Logo" src="/logo/MyShout-Logo.svg"
               class="mx-auto"
               contain
               max-width="250"
               v-anime="{
                  translateY: [100, 0],
                  duration: 1200,
                  opacity: [0, 100],
                  easing: 'easeInOutQuad',
               }"
        />
      </div>
      <v-btn
          color="primary"
          fab
          dark
          x-large
          class="white--text"
          to="/onboarding/2"
          v-if="false"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  useContext,
  useMeta,
  useRouter,
  onMounted
} from '@nuxtjs/composition-api'


export default defineComponent({
  name: 'OnboardingPage1',
  layout: 'onboarding',
  setup () {
    const {
      $config,
    } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // METHODS
    onMounted(() => {
      setTimeout(() => {
        router.push('/onboarding/2')
      }, 1700)
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
      location,
    }
  },
  head: {}
})
</script>
