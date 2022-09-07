export default async function ({ app, store, redirect }) {
  function checkUserStatus () {
    if ((store.state.user.data.role && store.state.user.data.role.isActive) && !store.state.user.data.role.isActive) {
      return redirect('/status')
    }
  }
  async function isUserUsingWebsiteVersion () {
      // IF USER HAS LOGGED IN
      // console.log('LOGGER: isUserUsingWebsiteVersion', store.state.user)
      if (store.state.user.data && store.state.user.data.uid) {
          const device = await app.$capacitor.device()
          // Check if hosted online
          if ('web' === device.platform) {
              const LOCAL_DOMAINS = ['admin.myshout.net', 'my-shout-app.web.app', 'my-shout-app.firebaseapp.com', 'admin.my-shout.us']

              // console.log('DEVICE', device.platform, window.location.hostname)
              if (LOCAL_DOMAINS.includes(window.location.hostname)) {
                  if(store.state.user.data.role.isAdmin) {
                      redirect('/admin/')
                      return
                  } else {
                      redirect('/block/')
                      return
                  }
              }
          }
      }
  }

  // Is user logged in with firebase, but we could throw some more error checks in here
  // console.log('currUser', app.$fire.auth.currentUser)

  // app.$fire.auth.currentUser.isAnonymous
  // app.$fire.auth.currentUser.uid
  // app.$fire.auth.currentUser.email
  if (app.$fire.auth.currentUser) {
    checkUserStatus()
    await isUserUsingWebsiteVersion()
    return true
  }
  // Check the store if it has user data
  else if (store.state.user.data && store.state.user.data.uid) {
    checkUserStatus()
    await isUserUsingWebsiteVersion()
    return true
  }
  else {
    await isUserUsingWebsiteVersion()
    return redirect('/onboarding/')
  }
}

