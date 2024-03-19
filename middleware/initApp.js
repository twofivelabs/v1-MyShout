
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '~/firebaseConfig'
const a = getAuth(firebaseApp)

const consoleInitStyles = [
    'color: green',
    'background: #000',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
    'border: 1px solid green'
].join(';')
const consoleUserStyles = [
    'color: white',
    'background: #E7B75FFF',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')

/*function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}*/



export default async function ({ store, app, redirect, route } ) {
    if (store.state.isAppInit) {
        return null
    }
    store.state.appLoading = true

    app.$db.fire().capAuth.addListener('authStateChange', (res) => {
        console.log('CAP AUTH *** AUTH STATE CHANGED', res)
    })

    onAuthStateChanged( a, async (
        authUser
    ) => {
        // console.log('*** NEW AUTH STATE CHANGED', authUser, a)
        console.log('FB *** AUTH STATE CHANGED')

        if (!a || !a.currentUser) {
            store.state.isAppInit = true
            store.state.appLoading = false

            console.info(`%c 🏃Ready To Run...`, consoleInitStyles)
            if(route.path === '/auth/' || route.path === '/auth') {
                // DO NOTHING
                console.log('DO NOT REDIRECT')
            } else {
                console.log('REDIRECT TO ONBOARDING')
                redirect('/auth')
            }
        }

        try {
            if (!a.currentUser) {
                console.info(`%c🔐No Auth `, consoleUserStyles)
                if(route.path === '/auth/' || route.path === '/auth') {
                    // Already on auth page
                    return false
                }
                redirect('/auth')
                return false
            }
            let tokenResult = await a.currentUser.getIdTokenResult(false)

            /**
             * Here we are waiting for Firebase to respond with active 'claims' on their
             * user account. We try for a max of 10 attempts
             */
            for (let i = 0; i < 9; i++) {
                await app.$helper.sleep(500)
                if (typeof(tokenResult.claims.isActive) === "undefined") {
                    tokenResult = await a.currentUser.getIdTokenResult(true)
                    console.log('LOOPER > CLAIMS', tokenResult.claims.isActive)

                } else {
                    break;
                }
            }

            await store.dispatch('user/onAuthStateChanged', {
                authUser,
                claims: tokenResult.claims
            })

            // console.info(`%c🔐authStateLoaded, ${tokenResult}`, consoleUserStyles)
            store.state.isAppInit = true
            store.state.appLoading = false

            console.info(`%c 🏃Ready To Run...`, consoleInitStyles)

        } catch (e) {
            console.info(`%c🔐Auth Failed To Load, `, consoleUserStyles)
            console.log('Error with Auth', e)
        }
    })

}
