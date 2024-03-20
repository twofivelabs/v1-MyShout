import { FirebaseAuthentication } from '@capacitor-firebase/authentication'
import { getAuth } from 'firebase/auth'
import {firebaseApp} from '~/firebaseConfig'
const a = getAuth(firebaseApp)

export default async function ({ app, store, redirect }) {
    const device = await app.$capacitor.device();
    let userToken
    let user

    console.log('AUTH STATE LOADED: ', await store.getters['users/authStateLoaded'])
    console.log('store.state.user', store.state.user)

    // No user
    if (!a || !a.currentUser) {
        // ... REF initApp
    } else {
        user = a.currentUser
        userToken = await a.currentUser.getIdTokenResult(false)
        if (typeof(userToken.claims.isActive) === "undefined") {
            userToken = await a.currentUser.getIdTokenResult(true)
            console.log('LOOPER > CLAIMS', userToken.claims.isActive)
        }
    }

    if (!user && device.platform !== 'web') {
      user = await FirebaseAuthentication.getCurrentUser()
      userToken = await FirebaseAuthentication.getIdToken().catch(e=> {
          console.log('STICKY: [auth] ERROR > No getIdToken', e, JSON.stringify(e))
      })
    }

    if (!user || !userToken) {
        console.log('STICKY: [auth] ERROR > NO USER or TOKEN')
    }

    function checkUserStatus () {
      if ((store.state.user.data.role && store.state.user.data.role.isActive) && !store.state.user.data.role.isActive) {
        return redirect('/status')
      }
    }

    async function redirectToAdmin () {
      if (await app.$system.isUserUsingWebsiteVersion()) {
        if (userToken && userToken.claims && (userToken.claims.isAdmin || userToken.claims.isSuper)) {
          redirect('/admin/')
          return true
        }
        redirect('/block/')
        return false
      }
      return true
    }

    if (user) {
      checkUserStatus()
      await redirectToAdmin()
      return true
    } else {
      console.log('Redirect to login page?')
      // return redirect('/auth')
    }
}

