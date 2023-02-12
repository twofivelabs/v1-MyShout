<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" :h1="$t('onboarding.username_heading')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
                translateY: [200, 0],
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: 600,
                delay:600
              }">
        <div>
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.username_sub') }}</h5>
          <v-form ref="formEl" @submit.prevent="validate">
            <v-text-field v-model="form.username"
                          :rules="rules.username"
                          :label="$t('form.username')"
                          prepend-inner-icon="mdi-at"
                          required
                          outlined
                          background-color="#f8f9fa"
            />
            <div class="text-center mt-15">
              <v-btn
                  :loading="loading"
                  color="primary"
                  fab
                  dark
                  x-large
                  type="submit"
                  class="white--text"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-form>
        </div>

      </div>
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  useContext,
  useMeta,
  useStore,
  useRouter
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'OnboardingPage4',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config,
      $helper,
      $notify,
        i18n
    } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const rules = formRules
    const isFormValid = ref(false)
    const formEl = ref()
    const form = ref({
      username: ''
    })

    // METHODS
    const validate = async () => {
      loading.value = true
      isFormValid.value = await formEl.value.validate()
      if (isFormValid.value) {
        // TODO: turn into function
        // Does username exist?
        const username = $helper.slugify(form.value.username, '')
        if(await userExists(username)) {
          $notify.show({ text: i18n.t('notify.username_in_use'), color: 'red' })
        } else {
          // Save User
          await dispatch('user/updateField', {
            username: username
          })
          // Move on
          await router.push('/onboarding/5')
        }
      }
      loading.value = false
    }
    const userExists = async (username) => {
      const hasUsers = await dispatch('user/search', {
        field: 'username',
        operator: '==',
        term: username,
        limit: 3
      })
      return hasUsers.length > 0;
    }

    // PAGE META
    useMeta({
      title: `${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Discover ${$config.appTitle}`
      }]
    })

    return {
      loading,
      rules,
      isFormValid,
      form,
      formEl,
      validate
    }
  },
  head: {}
})
</script>
