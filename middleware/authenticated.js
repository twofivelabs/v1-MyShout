export default async function ({ app, store, redirect }) {

    // console.log('AUTH STATE LOADED: ', await store.getters['users/authStateLoaded'])
    // console.log('store.state.user', store.state.user)


    function checkUserStatus () {
      if ((store.state.user.data.role && store.state.user.data.role.isActive) && !store.state.user.data.role.isActive) {
        return redirect('/status')
      }
    }

    async function redirectToAdmin () {
      if (await app.$system.isUserUsingWebsiteVersion()) {
        if (store.state.user.data.role.isAdmin) {
            redirect('/admin/')
            return true
        }
        redirect('/block/')
        return false
      }
      return true
    }

    if (store.state.user.data.uid) {
      checkUserStatus()
      await redirectToAdmin()
      return true
    } else {
      console.log('Redirect to login page?')
      // return redirect('/auth')
    }
}

