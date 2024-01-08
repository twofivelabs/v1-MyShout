<template>
  <v-form ref="formEl" @submit.prevent="validate" class="text-center">
    <v-text-field
        v-model="form.email"
        :rules="rules.email"
        :label="$t('form.email')"
        required
        prepend-inner-icon="mdi-email"
        outlined
        background-color="#f8f9fa"
        class="py-0 my-0"
    />

    <v-text-field
        v-model="form.password"
        :rules="rules.password"
        autocomplete="off"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.password')"
        required
        prepend-inner-icon="mdi-lock"
        counter
        outlined
        background-color="#f8f9fa"
    />

    <v-btn
      :disabled="!valid"
      :loading="loading"
      color="primary"
      elevation="0"
      class="text-center"
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
    const { $fire, $notify, i18n } = useContext()
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
        if (valid.value) {
          await register()
        }
      } else {
        $notify.show({ text: i18n.t('notify.agree_to_terms'), color: 'error' })
      }

      loading.value = false
    }
    const register = async () => {
      if (form.value.email && form.value.password) {
        try {
          if ($fire.auth.currentUser === null) {
            const authentication = await $fire.auth.createUserWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password)
            if (authentication.user) {
              $fire.analytics.logEvent('signup')
              await router.push('/auth/setup-profile')
            } else {
              $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
            }
          } else {
            await router.push('/')
          }
        } catch (e) {
          console.log("Error", e)

          switch (e.code) {
            case "auth/email-already-in-use":
              $notify.show({ text: i18n.t('onboarding.error_email_in_use'), color: 'error' })
              break;
          }
        }
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
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
