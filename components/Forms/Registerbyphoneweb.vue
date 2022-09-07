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
            color="primary"
            elevation="0"
            id="recaptcha-container"
            class="text-center"
            type="submit"
        >
          Send Code
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="form.showOtpInput" max-width="500">
      <!-- MAKE COMPONENT -->
      <v-card
          class="elevation-0 pa-12 rounded-xl"
      >
        <ElementH3 text="We sent you a SMS code" align="center" />
        <v-text-field
            label="Code"
            placeholder="Code"
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
            Verify
          </v-btn>
          <FormsRecoverbyemail />
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
  useStore
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
    const { $fire, $fireModule, $notify, $system, $ttlStorage } = useContext()
    const { dispatch } = useStore()
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
        loading.value = true
        try {
          // Create firebase credentials
          window.confirmationResult = await $fire.auth.signInWithPhoneNumber(form.value.phone.trim().toLowerCase(), appVerifier.value)
          form.value.showOtpInput = true

        } catch (e) {
          initRecaptcha()
          if(e && e.message) {
            $notify.show({ text: e.message, color: 'error' })
            emit('response', { status: 'error', message: e.message })
          } else {
            $notify.show({ text: 'Error registering phone number', color: 'error' })
            emit('response', { status: 'error', message: 'Error registering phone number 1' })
          }

          $system.log({
            comp: 'FormsRegisterbyphoneweb',
            msg: 'Registering phone number',
            val: e
          })
        }
      } else {
        initRecaptcha()
        $notify.show({ text: 'Error, try again', color: 'error' })
        emit('response', { status: 'error', message: 'Error try again' })
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
          $notify.show({text: 'Successfully logged in', color: 'green'})
          emit('response', {status: 'success', message: 'Successfully logged in'})

          // Update Profile
          await dispatch('user/updateField', {
            phone: form.value.phone.trim().toLowerCase()
          })

          if (props.goTo) {
            router.push(props.goTo)
          }
        }
        // If NEW user
        else {
          form.value.showOtpInput = false
          $notify.show({ text: 'Successfully registered', color: 'green' })
          emit('response', { status: 'success', message: 'Successfully registered' })

          await dispatch('user/updateField', {
            phone: form.value.phone.trim().toLowerCase(),
            created_at: new Date()
          })
        }
      } catch (e) {
        initRecaptcha()
        $notify.show({ text: 'Error with phone code', color: 'error' })
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
    const initRecaptcha = () => {
      appVerifier.value = new $fireModule.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('WORKS')
        }
      })
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
