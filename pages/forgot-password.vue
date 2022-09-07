<template>
  <v-container class="pa-8 mt-12">
    <ElementH1 text="Forgot Password" align="left" />
    <v-row>
      <v-col cols="12" md="5" :order="`${$vuetify.breakpoint.mdAndUp ? '' : 'last' }`">
        <div class="mt-8">
          <p>
            Back to
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </p>
        </div>
      </v-col>
      <v-col>
        <v-form ref="formEl" @submit.prevent="validate">
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            label="Email"
            required
          />
          <div class="text-center">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="success"
              elevation="0"
              class="text-center"
              type="submit"
              @click="validate"
            >
              Email me a reset link
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  useRouter,
  ref
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'ForgotPasswordPage',
  middleware: 'guest',
  setup () {
    const router = useRouter()
    const { $config, $notify, $fire, $system } = useContext()
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const form = ref({
      email: ''
    })
    const formEl = ref(null)
    const rules = formRules
    const provider = ref(null)

    // METHODS
    const validate = async () => {
      loading.value = true
      const valid = await formEl.value.validate()
      if (valid) {
        await forgotPassword()
      }
      loading.value = false
    }
    const forgotPassword = async () => {
      if (form.value.email) {
        try {
          await $fire.auth.sendPasswordResetEmail(form.value.email)
          $notify.show({ text: 'Please check your email' })
          await router.push('/login')
        } catch (e) {
          $system.log({
            comp: 'ForgotPasswordPage',
            msg: 'Reset Password',
            val: e
          })
          $notify.show({ text: 'Error, try again', color: 'error' })
        }
      } else {
        $notify.show({ text: 'Error, try again', color: 'error' })
      }
    }

    // PAGE META
    useMeta({
      title: `Forgot Password to ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Recover your password to ${$config.appTitle}`
      }]
    })

    return {
      loading,
      valid,
      form,
      formEl,
      rules,
      provider,
      validate,
      forgotPassword
    }
  },
  head: {}
})
</script>
