import { FirebaseAuthentication } from '@capacitor-firebase/authentication'

export default async function ({ app, store, redirect }) {
    const device = await app.$capacitor.device();

    let user = app.$fire.auth.currentUser;
    let userToken = user ? await user.getIdTokenResult() : false

    if (!user && device.platform !== 'web') {
      user = await FirebaseAuthentication.getCurrentUser();
      userToken = await FirebaseAuthentication.getIdToken().catch(e=> {
          console.log('STICKY: not able to getIdToken', e, JSON.stringify(e))
      })
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
      console.log('Redirect to login page')
      return redirect('/auth')
    }
}

