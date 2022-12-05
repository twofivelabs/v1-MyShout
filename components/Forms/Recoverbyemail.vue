<template>
  <v-bottom-sheet
      v-model="dialog"
      width="500"
      max-width="700"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="mt-9 text-center grey--text caption lighten-1">
        {{ $t('heading.cant_receive_sms_code') }}
      </div>
    </template>

    <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="height:67vh;">
      <v-form ref="formEl" @submit.prevent="validate">
        <v-text-field
            v-model="form.email"
            :rules="rules.email"
            :label="$t('form.email')"
            autocomplete="off"
            counter
            prepend-inner-icon="mdi-email"
            outlined
            background-color="#f8f9fa"
        />
        <v-text-field
            v-model="form.password"
            :rules="rules.password"
            :label="$t('form.password')"
            autocomplete="off"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            counter
            required
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
    </div>
  </v-bottom-sheet>
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
  name: 'FormsRecoverbyemail',
  setup () {
    const { $fire, $helper, $fireModule, $ttlStorage, $notify, $system, i18n } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const dialog = ref(false)

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
          // SIGNOUT FIRST
          await $fire.auth.signOut()

          if ($fire.auth.currentUser === null) {
            await $fire.auth.createUserWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password)
            $fire.analytics.logEvent('sign_up')
            $notify.show({ text: i18n.t('notify.success'), color: 'green' })

            $ttlStorage.set('onboardingComplete', true)

            await $helper.sleep(500)
            loading.value = false

            await router.push('/')

          } else {
            const credential = await $fireModule.auth.EmailAuthProvider.credential(form.value.email.trim().toLowerCase(), form.value.password)
            await $fire.auth.currentUser.linkWithCredential(credential).then(async () => {
              $fire.analytics.logEvent('sign_up')
              $notify.show({ text: i18n.t('notify.success'), color: 'green' })

              $ttlStorage.set('onboardingComplete', true)

              await $helper.sleep(500)
              loading.value = false

              await router.push('/')

            }).catch((e) => {
              loading.value = false
              $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })

              $system.log({
                comp: 'FormsRecoverbyemail',
                msg: 'Error trying to link account',
                val: e
              })
            })
            loading.value = false
          }

        } catch (e) {
          loading.value = false
          $system.log({
            comp: 'FormsRecoverbyemail',
            msg: 'Error trying to register',
            val: e
          })
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        }
      } else {
        loading.value = false
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
      dialog,
      showPassword
    }
  }
})
</script>
