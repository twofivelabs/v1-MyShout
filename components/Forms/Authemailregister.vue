<template>
  <v-form ref="formEl" @submit.prevent="validate" class="text-center">
    <v-text-field
        v-model="form.email"
        :rules="rules.email"
        :label="$t('form.email')"
        prepend-inner-icon="mdi-email"
        background-color="#f8f9fa"
        class="py-0 my-0"
        required
        outlined
    />

    <v-text-field
        v-model="form.password"
        :rules="rules.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.password')"
        prepend-inner-icon="mdi-lock"
        background-color="#f8f9fa"
        autocomplete="off"
        required
        outlined
        counter
    />

    <v-btn
      :disabled="!valid"
      :loading="loading"
      class="text-center"
      color="primary"
      elevation="0"
      type="submit"
    >
      {{ $t('btn.sign_up') }}
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
  </v-form>
</template>
<script>

import {
  defineComponent,
  useContext,
  useRouter,
  ref
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'FormsAuthemailregister',
  setup () {
    const { $db, $notify, i18n } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const rules = formRules
    const showPassword = ref(false)
    const agreeToTerms = ref(false)
    const formEl = ref(null)
    const form = ref({
      email: '',
      password: ''
    })

    // METHODS
    const validate = async () => {
      loading.value = true

      if (agreeToTerms.value) {
        valid.value = await formEl.value.validate()
        if (!form.value.email || !form.value.password) {
          valid.value = false
        }
        if (valid.value) {
          await register()
        } else {
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        }
      } else {
        $notify.show({ text: i18n.t('notify.agree_to_terms'), color: 'error' })
      }

      loading.value = false
    }
    const register = async () => {
      loading.value = true
      // Capacitor Auth
      /* await $db.fire().capAuth.createUserWithEmailAndPassword({
        email: form.value.email.trim().toLowerCase(),
        password: form.value.password
      }).then(() => { */

      // Firebase Auth
      await $db.fire().createUserWithEmailAndPassword(
          $db.fire().auth,
          form.value.email.trim().toLowerCase(),
          form.value.password
      ).then(() => {
        loading.value = false
        $notify.show({ text: i18n.t('notify.success'), color: 'green' })
        // $db.fire().logEvent($db.fire().analytics, 'sign_up')

        router.push('/auth/setup-profile')

      }).catch(e => {
        switch (e.code) {
          case "auth/email-already-in-use":
            $notify.show({ text: i18n.t('onboarding.error_email_in_use'), color: 'error' })
            break;
          default  :
            console.log('STICKY: ERROR', e)
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
            break;
        }
      })

    }

    return {
      loading,
      valid,
      form,
      formEl,
      rules,
      validate,
      showPassword, agreeToTerms
    }
  }
})
</script>
