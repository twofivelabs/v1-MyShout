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
        <OnboardingCardheader class="gray--text mb-10 mx-14" :h1="$t('know_your_safe')" />
      </div>

      <!-- WHITE CARD -->
      <div 
        class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" 
        style="width:100vw; max-width:700px;" 
        v-anime="{
          translateY: [200, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 900,
          delay:900
        }"
      >
        <v-tabs
          v-model="activeTab"
          background-color="transparent"
          fixed-tabs
        >
          <v-tab>
            {{ $t('btn.login') }}
          </v-tab>
          <v-tab>
            {{ $t('btn.sign_up') }}
          </v-tab>
          <v-tabs-items v-model="activeTab" class="">
            <v-tab-item>
              <div v-if="phoneAuth">
                <h5 class="text-h5 text-center">{{ $t('heading.login_phone') }}</h5>

                <FormsRegisterbyphoneweb v-if="device === 'web'" class="pt-6" goTo="/" />
                <FormsRegisterbyphonemobile v-else class="pt-6" goTo="/" /> 

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = false"
                >
                  Use Email Address
                </v-btn>
              </div>
              <div v-else>
                <h5 class="text-h5 text-center">{{ $t('heading.login_email') }}</h5>

                <FormsAuthemaillogin class="pt-6" />

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = true"
                >
                  Use Phone Number
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item class="pt-3">
              <div v-if="phoneAuth">
                <h5 class="text-h5 text-center">{{ $t('heading.signup_phone') }}</h5>

                <FormsRegisterbyphoneweb v-if="device === 'web'" class="pt-6" goTo="/" />
                <FormsRegisterbyphonemobile v-else class="pt-6" goTo="/" /> 

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = false"
                >
                  Use Email Address
                </v-btn>
              </div>
              <div v-else>
                <h5 class="text-h5 text-center">{{ $t('heading.signup_email') }}</h5>

                <FormsAuthemailregister class="pt-6" />

                <v-btn
                  text block
                  class="mx-auto mt-5 mb-5"
                  @click="phoneAuth = true"
                >
                  Use Phone Number
                </v-btn>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
          
      </div>
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  useContext,
  useMeta, onMounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingPage2',
  layout: 'onboarding',
  setup () {
    const {
      $config, $capacitor
    } = useContext()
    const loading = ref(false)
    const activeTab = ref('Login')
    const phoneAuth = ref(true)
    const device = ref('mobile')
    
    // MOUNTED
    onMounted(async() => {
      const d = await $capacitor.device()
      if(d.platform === 'web') {
        device.value = 'web'
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
      activeTab,
      phoneAuth,
      device
    }
  },
  head: {}
})
</script>
<style>
.agreeToTerms label {
  font-size:13px;
}
.v-tabs-items {
  padding-top:2vh;
  background-color: transparent !important;
}

</style>
