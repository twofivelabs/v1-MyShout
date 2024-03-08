<template>
  <v-form ref="formEl" @submit.prevent="validate">
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

    <div class="text-center">
      <v-btn
        :disabled="!valid"
        :loading="loading"
        color="primary"
        elevation="0"
        class="text-center"
        type="submit"
      >
        {{ $t('btn.login') }}
      </v-btn>
    </div>

    <div class="text-center py-5">
      <FormsForgotpasswordbtn class="mx-auto" />
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
  name: 'FormsAuthemaillogin',
  setup () {
    const { $fire, $notify, i18n } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const rules = formRules
    const showPassword = ref(false)
    const formEl = ref(null)
    const form = ref({
      email: '',
      password: ''
    })

    // METHODS
    const validate = async () => {
      loading.value = true
      valid.value = await formEl.value.validate()
      if (valid.value) {
        await submitLogin()
      }
      loading.value = false
    }
    const submitLogin = async () => {
      if (form.value.email && form.value.password) {
        try {
          if ($fire.auth.currentUser === null) {
            const authentication = await $fire.auth.signInWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password)
            if (authentication.user) {
              $fire.analytics.logEvent('login')
              $notify.show({ text: 'Successfully logged in', color: 'green' })
              await router.push('/')
            } else {
              $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
            }
          } else {
            await router.push('/')
          }
        } catch (e) {
          switch (e.code) {
            case "auth/wrong-password":
              $notify.show({ text: i18n.t('onboarding.error_wrong_password'), color: 'error' })
              break;
            case "auth/user-not-found":
              $notify.show({ text: i18n.t('onboarding.error_user_not_found'), color: 'error' })
              break;
            default  :
              $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
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
      showPassword
    }
  }
})
</script>
