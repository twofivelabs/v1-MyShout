<template>
  <v-form ref="formEl" @submit.prevent="validate">
    <div v-if="!form.showOtpInput">
      <VuePhoneNumberInput class="my-6 phoneNumberInput"
                           v-model="form.phoneNumberFormatted"
                           @update="updatePhoneNumber($event)"
                           required
                           :translations="{ countrySelectorLabel: '' }"
      />
      <div class="text-center mt-10">
        <v-btn
            :disabled="!valid"
            :loading="loading"
            color="success"
            elevation="0"
            id="recaptcha-container"
            class="text-center"
            type="submit"
        >
          {{ $t('btn.send_code') }}
        </v-btn>
      </div>
    </div>
    <div v-if="form.showOtpInput">
      <!-- MAKE COMPONENT -->
      <ElementH3 :text="$t('heading.we_sent_you_sms_code')" align="left" />
      <v-text-field
          :label="$t('form.code')"
          :placeholder="$t('form.code')"
          class="mt-5"
          outlined
          max=6
          type="number"
          v-model="form.otpProvided"
          oninput="if(Number(this.value.length) > Number(this.max)) this.value = this.value.substring(0, Number(this.max));"
      ></v-text-field>
      <div class="text-center">
        <v-btn
            :loading="loading"
            color="success"
            elevation="0"
            class="text-center"
            type="submit"
            @click="registerWithOTPCode"
        >
          {{ $t('btn.login') }}
        </v-btn>
      </div>
    </div>
  </v-form>
</template>
<script>

import {
  defineComponent,
  useContext,
  useRouter,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default defineComponent({
  name: 'FormsLoginbyphone',
  components: {
    VuePhoneNumberInput
  },
  props: {
    goTo: {
      type: String,
      default: '/register'
    },
  },
  setup (props) {
    const { $fire, $fireModule, $notify, $system, i18n } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const appVerifier = ref(null)
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
      valid.value = await formEl.value.validate()
      if (valid.value) {
        await register()
      }
      loading.value = false
    }
    const register = async () => {
      if (form.value.phone) {
        form.value.showOtpInput = true

        try {
          window.confirmationResult = await $fire.auth.signInWithPhoneNumber(form.value.phone.trim().toLowerCase(), appVerifier.value)
        } catch (e) {
          initRecaptcha()

          $system.log({
            comp: 'FormsLoginbyphone',
            msg: 'Error trying to register phone number',
            val: e
          })
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
          if (props.goTo) {
            await router.push(props.goTo)
          }
        }
      } else {
        initRecaptcha()
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }
    const registerWithOTPCode = async () => {
      console.log("FormsLoginbyphone: Starting OPT Code Confirmation")
      // Now enter in OTP code
      loading.value = true
      window.confirmationResult.confirm(form.value.otpProvided).then(result => {
        console.log("FormsLoginbyphone: OTP Code Login Success", result)
        
        if (!result.additionalUserInfo.isNewUser) {
          $notify.show({ text: i18n.t('notify.success'), color: 'green' })
          router.push('/')
          return
        }

        $notify.show({ text: i18n.t('notify.success'), color: 'green' })
        if (props.goTo) return router.push(props.goTo)
        
        router.push('/profile')
      }).catch((e) => {
        initRecaptcha()

        $system.log({
          comp: 'FormsLoginbyphone',
          msg: 'Error with phone code',
          val: e
        })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      })
      loading.value = false
    }
    const initRecaptcha = () => {
      try {
        appVerifier.value = new $fireModule.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('WORKS')
          }
        })
      } catch (e) {
        console.log('Loginbyphone > initRecaptcha', e)
      }
    }

    // MOUNT
    onMounted(() => {
      initRecaptcha()
    })

    return {
      loading,
      valid,
      form,
      formEl,
      rules,
      updatePhoneNumber,
      validate,
      register,
      registerWithOTPCode
    }
  }
})
</script>
