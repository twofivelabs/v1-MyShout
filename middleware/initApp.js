
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



export default async function ({ store, app, redirect, route } ) {
    if (store.state.isAppInit) {
        //console.log('!! App is init already')
        return null
    }
    store.state.appLoading = true
    let hasInitAppLocal = false

    function parseJwt (token) {
        try {
            if (typeof token === 'object' && token !== null) {
                token = token.token
            }
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch {
            return null
        }
    }
    async function getTokenResult(a, forceRefresh) {
        let tokenResult
        try {
            tokenResult = await a.currentUser.getIdTokenResult(forceRefresh)
        } catch { /* */ }

        if (!tokenResult) {
            try {
                tokenResult = await app.$db.fire().capAuth.getIdToken({forceRefresh: forceRefresh})
            } catch { /* */ }
        }
        return tokenResult
    }
    async function initStateChange(authUser, a=null) {
        hasInitAppLocal = true
        console.info(`%c🔐AUTH STATE CHANGED `, consoleUserStyles)

        if (!authUser || !authUser.uid) {
            //store.state.isAppInit = true
            store.state.appLoading = false

            console.info(`%c 🏃Ready To Run 2...`, consoleInitStyles)

            if(route.path === '/auth/' || route.path === '/auth') {
                console.log('Already here. Do not redirect')
                return
            } else {
                redirect('/auth')
            }
        }

        // We are going to try and get the user auth claims before loading
        // This will help with security and ensure we have an accurate user
        let tokenResult = await getTokenResult(a, false)
        let claims = parseJwt(tokenResult)

        if (claims && claims?.isActive && (typeof(claims?.isActive) !== "undefined")) {
            // Good to go
        } else {
            for (let i = 0; i < 15; i++) {
                if (!claims?.isActive) {
                    await app.$helper.sleep(500, 'Waiting for user claims')
                    tokenResult = await getTokenResult(a, true)
                    claims = parseJwt(tokenResult)
                } else {
                    break;
                }
            }
        }

        if (claims?.user_id) {
            // Send off that we have a user
            await store.dispatch('user/onAuthStateChanged', { authUser, claims: claims })

            while (store.state.user.authStateLoaded === false) {
                console.info(`🔐authStateLoaded? ${store.state.user.authStateLoaded}`)
                await new Promise(resolve => setTimeout(resolve, 250))
            }

            //console.log('PROFILE', store.state.user.profile.securityPin)

            store.state.isAppInit = true
            store.state.appLoading = false

            console.info(`%c 🏃Ready To Run 1...`, consoleInitStyles)
        } else {
            console.log('No user, waiting for authentication to run')
        }
    }

    onAuthStateChanged( a, async (authUser) => {
        console.log('** FB > Auth State Changed')
        if (!hasInitAppLocal) await initStateChange(authUser, a)
    })
    app.$db.fire().capAuth.addListener('authStateChange', async (authUser) => {
        console.log('** CAP > Auth State Changed')
        if (authUser.user) {
            if (!hasInitAppLocal) await initStateChange(authUser.user)
            return
        }
        if (!hasInitAppLocal) await initStateChange(authUser)
    })
}
