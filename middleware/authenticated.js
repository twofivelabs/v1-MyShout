import { FirebaseAuthentication } from '@capacitor-firebase/authentication'

export default async function ({ app, store, redirect }) {
    const device = await app.$capacitor.device();

    let user = app.$fire.auth.currentUser;
    let userToken = user ? await user.getIdTokenResult() : false

    if (!user && device.platform !== 'web') {
      user = await FirebaseAuthentication.getCurrentUser()
      userToken = await FirebaseAuthentication.getIdToken().catch(e=> {
          console.log('STICKY: [auth] ERROR > No getIdToken', e, JSON.stringify(e))
      })
    }

    if (!user || !userToken) {
        console.log('STICKY: [auth] ERROR > NO USER or TOKEN')
        console.log('STICKY: [auth] ERROR > USER: ', user, JSON.stringify(user))
        console.log('STICKY: [auth] ERROR > USER TOKEN: ', userToken, JSON.stringify(userToken))
        // WE NEED TO PUT A BLOCK HERE

        /*setTimeout(async() => {
            console.log('STICKY: [auth] TESTING A TIMEOUT')
            let user1 = app.$fire.auth.currentUser
            let user2 = await FirebaseAuthentication.getCurrentUser()
            console.log('STICKY: [auth] USER1: ', user, JSON.stringify(user1))
            console.log('STICKY: [auth] USER2: ', user, JSON.stringify(user2))

        }, 10000)

        return redirect('/auth')*/
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

