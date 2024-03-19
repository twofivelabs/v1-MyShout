<template>
  <v-app :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`"
         class="appMaxWidth grey lighten-5"
         dark
  >
    <v-progress-linear v-if="$store.state.appLoading" class="mb-0" indeterminate />
    <v-main  v-if="!$store.state.appLoading">
      <div>
        <GlobalIsoffline/>
        <Nuxt keep-alive/>
      </div>
    </v-main>
    <GlobalSnackbar v-if="!$store.state.appLoading"/>
    <GlobalFooter v-if="!$store.state.appLoading"/>
<!--    <GlobalMobilefooter/>-->
  </v-app>
</template>
<script>

import {
  defineComponent,
  onBeforeMount,
  onMounted,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminLayout',
  setup () {
    const { state, dispatch } = useStore()
    const { $config, $fire, $system, $capacitor } = useContext()

    // MOUNT
    onBeforeMount(async () => {
      try {
        // If state is available load the UID
        let uid = null
        if (state.users.data) {
          uid = await state.users.data.uid
        } else if (state.storage.uid) {
          uid = await state.storage.uid
        }

        // Signing up anonymously, will provide them with an ID with firebase
        if (!uid) {
          if ($config.useAnonymousSignUp) {
            try {
              await $fire.auth.signInAnonymously()

            } catch(e) {
              $system.log({ comp: 'DefaultLayout', msg: 'Error trying to sign in anonymously 2', val: e })
            }
          }
        }
        else {
          await dispatch('users/setUserProfile', uid)
        }
      } catch {
        // Error
      }
    })
    onMounted(() => {
      $system.initDarkMode()

      $capacitor.AdMob_hideBanner()

    })

    return {
    }
  },
  head () {
    return this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true
    })
  }
})
</script>
