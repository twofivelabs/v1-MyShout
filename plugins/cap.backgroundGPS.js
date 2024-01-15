// https://github.com/transistorsoft/capacitor-background-fetch#installing-the-plugin
//import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
//import { registerPlugin } from '@capacitor/core'
//const BackgroundGeolocation = registerPlugin('BackgroundGeolocation')
import { Device } from '@capacitor/device'
import { Http } from '@capacitor-community/http'
import { geohashForLocation } from 'geofire-common'
import { Preferences } from '@capacitor/preferences'

import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"

let backgroundGeoLocationWatcherId = null
// let lastRun = new Date()

const BackgroundGeolocationConfig = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 5, // Meters,
    // stationaryRadius: 5, //iOS only, when stopped the min distance must move
    stopOnStationary: true,
    stopOnTerminate: false,
    startOnBoot: true,
    preventSuspend: true, // iOS enable continuous tracking in the background
    showsBackgroundLocationIndicator: true,
    enableHeadless: true, // Android, you can respond to all the plugin's events in the native Android environment
    backgroundPermissionRationale: {
        title: "Allow My Shout to access this device's location even when closed or not in use.",
        message: "This app collects location data to notify your family and emergency contacts in case of emergency.",
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel'
    },
}
const BackgroundGeolocationOptions = {

}

/* function wasRunRecently(minutes = 5) {
    // Get the current time
    const currentTime = new Date()

    // Set the time limit to 5 minutes ago
    const timeLimit = new Date(currentTime.getTime() - (minutes * 60 * 1000))

    // Check if the lastRun variable is set and whether it is within the time limit
    if (typeof lastRun !== 'undefined' && lastRun > timeLimit) {
        // console.log(`STICKY: Run Code and reset timer for ${minutes} minutes`)
        return true
    } else {
        // console.log(`STICKY: Code was not run within the last ${minutes} minutes`)
        return false
    }
} */

