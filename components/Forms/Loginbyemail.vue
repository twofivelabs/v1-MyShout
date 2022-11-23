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
        color="success"
        elevation="0"
        class="text-center"
        type="submit"
    >
      {{ $t('btn.login') }}
    </v-btn>
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
  name: 'FormsLoginbyemail',
  setup () {
    const { $fire, $fireModule, $notify, $system, i18n } = useContext()
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
        await register()
      }
      loading.value = false
    }
    const register = async () => {
      if (form.value.email && form.value.password) {
        try {
          if ($fire.auth.currentUser === null) {
            $notify.show({ text: 'Error creating your account', color: 'red' })
            $fire.analytics.logEvent('login')
            await $fire.auth.createUserWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password)
          } else {
            const credential = await $fireModule.auth.EmailAuthProvider.credential(form.value.email.trim().toLowerCase(), form.value.password)
            await $fire.auth.currentUser.linkWithCredential(credential).then(() => {
              $fire.analytics.logEvent('sign_up')
            }).catch((e) => {
              $system.log({
                comp: 'FormsLoginbyemail',
                msg: 'Error trying to link account',
                val: e
              })
            })
          }
          $notify.show({ text: 'Successfully registered', color: 'green' })
          await router.push('/')
        } catch (e) {
          $system.log({
            comp: 'FormsLoginbyemail',
            msg: 'Error trying to register',
            val: e
          })
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
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
      register,
      showPassword
    }
  }
})
</script>
