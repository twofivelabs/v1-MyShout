<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" h1="What is your phone number?" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 900,
                delay:900
              }">
        <div>
          <h5 class="text-h5 text-center mb-6">Your phone number is vital for alerting your friends and family in case of emergency.</h5>
          <v-form ref="formEl" @submit.prevent="validate">
            <VuePhoneNumberInput class="my-6"
                                 v-model="form.phoneNumberFormatted"
                                 @update="updatePhoneNumber($event)"
                                 required
                                 :translations="{ countrySelectorLabel: '' }"
            />
            <div class="text-center mt-15">
              <v-btn
                  :loading="loading"
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
          </v-form>
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
  useStore,
  useRouter
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default defineComponent({
  name: 'OnboardingPage4.1',
  layout: 'onboarding',
  middleware: 'authenticated',
  components: {
    VuePhoneNumberInput
  },
  setup () {
    const {
      $config, $notify, $helper
    } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const rules = formRules
    const isFormValid = ref(false)
    const formEl = ref()
    const form = ref({
      phone: '',
      phoneNumber: null,
      phoneNumberFormatted: null,
      showOtpInput: false,
      otpProvided: null
    })

    // METHODS
    const updatePhoneNumber = (e) => {
      form.value.phoneNumberFormatted = e.formattedNumber
      form.value.phone = e.formattedNumber
    }
    const validatePhone = async () => {
      if (!form.value.phone) {
        return false
      }

      const hasUsers = await dispatch('user/search', {
        field: 'phone',
        operator: '==',
        term: $helper.formatPhone(form.value.phone, 'db'),
        limit: 3
      })
      if (hasUsers.length > 0) {
        $notify.show({ text: 'Phone invalid or is inuse by another user', color: 'error' })
        return false
      }
      return true;
    }
    const validate = async () => {
      loading.value = true
      isFormValid.value = await formEl.value.validate()
      if(!await validatePhone()) {
        isFormValid.value = false
        console.log('Validate phone')
        return
      }

      // eslint-disable-next-line no-unreachable
      if (isFormValid.value) {

        // Save User
        await dispatch('user/updateField', {
          phone: $helper.formatPhone(form.value.phone, 'db')
        })

        // Move on
        $notify.show({ text: 'Success', color: 'green' })
        await router.push('/onboarding/5')
      }
      loading.value = false
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
      rules,
      isFormValid,
      form,
      formEl,
      updatePhoneNumber,
      validate
    }
  },
  head: {}
})
</script>
