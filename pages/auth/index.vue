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
                duration: 600,
                opacity: [0, 1],
                easing: 'easeInOutQuad'
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
          duration: 600,
          delay: 600
        }"
      >
        <v-tabs
          v-model="activeTab"
          background-color="transparent"
          class="loginTabs"
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
                <FormsRegisterbyphoneweb v-if="device === 'web'" goTo="/" />
                <FormsRegisterbyphonemobile v-else goTo="/" />

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = false"
                >
                  {{ $t('use_email_address') }}
                </v-btn>
              </div>
              <div v-else>
                <FormsAuthemaillogin />

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = true"
                >
                  {{ $t('use_phone_number') }}
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item class="pt-3">
              <div v-if="phoneAuth">
                <FormsRegisterbyphoneweb v-if="device === 'web'" goTo="/auth/username" />
                <FormsRegisterbyphonemobile v-else goTo="/auth/username" />

                <v-btn
                  text block
                  class="mx-auto mt-5"
                  @click="phoneAuth = false"
                >
                  {{ $t('use_email_address') }}
                </v-btn>
              </div>
              <div v-else>
                <FormsAuthemailregister />

                <v-btn
                  text block
                  class="mx-auto mt-5 mb-5"
                  @click="phoneAuth = true"
                >
                  {{ $t('use_phone_number') }}
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
  name: 'AuthIndex',
  layout: 'onboarding',
  setup () {
    const {
      $config, $capacitor
    } = useContext()
    const loading = ref(false)
    const activeTab = ref('Login')
    const phoneAuth = ref(false)
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
.loginTabs .v-tab {
  font-weight:600;
}

</style>
