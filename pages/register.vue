<template>
  <v-container class="pa-8 mt-12">
    <ElementH1 text="Register For Free" align="left" />
    <v-row>
      <v-col cols="12" md="5" :order="`${$vuetify.breakpoint.mdAndUp ? '' : 'last' }`">
        <div class="mt-8">
          <p>
            <nuxt-link to="/login">
              {{ $t('btn.already_have_account') }}
            </nuxt-link>
          </p>
        </div>
      </v-col>
      <v-col>
        <FormsRegisterbyphone />
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
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RegisterPage',
  middleware: 'guest',
  setup () {
    const { $config } = useContext()
    const loading = ref(false)

    // METHODS

    // META
    useMeta({
      title: `Register To ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Register on ${$config.appTitle}`
      }]
    })

    return {
      loading,
    }
  },
  head: {}
})
</script>
