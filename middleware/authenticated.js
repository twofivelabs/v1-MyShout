export default async function ({ app, store, redirect }) {
    const user = app.$fire.auth.currentUser
    const userToken = user ? await user.getIdTokenResult() : false

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
              // You are not allowed to use the website version of the app.
              redirect('/block/')
              return false
          }
          return true
      }

    // Is user logged in with firebase, but we could throw some more error checks in here
    // console.log('currUser', app.$fire.auth.currentUser)

    // app.$fire.auth.currentUser.isAnonymous
    // app.$fire.auth.currentUser.uid
    // app.$fire.auth.currentUser.email

    /*console.log('CLAIMS', userToken.claims)
    console.log('app.$fire.auth.currentUser', app.$fire.auth.currentUser)
    console.log('store.state.user.data', store.state.user.data)*/

    if (user) {
        checkUserStatus()
        await redirectToAdmin()
        return true
    }
    else {
        console.log('Redirect to onboarding authenticated.js')
        return redirect('/onboarding/')
    }
}

