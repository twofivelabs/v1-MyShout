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
                return true
            }
            console.log('go to onboarding, admin')
            redirect('/onboarding/')
            return false
        }
    }

    if (user) {
        checkUserStatus()
        return await redirectToAdmin()
    }
    else {
        console.log('go to onboarding, admin')
        return redirect('/onboarding/')
    }
}
