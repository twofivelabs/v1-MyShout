import {getApps, initializeApp} from 'firebase/app'
import { Capacitor } from '@capacitor/core'
import {
    getAuth,
    indexedDBLocalPersistence,
    initializeAuth,
} from 'firebase/auth'

const isDev = true

export const firebaseConfig = {
    apiKey: isDev ? "AIzaSyChwP2vZ1Q4E_6wFIr0Pb_mfDFq_ThSas4" : "AIzaSyDzL5T3aUM7GGvTR_dh84Tm_D01T8pAGYM",
    authDomain: isDev ? "my-shout-staging.firebaseapp.com" : "my-shout-app.firebaseapp.com",
    projectId: isDev ? "my-shout-staging" : "my-shout-app",
    storageBucket: isDev ? "my-shout-staging.appspot.com" : "my-shout-app.appspot.com",
    messagingSenderId: isDev ? "777569508563" : "137661141174",
    appId: isDev ? "1:777569508563:web:f205aa7aea3820e0230826" : "1:137661141174:web:c00c73c494443d7e449617",
    measurementId: isDev ? "" : "G-6D1EY1D843"
}

const apps = getApps()
let firebaseApp
if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = apps[0]
}

const getFirebaseAuth = async () => {
    if (Capacitor.isNativePlatform()) {
        return initializeAuth(apps[0], {
            persistence: indexedDBLocalPersistence,
        });
    } else {
        const auth = getAuth()
        auth.useDeviceLanguage()
        return getAuth()
    }
}

export default firebaseApp
export {
    firebaseApp,
    getFirebaseAuth
}
