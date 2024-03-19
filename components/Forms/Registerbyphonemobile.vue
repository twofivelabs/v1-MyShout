<template>
  <v-form ref="formEl" @submit.prevent="validate">
    <div v-if="!form.showOtpInput" class="text-center">
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
            class="mt-5 mx-8 pl-2"
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
  useStore,
  ref, onMounted, nextTick,
} from '@nuxtjs/composition-api'
import {firebaseApp} from '~/firebaseConfig'
import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default defineComponent({
  name: 'FormsRegisterbyphonemobile',
  components: {
    VuePhoneNumberInput
  },
  setup () {
    const { $notify, $system, $ttlStorage, i18n, $helper, $db } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const agreeToTerms = ref(true)
    const rules = formRules
    const recaptchaContainer = ref(null)
    const formEl = ref(null)
    const form = ref({
      phone: '',
      phoneNumber: null,
      phoneNumberFormatted: null,
      showOtpInput: false,
      otpProvided: null,
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
        if (valid.value) await signInWithPhoneNumber()
      } else {
        $notify.show({ text: i18n.t('notify.agree_to_terms'), color: 'error' })
      }

      loading.value = false
    }

    const signInWithPhoneNumber = async () => {
      //eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {

        await $db.fire().capAuth.addListener('phoneCodeSent', async event => {
          // 2. Let the user enter the SMS code
          const verificationCode = window.prompt(
              'Please enter the verification code that was sent to your mobile device.',
          )
          // 3. Sign in on the web layer using the verification ID and verification code.
          const credential = $db.fire().PhoneAuthProvider.credential(
              event.verificationId,
              verificationCode,
          )

          await $db.fire().signInWithCredential($db.fire().auth, credential)
          resolve()
        })

        // 1. Start phone number verification
        await $db.fire().capAuth.signInWithPhoneNumber({
          phoneNumber: form.value.phone.trim().toLowerCase(),
          timeout: 0, // Disable SMS auto-retrieval
        }).then(() => {
          console.log('STICKY: SIGNED IN WITH PHONE?')
        }).catch(e => {
          console.log('STICKY: Error logging in with phone:', e)
        })
      })
    }
    //eslint-disable-next-line no-unused-vars
    const registerPhoneNumber = async () => {
      loading.value = true

      const phone = form.value.phone.trim().toLowerCase()

      try {
        // Start sign in with phone number and send the SMS
        await $db.fire().capAuth.signInWithPhoneNumber({
          phoneNumber: phone,
        })
        form.value.showOtpInput = true

      } catch (e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        $system.log({ comp: 'FormsRegisterbyphonemobile', msg: 'registerPhoneNumber', val: e })

      } finally {
        loading.value = false
      }
    }

    const registerWithOTPCode = async () => {
      loading.value = true

      try {
        await $db.fire().capAuth.addListener('phoneCodeSent', async event => {
          const result = await $db.fire().capAuth.confirmVerificationCode({
            verificationId: event.verificationId,
            verificationCode: form.value.otpProvided,
          })

          console.log("Mobile Phone Authentication Result", result, JSON.stringify(result))

          $ttlStorage.set('onboardingComplete', true)
          $notify.show({ text: i18n.t('notify.success'), color: 'green' })

          if (!result.additionalUserInfo.isNewUser) {
            console.log("registerbyphonemobile: Returning User") /* I get to this but it's not actually logging the user in or storing the authenticated user */
            $notify.show({text: i18n.t('notify.success'), color: 'green'})
            $helper.sleep(500)

            return router.push('/')

          } else {
            console.log("registerbyphonemobile: New User")

            form.value.showOtpInput = false
            $notify.show({ text: i18n.t('notify.success'), color: 'green' })

            // TODO: Update with new $db.save()
            await dispatch('user/updateField', {
              phone: form.value.phone.trim().toLowerCase(),
              created_at: new Date()
            })

            return router.push('/auth/setup-profile')
          }
        });
      } catch (e) {
        $system.log({ comp: 'FormsRegisterbyphonemobile', msg: 'Error with phone code', val: e })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })

      } finally {
        loading.value = false
        form.value.showOtpInput = false
      }
    }

    const initRecaptcha = async () => {
      try {
        await $helper.sleep(2000)
        recaptchaContainer.value = new firebaseApp.auth.RecaptchaVerifier('recaptchaContainer',{
          size: 'invisible',
          callback: () => {
            console.log('WORKS')
          }
        })
      } catch (e) {
        console.log('initRecaptcha error:', e)
      }
    }

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
      registerWithOTPCode
    }
  }
})
</script>