export default {
    async background_gpsInit() {
        console.log('STICKY: Background Init 1')
        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: Background, not available on web')
            return
        }

        console.log('STICKY: BACKGROUND init 2')
        await this.background_addBackgroundGeolocationWatcher()
    },
    // This will watch the app in the background.
    // But will only last about 5 minutes before shutting off
    // This might also cause the app to crash after 6 hours or so
    // Make sure to adjust location permissions to be "Allow all the time"
    async background_addBackgroundGeolocationWatcher () {
        console.log('STICKY: BACKGROUND positionWatcher')

        if (backgroundGeoLocationWatcherId) {
            console.log('STICKY: BACKGROUND positionWatcher, We already have a watcher ID', backgroundGeoLocationWatcherId)
            return true
        }

        return BackgroundGeolocation.ready(BackgroundGeolocationConfig).then((state) => {
            console.log('STICKY > BACKGROUND Geolocation is enabled:', state.enabled);
            console.log('STICKY > BACKGROUND Geolocation State:', state, JSON.stringify(state));
            BackgroundGeolocation.start()
            BackgroundGeolocation.getCurrentPosition(BackgroundGeolocationOptions).then((pos) => {
                console.log('STICKY > BACKGROUND Geolocation Position:', pos, JSON.stringify(pos))
            })

            // WE GOT LOCATION
            /* this.updateLoggedInUsersGPS2({
                lat: location.latitude,
                lng: location.longitude
            }) */
            return true
        }).catch((e) => {
            console.log('STICKY: background_positionWatcher ERROR: ', e, JSON.stringify(e))
            return e
        })
    },
    async getLocation() {
        return BackgroundGeolocation.getCurrentPosition(BackgroundGeolocationOptions)
    },

    async updateLoggedInUsersGPS(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: no gps data')

        const user = window.$nuxt.context.$fire.auth.currentUser
        const userToken = user ? await user.getIdTokenResult() : false

        if (!userToken.token) return console.log('STICKY: no user token available')

        const hash = geohashForLocation([gps.lat, gps.lng])

        const url = `https://firestore.googleapis.com/v1/projects/my-shout-app/databases/(default)/documents/Users/${userToken.claims.user_id}?updateMask.fieldPaths=gps.lat&updateMask.fieldPaths=gps.lng&updateMask.fieldPaths=gps.geoHash&updateMask.fieldPaths=gps.updated_at&currentDocument.exists=true`
        const payload = {
            "fields": {
                "gps": {
                    "mapValue": {
                        "fields": {
                            "geoHash": {
                                "stringValue": hash
                            },
                            "lat": {
                                "doubleValue": gps.lat
                            },
                            "lng": {
                                "doubleValue": gps.lng
                            },
                            "updated_at": {
                                "timestampValue": new Date()
                            }
                        }
                    }
                }
            }
        }
        /*const url = 'https://us-central1-my-shout-app.cloudfunctions.net/Rest-updateGPS'
        const payload = {
            "userId": userToken.claims.user_id,
            "gps": {
                "lat": gps.lat,
                "lng": gps.lng
            },
            "data": {
                "userId": userToken.claims.user_id,
                "gps": {
                    "lat": gps.lat,
                    "lng": gps.lng
                }
            }
        }
*/
        try {
            await Http.request({
                method: 'PATCH',
                url,
                headers: {
                    'Authorization': `Bearer ${userToken.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(payload)
            })
            // console.log('STICKY: updateLoggedInUsersGPS > USER:', userToken.claims.user_id)
            // console.log('STICKY: updateLoggedInUsersGPS > DATA:', payload, JSON.stringify(payload))
            // console.log('STICKY: updateLoggedInUsersGPS > RESPONSE:', response.status, JSON.stringify(response.data))
        } catch (e) {
            console.log('STICKY: updateLoggedInUsersGPS > ERROR', e, JSON.stringify(e))
        }
    },
    async updateLoggedInUsersGPS2(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: no gps data')
        let currentUserId = false

        console.log('STICKY: updateLoggedInUsersGPS2 > 1&2')

        if (currentUserId) {
            // ...
        } else {
            const { value } = await Preferences.get({ key: 'currentUserId' });
            currentUserId = value
        }

        console.log('STICKY: updateLoggedInUsersGPS2 > 3')

        if (!currentUserId) {
            console.log('STICKY: updateLoggedInUsersGPS2 > NO USER:')
            return
        }

        console.log('STICKY: updateLoggedInUsersGPS2 > 4')

        const url = 'https://us-central1-my-shout-app.cloudfunctions.net/Rest-updateGPS'
        const payload = {
            "data": {
                "userId": currentUserId,
                "gps": {
                    "lat": gps.lat,
                    "lng": gps.lng
                }
            }
        }

        console.log('STICKY: updateLoggedInUsersGPS2 > 5')

        try {
            const response = await Http.request({
                method: 'POST',
                url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(payload)
            })
             console.log('STICKY: updateLoggedInUsersGPS > USER:', currentUserId)
             console.log('STICKY: updateLoggedInUsersGPS > DATA:', payload, JSON.stringify(payload))
             console.log('STICKY: updateLoggedInUsersGPS > RESPONSE:', response.status, JSON.stringify(response.data))
        } catch (e) {
            console.log('STICKY: updateLoggedInUsersGPS > ERROR', e, JSON.stringify(e))
        }

        console.log('STICKY: updateLoggedInUsersGPS2 > 6')
    },
    async background_updateUserGpsLocation() {
        // do background stuff
        console.log('STICKY: background_geoLocation 1')

        return new Promise((resolve, reject) => {
            console.log('STICKY: background_geoLocation 2')

            try {
                console.log('STICKY: background_geoLocation 3')

                // Was not able to get traditional Geolocation (returned empty)

                resolve(true)

            } catch (e) {
                reject(false)
            }
        });
    }
}
