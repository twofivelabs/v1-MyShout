<template>
  <div>
    <v-form ref="formEl" @submit.prevent="validate">
    <v-text-field
        v-model="form.email"
        :rules="rules.email"
        :label="$t('form.email')"
        prepend-inner-icon="mdi-email"
        :required="required"
        outlined background-color="#f8f9fa"
    />
    <v-text-field
        v-model="form.password"
        :rules="rules.password"
        autocomplete="off"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.password')"
        prepend-inner-icon="mdi-lock"
        counter
        :required="required"
        outlined background-color="#f8f9fa"
    />
    <slot>
      <div class="text-center">
        <v-btn
            :loading="loading"
            fab
            dark
            x-large
            color="primary"
            type="submit"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </slot>
  </v-form>

    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="80vh" class="rounded-t-xl pb-14">
        <div class="ma-3" style="padding-bottom:150px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />
          <ElementH2 align="center" :text="$t('verify_account')" />

          <FormsRegisterbyphoneweb v-if="device === 'web'" class="pt-6" goTo="" @response="emittedResponseFunc" />
          <FormsRegisterbyphonemobile v-else class="pt-6" goTo="" @response="emittedResponseFunc" />
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

import {
  defineComponent,
  useContext,
  useRouter,
  useStore,
  ref, onMounted
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'FormsRegisterbyemail',
  directives: { Touch },
  props: {
    goTo: {
      type: String,
      default: () => { return '/' }
    },
    required: {
      type: Boolean,
      default: true
    },
    preAuthWithPhone: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { $fire, $fireModule, $notify, $system, $capacitor, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(false)
    const rules = formRules
    const hasValidatedAccount = ref(false)
    const device = ref('mobile')
    const showBottomSheet = ref(false)
    const showPassword = ref(false)
    const formEl = ref(null)
    const form = ref({
      email: '',
      password: ''
    })

    // METHODS
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }
    const validate = async (bypassPhoneAuth=false) => {
      loading.value = true
      if(bypassPhoneAuth === false) {
        if(props.preAuthWithPhone) {
          showBottomSheet.value = true
          return
        }
      }
      valid.value = await formEl.value.validate()
      if (valid.value) {
        await register()
      }
      loading.value = false
    }
    // eslint-disable-next-line no-unused-vars
    const validateUserAccountWithPhone = async () => {
      hasValidatedAccount.value = true
    }
    const emittedResponseFunc = (res) => {
      if (res.status === 'success') {
        showBottomSheet.value = false
        validate(true)
      }
    }
    const register = async () => {
      if (form.value.email && form.value.password) {
        const email = form.value.email.trim().toLowerCase()
        const credential = $fireModule.auth.EmailAuthProvider.credential(email, form.value.password)
        await $fire.auth.currentUser.linkWithCredential(credential).then(async () => {
          $notify.show({ text: i18n.t('notify.success'), color: 'green' })

          // Update Profile
          await dispatch('user/updateField', {
            email: email,
            created_at: new Date()
          })

          // Send verification email
          $fire.auth.currentUser.sendEmailVerification().catch(() => {
            // ...
          })

          router.push(props.goTo)

        }).catch((e) => {
          console.log('STICKY: Error linking email with current user', e)
          if (e.code === 'auth/provider-already-linked') {
            $notify.show({ text: i18n.t('already_verified'), color: 'error' })
          } else {
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
          }
          $system.log({
            comp: 'FormsRegisterbyemail',
            msg: 'Register 2',
            val: e
          })
        })

        /*await $fire.auth.createUserWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password).then(() => {
            $notify.show({ text: 'Success', color: 'green' })
            $fire.analytics.logEvent('sign_up')

            // Send verification email
            $fire.auth.currentUser.sendEmailVerification().catch(() => {
              // ...
            })

            console.log('account created', props.goTo)
            router.push(props.goTo)
          }).catch(async (error) => {

            // Cannot create user, already in use, try logging in with those details
            if ('auth/email-already-in-use' === error.code) {
              console.log('auth/email-already-in-use')
              await $fire.auth.signInWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password).then(() => {
                $ttlStorage.set('onboardingComplete', true)
                router.push('/')
              }).catch((error) => {
                $notify.show({ text: 'Error, try again', color: 'error' })
                $system.log('signInWithEmailAndPassword > register 1', error)
              })
            } else {
              $notify.show({ text: 'Error, try again', color: 'error' })
              $system.log('Registerbyemail > register 2', error)
            }
          })*/
      }
      // No input show error
      else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }

    // MOUNTED
    onMounted(async() => {
      const d = await $capacitor.device()
      if(d.platform === 'web') {
        device.value = 'web'
      }
    })

    return {
      loading,
      valid,
      form,
      formEl,
      rules,
      device,
      showPassword,
      showBottomSheet,
      emittedResponseFunc,
      swipe,
      validate,
      register
    }
  }
})
</script>
