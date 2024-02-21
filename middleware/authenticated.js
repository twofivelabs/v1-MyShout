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

    console.log("authenticated.js $fire.auth.currentUser", app.$fire.auth.currentUser)
    if (user) {
      checkUserStatus()
      await redirectToAdmin()
      return true
    } else {
      console.log('Redirect to login page')
      return redirect('/auth')
    }  
}

