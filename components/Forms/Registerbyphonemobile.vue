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
  useStore,
  ref,
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

import { cfaSignInPhoneOnCodeSent, cfaSignIn } from 'capacitor-firebase-auth'

//import firebase from "firebase/app";
// import "firebase/auth";

export default defineComponent({
  name: 'FormsRegisterbyphonemobile',
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
    const { $fireModule, $notify, $system, $ttlStorage } = useContext()
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
        await registerPhoneNumber()
      }
      loading.value = false
    }
    const registerPhoneNumber = async () => {
      loading.value = true
      try {
        // Should be before sign in
        cfaSignInPhoneOnCodeSent().subscribe(
            (verificationId) => {
              appVerifier.value = verificationId
              form.value.showOtpInput = true
            },
            (e) => {
              $notify.show({ text: 'Error registering phone number', color: 'error' })
              $system.log({
                comp: 'FormsRegisterbyphonemobile',
                msg: 'registerPhoneNumber > cfaSignInPhoneOnCodeSent',
                val: e
              })
            },
        )
        cfaSignIn('phone', {
          phone: form.value.phone.trim().toLowerCase()
        }).subscribe(
            () => {
              //This block is never called
              console.log('Sent to number ' + form.value.phone.trim().toLowerCase() + ' successfully!');
            },
            (e) => {
              $system.log({
                comp: 'FormsRegisterbyphonemobile',
                msg: 'registerPhoneNumber > cfaSignIn',
                val: e
              })
            },)
      } catch (e) {
        $notify.show({ text: 'Error registering phone number', color: 'error' })
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
        // Create firebase credentials
        const credentials = $fireModule.auth.PhoneAuthProvider.credential(appVerifier.value, form.value.otpProvided)

        // Now sign user in
        $fireModule.auth().signInWithCredential(credentials).then((result) => {

          // Update Profile
          dispatch('user/updateField', {
            phone: form.value.phone.trim().toLowerCase()
          })

          // Technically they have an account now, so we can bypass onboarding IF they are already a user
          $ttlStorage.set('onboardingComplete', true)

          // If EXISTING user show logged in message
          if (!result.additionalUserInfo.isNewUser) {
            $notify.show({ text: 'Successfully logged in', color: 'green' })
            emit('response', { status: 'success', message: 'Successfully signed in', 'goTo': '/' })

            if (props.goTo) {
              router.push(props.goTo)
            }
            return
          }

          // If NEW user
          form.value.showOtpInput = false
          $notify.show({ text: 'Successfully registered', color: 'green' })
          emit('response', { status: 'success', message: 'Successfully registered', 'goTo': '/onboarding/2.1' })
          // Update Profile
          dispatch('user/updateField', {
            created_at: new Date()
          })
        })
      } catch (e) {
        $system.log({
          comp: 'FormsRegisterbyphonemobile',
          msg: 'Error with phone code',
          val: e
        })
        $notify.show({ text: 'Error with phone code', color: 'error' })
        emit('response', { status: 'error', message: 'Error with phone code' })
      } finally {
        loading.value = false
        form.value.showOtpInput = false
      }
    }

    return {
      loading,
      valid,
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
