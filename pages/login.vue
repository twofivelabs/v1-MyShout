<template>
  <v-container class="pa-8 mt-12">
    <ElementH1 text="Login" align="left" />
    <v-row>
      <v-col cols="12" md="5" :order="`${$vuetify.breakpoint.mdAndUp ? '' : 'last' }`">
        <div class="mt-8">
          <p>
            Don't have an account?
            <nuxt-link to="/onboarding/">
              Register
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/forgot-password">
              Forgot Password?
            </nuxt-link>
          </p>
        </div>
      </v-col>
      <v-col>
        <FormsRegisterbyemail />

        <div class="mt-6">
          <GlobalSociallogin />
        </div>
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
  name: 'LoginPage',
  setup () {
    const { $config, $notify, $fire, $system } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    const rules = formRules
    const valid = ref(true)
    const formEl = ref(null)
    const form = ref({
      email: '',
      password: ''
    })

    // METHODS
    const validate = async () => {
      loading.value = true
      const valid = await formEl.value.validate()
      if (valid) {
        await login()
      }
      loading.value = false
    }
    const login = async () => {
      if (form.value.email && form.value.password) {
        try {
          await $fire.auth.signInWithEmailAndPassword(form.value.email.trim().toLowerCase(), form.value.password)
          $fire.analytics.logEvent('login')
          $notify.show({ text: 'Successfully logged in', color: 'green' })
          await router.push('/')
        } catch (e) {
          $system.log({
            comp: 'LoginPage',
            msg: 'Trying to login',
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
      title: `Login to ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Login to ${$config.appTitle}.`
      }]
    })

    return {
      loading,
      valid,
      form,
      formEl,
      rules,
      validate,
      login
    }
  },
  // REQUIRED FOR NUXT 2
  head: {}
})
</script>
