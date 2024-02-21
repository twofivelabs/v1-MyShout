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
        id="recaptcha-container"
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
  ref,
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export default defineComponent({
  name: 'FormsRegisterbyphonemobile',
  components: {
    VuePhoneNumberInput
  },
  setup () {
    const { $notify, $system, $ttlStorage, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const agreeToTerms = ref(true)
    const rules = formRules
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
        if (valid.value) await registerPhoneNumber()
      } else {
        $notify.show({ text: i18n.t('notify.agree_to_terms'), color: 'error' })
      }

      loading.value = false
    }

    const registerPhoneNumber = async () => {
      loading.value = true
      
      const phone = form.value.phone.trim().toLowerCase();

      try {
        // Start sign in with phone number and send the SMS
        await FirebaseAuthentication.signInWithPhoneNumber({
          phoneNumber: phone,
        });
        
        form.value.showOtpInput = true
      } catch (e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        if(e) {
          $system.log({
            comp: 'FormsRegisterbyphonemobile',
            msg: 'registerPhoneNumber',
            val: e
          })
        }
      } finally {
        loading.value = false
      }
    }

    const registerWithOTPCode = async () => {
      loading.value = true

      try {
        await FirebaseAuthentication.addListener('phoneCodeSent', async event => {
          const result = await FirebaseAuthentication.confirmVerificationCode({
            verificationId: event.verificationId,
            verificationCode: form.value.otpProvided,
          });

          console.log("Mobile Phone Authentication Result", result)

          $ttlStorage.set('onboardingComplete', true)
          $notify.show({ text: i18n.t('notify.success'), color: 'green' });         

          if (result.additionalUserInfo.isNewUser == false) {
            console.log("registerbyphonemobile: Returning User") /* I get to this but it's not actually logging the user in or storing the authenticated user */
            return router.push('/')
          } else {
            console.log("registerbyphonemobile: New User")
            
            dispatch('user/updateField', {
              phone: form.value.phone.trim().toLowerCase(),
              created_at: new Date()
            })

            return router.push('/auth/setup-profile')
          }
        });
      } catch (e) {
        $system.log({
          comp: 'FormsRegisterbyphonemobile',
          msg: 'Error with phone code',
          val: e
        })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      } finally {
        loading.value = false
        form.value.showOtpInput = false
      }
    }

    return {
      loading,
      valid, agreeToTerms,
      form,
      formEl,
      rules,
      updatePhoneNumber,
      validate,
      registerWithOTPCode
    }
  }
})
</script>
