<template>
  <div v-if="$config.useSocialLogin" >
    <v-btn outlined fab elevation="0" @click="googleSignIn">
      <v-icon>mdi-google</v-icon>
    </v-btn>
    <v-btn outlined fab elevation="0" @click="appleSignIn">
      <v-icon>mdi-apple</v-icon>
    </v-btn>
  </div>
</template>
<script>
import {defineComponent, ref, useContext, useRouter} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalSocialLogin',
  setup() {
    const { $notify, $fire, $fireModule, $system } = useContext()
    const router = useRouter()

    // DEFINE CONTENT
    const provider = ref(null)

    // METHODS
    const googleSignIn = async () => {
      try {
        provider.value = new $fireModule.auth.GoogleAuthProvider()
        await loginWithPopUp()
      } catch (e) {
        $system.log({
          comp: 'GlobalSocialLogin',
          msg: 'Login with Google',
          val: e
        })
        $notify.show({ text: 'Error, try again', color: 'error' })
      }
    }
    const appleSignIn = async () => {
      provider.value = new $fireModule.auth.OAuthProvider('apple.com')
      provider.value.addScope('email')
      provider.value.addScope('name')
      await loginWithPopUp()
    }
    const loginWithPopUp = async () => {
      await $fire.auth.signInWithPopup(provider.value).then(async () => {
        $fire.analytics.logEvent('login')
        $notify.show({ text: 'Successfully logged in' })
        await router.push('/')
      }).catch((e) => {
        $system.log({
          comp: 'GlobalSocialLogin',
          msg: 'Login with popup',
          val: e
        })
        $notify.show({ text: 'Error, try again', color: 'error' })
      })
    }

    return {
      googleSignIn,
      appleSignIn,
      loginWithPopUp
    }
  }
})
</script>
