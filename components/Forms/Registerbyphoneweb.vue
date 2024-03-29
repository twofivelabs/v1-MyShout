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
        id="recaptchaContainer"
        type="submit"
      >
        {{ $t('btn.send_code') }}
      </v-btn>

      <div class="text-center mt-5">
        <OnboardingPrivacypolicy class="mt-15" />
        <div class="d-inline-flex justify-center agreeToTerms">
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
              @click="registerWithOTPCode"
          >
            {{ $t('btn.verify') }}
          </v-btn>

<!--          <FormsRecoverbyemail />-->
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

export default defineComponent({
  name: 'FormsRegisterbyphoneweb',
  components: {
    VuePhoneNumberInput
  },
  emits: [
    'response'
  ],
  props: {
    goTo: {
      type: String,
      default: '/'
    },
  },
  setup (props, { emit }) {
    const { $fire, $fireModule, $helper, $notify, $system, $ttlStorage, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    // DEFINE CONTENT
    const valid = ref(true)
    const recaptchaContainer = ref(null)
    const agreeToTerms = ref(false)
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
      form.value.phone = e.formattedNumber
    }
    const validate = async () => {
      loading.value = true

      if (agreeToTerms.value) {
        valid.value = await formEl.value.validate()
        if (valid.value) {
          await register()
        }
      } else {
        $notify.show({ text: i18n.t('notify.agree_to_terms'), color: 'error' })
      }

      loading.value = false
    }
    const register = async () => {
      if (form.value.phone) {
        loading.value = true
        form.value.showOtpInput = true

        try {
          // Create firebase credentials
          window.confirmationResult = await $fire.auth.signInWithPhoneNumber(form.value.phone.trim().toLowerCase(), recaptchaContainer.value)

        } catch (e) {
          // await initRecaptcha()

          if(e && e.message) {
            if (e.message === 'reCAPTCHA placeholder element must be an element or id') {
              // ...
            } else {
              $notify.show({ text: e.message, color: 'error' })

            }
            // emit('response', { status: 'error', message: e.message })
          } else {
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
            // emit('response', { status: 'error', message: 'Error registering phone number 1' })
          }

          $system.log({
            comp: 'FormsRegisterbyphoneweb',
            msg: 'Registering phone number',
            val: e
          })
        }
      } else {
        // await initRecaptcha()

        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        // emit('response', { status: 'error', message: 'Error try again' })
        console.log('STICKY: No phone number')

      }
    }
    const registerWithOTPCode = async () => {
      loading.value = true

      try {
        const result = await window.confirmationResult.confirm(form.value.otpProvided)

        // Technically they have an account now, so we can bypass onboarding IF they are already a user
        $ttlStorage.set('onboardingComplete', true)

        // If EXISTING user show logged in message
        if (!result.additionalUserInfo.isNewUser) {
          $notify.show({text: i18n.t('notify.success'), color: 'green'})
          emit('response', {status: 'success', message: 'Successfully logged in'})

          // Update Profile
          await dispatch('user/updateField', {
            phone: form.value.phone.trim().toLowerCase()
          })

          if (props.goTo) {
            console.log('PUSH USER TO ', props.goTo)
            router.push(props.goTo)
          }
          console.log('We are not taking the user anywhere')
        }
        // If NEW user
        else {
          form.value.showOtpInput = false
          $notify.show({ text: i18n.t('notify.success'), color: 'green' })
          emit('response', { status: 'success', message: 'Successfully registered' })

          await dispatch('user/updateField', {
            phone: form.value.phone.trim().toLowerCase(),
            created_at: new Date()
          })
        }
      } catch (e) {
        // await initRecaptcha()

        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        emit('response', { status: 'error', message: 'Error with phone code' })

        $system.log({
          comp: 'FormsRegisterbyphoneweb',
          msg: 'Registering phone code',
          val: e
        })

      } finally {
        loading.value = false
        form.value.showOtpInput = false
      }
    }
    const initRecaptcha = async () => {
      try {
        await $helper.sleep(2000)
        recaptchaContainer.value = new $fireModule.auth.RecaptchaVerifier('recaptchaContainer', {
          size: 'invisible',
          callback: () => {
            console.log('WORKS')
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
      updatePhoneNumber,
      validate,
      register,
      registerWithOTPCode
    }
  }
})
</script>
