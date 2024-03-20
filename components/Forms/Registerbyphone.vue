<template>
  <v-form ref="formEl" @submit.prevent="validate">
    <div class="text-center">
      <VuePhoneNumberInput class="mt-5 mb-10 phoneNumberInput"
        v-model="form.phoneNumberFormatted"
        @update="updatePhoneNumber($event)"
        required
        :translations="{
          countrySelectorLabel: '',
          phoneNumberLabel: $t('form.phone')
        }"
      />

      <v-btn
        :disabled="!valid"
        :loading="loading"
        color="primary"
        elevation="0"
        id="signInButton"
        type="submit"
      >
        {{ $t('btn.send_code') }}
      </v-btn>

      <div class="text-center mt-5">
        <OnboardingPrivacypolicy class="mt-15" />
        <div v-if="false" class="d-inline-flex justify-center agreeToTerms">
          <v-checkbox
            v-model="agreeToTerms"
            :label="$t('onboarding.agree_to_terms')"
            required
          ></v-checkbox>
        </div>
      </div>
    </div>
    <v-dialog v-model="form.showOtpInput" max-width="500">
      <!-- MAKE COMPONENT -->
      <v-card class="elevation-0 pa-12 rounded-xl">
        <ElementH3 :text="$t('heading.we_sent_you_sms_code')" align="center" />
        <v-text-field
            :label="$t('form.code')"
            :placeholder="$t('form.code')"
            class="mt-5 mx-8"
            outlined background-color="#f8f9fa"
            max=6
            type="number"
            v-model="form.otpProvided"
            oninput="if(Number(this.value.length) > Number(this.max)) this.value = this.value.substring(0, Number(this.max));"
        ></v-text-field>
        <div class="text-center">
          <v-btn
              :loading="loading"
              color="primary"
              elevation="0"
              class="text-center"
              type="submit"
              @click="confirmWithOTPCode"
          >
            {{ $t('btn.verify') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>

import {
  defineComponent,
  useContext,
  useRouter,
  onMounted,
  ref,
  useStore, nextTick
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { RecaptchaVerifier } from "firebase/auth"

export default defineComponent({
  name: 'FormsRegisterbyphone',
  components: {
    VuePhoneNumberInput
  },
  setup () {
    const { $db, $helper, $notify, $ttlStorage, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const valid = ref(true)
    const recaptchaContainer = ref(null)
    const signInButton = ref(null)
    const agreeToTerms = ref(true)
    const rules = formRules
    const formEl = ref(null)
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
      form.value.phone = e?.formattedNumber?.trim().toLowerCase()
    }
    const validate = async () => {
      loading.value = true

      if (!agreeToTerms.value) {
        return $notify.show({text: i18n.t('notify.agree_to_terms'), color: 'error'})
      }

      valid.value = await formEl.value.validate()

      if (!form.value.phone) {
        $notify.show({text: i18n.t('notify.error_try_again'), color: 'error'})
        valid.value = false
      }

      if (valid.value) {
        await register()
      }

      loading.value = false
    }
    const register = async () => {
      loading.value = true

      await $db.fire().signInWithPhoneNumber($db.fire().auth, form.value.phone, window.recaptchaVerifier).then(confirmationResult => {
        // SUCCESS -> confirm
        window.confirmationResult = confirmationResult
        loading.value = false

      }).catch(e => {
        loading.value = false
        console.log('STICKY: Error signing in with phone number:', e)

        if (e && e.message && e.message !== 'reCAPTCHA placeholder element must be an element or id') {
          $notify.show({ text: e.message, color: 'error' })
          return
        }
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      })
    }
    const confirmWithOTPCode = async () => {
      if (!form.value.otpProvided || form.value.otpProvided.length < 6) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        return false
      }

      loading.value = true

      try {
        await window.confirmationResult.confirm(form.value.otpProvided).then(result => {
          form.value.showOtpInput = false
          loading.value = false

          $ttlStorage.set('onboardingComplete', true)
          console.log('STICKY: USER', result.user)
          $notify.show({ text: i18n.t('notify.success'), color: 'green' })

          // If EXISTING user show logged in message
          if (!result?.additionalUserInfo?.isNewUser) {
            return router.push('/')
          }
          // NEW USER
          else {
            dispatch('user/updateField', {
              phone: form.value.phone.trim().toLowerCase(),
              created_at: new Date()
            })
            return router.push('/auth/setup-profile')
          }

        })
      } catch (e) {
        console.log('STICKY: Error signing in with phone number:', e)
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })

      } finally {
        loading.value = false
      }
    }
    const initRecaptcha = async () => {
      try {
        await $helper.sleep(1000)

        window.recaptchaVerifier = new RecaptchaVerifier($db.fire().auth, 'signInButton', {
          size: 'invisible',
          callback: (response) => {
            console.log('WORKS > Sign user on:', response)
            form.value.showOtpInput = true
          },
          'expired-callback': () => {
            console.log('Expired reCaptcha')
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
          }
        })

      } catch (e) {
        console.log('initRecaptcha', e)
      }
    }

    // MOUNT
    onMounted(async() => {
      nextTick(async () => {
        await initRecaptcha()
      })
    })

    return {
      loading,
      valid, agreeToTerms,
      form,
      formEl,
      rules,
      recaptchaContainer,
      signInButton,
      updatePhoneNumber,
      validate,
      register,
      confirmWithOTPCode
    }
  }
})
</script>
