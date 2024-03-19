<template>
  <v-container class="pa-8 mt-12">
    <ElementH1 text="Login" align="left" />
    <v-row>
      <v-col cols="12" md="5" :order="`${$vuetify.breakpoint.mdAndUp ? '' : 'last' }`">
        <div class="mt-8">
          <p>
            <nuxt-link to="/auth/">
              {{ $t('btn.register_no_account') }}
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/forgot-password">
              {{ $t('btn.forgot_password') }}
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

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const { $config } = useContext()
    const router = useRouter()
    const loading = ref(false)

    // DEFINE CONTENT
    router.push('/auth')

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
    }
  },
  // REQUIRED FOR NUXT 2
  head: {}
})
</script>
