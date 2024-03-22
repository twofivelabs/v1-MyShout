// https://github.com/transistorsoft/capacitor-background-fetch#installing-the-plugin
import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
import { Device } from '@capacitor/device'
import { registerPlugin } from '@capacitor/core'
import {Http} from '@capacitor-community/http'
const BackgroundGeolocation = registerPlugin('BackgroundGeolocation')
// import { geohashForLocation } from 'geofire-common'
import { Preferences } from '@capacitor/preferences';

let backgroundGeoLocationWatcherId = null
let lastRun = new Date()

function wasRunRecently(minutes = 5) {
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
}

export default {
    async updateLoggedInUsersGPS(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: no gps data')

        /* const user = window.$nuxt.context.$fire.auth.currentUser
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
        /!*const url = 'https://us-central1-my-shout-app.cloudfunctions.net/Rest-updateGPS'
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
*!/
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
        } */
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
    // This will watch the app in the background.
    // But will only last about 5 minutes before shutting off
    // This might also cause the app to crash after 6 hours or so
    // Make sure to adjust location permissions to be "Allow all the time"
    async background_addBackgroundGeolocationWatcher () {
        console.log('STICKY: background_positionWatcher')

        if (backgroundGeoLocationWatcherId) {
            console.log('STICKY: background_positionWatcher, We already have a watcher ID', backgroundGeoLocationWatcherId)
            // return
        }

        try {
            backgroundGeoLocationWatcherId = await BackgroundGeolocation.addWatcher({
                // On Android, a notification must be shown to continue receiving
                // location updates in the background. This option specifies the text of
                // that notification.
                // TODO: Language detection here
                backgroundMessage: "MyShout collects location data to enable notify emergency contacts, even when the app is closed or not in use.",
                backgroundTitle: "MyShout is using your location",
                requestPermissions: true,
                stale: false,
                distanceFilter: 10
            }, (location, error) => {

                if (error) {
                    if (error.code === "NOT_AUTHORIZED") {
                        if (window.confirm(
                            "This app needs your location, " +
                            "but does not have permission.\n\n" +
                            "Open settings now?"
                        )) {
                            // It can be useful to direct the user to their device's
                            // settings when location permissions have been denied. The
                            // plugin provides the 'openSettings' method to do this
                            BackgroundGeolocation.openSettings().then(() => {
                                console.log('STICKY: openSettings')
                            }).catch(() => {
                                // ..
                            })
                        }
                    }
                    console.log('STICKY: BackgroundGeolocation', error.code, error)
                    return console.error(error);
                }

                // WE GOT LOCATION
                this.updateLoggedInUsersGPS2({
                    lat: location.latitude,
                    lng: location.longitude
                })
                /*window.$nuxt.context.$capacitor.updateLoggedInUsersGPS2({
                    lat: location.latitude,
                    lng: location.longitude
                })*/
                /*window.$nuxt.context.$capacitor.updateLoggedInUsersGPS({
                    lat: location.latitude,
                    lng: location.longitude
                })*/
                if (!wasRunRecently()) {
                    console.log('STICKY: was run recently, update date')
                    console.log(`STICKY: location is ${location.latitude} && ${location.longitude}`)
                    /*lastRun = new Date()
                    window.$nuxt.context.$capacitor.updateLoggedInUsersGPS({
                        lat: location.latitude,
                        lng: location.longitude
                    })*/
                }
            })
        } catch (e) {
            console.log('STICKY: background_positionWatcher ERROR: ', e, JSON.stringify(e))
        }
    },
    async background_tasksInit() {
        console.log('STICKY: Background Init 1')
        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: Background, not available on web')
            return
        }

        console.log('STICKY: BACKGROUND init 2')
        const result = await this.background_addBackgroundGeolocationWatcher()
        console.log('STICKY: BACKGROUND init results 3', result, JSON.stringify(result))

        const status = await BackgroundFetch.configure({
            minimumFetchInterval: 15
        }, async (taskId) => {
            console.log('STICKY: [BackgroundFetch] EVENT:', taskId);

            // Perform your work in an awaited Promise
            await this.background_addBackgroundGeolocationWatcher()

            // [REQUIRED] Signal to the OS that your work is complete.
            console.log('STICKY: [BackgroundFetch] work complete:', result);
            await BackgroundFetch.finish(taskId);

        }, async (taskId) => {
            // The OS has signalled that your remaining background-time has expired.
            // You must immediately complete your work and signal #finish.
            console.log('STICKY: [BackgroundFetch] TIMEOUT:', taskId);
            // [REQUIRED] Signal to the OS that your work is complete.
            BackgroundFetch.finish(taskId);
        });

        // Checking BackgroundFetch status:
        if (status !== BackgroundFetch.STATUS_AVAILABLE) {
            // Uh-oh:  we have a problem:
            if (status === BackgroundFetch.STATUS_DENIED) {
                console.log('STICKY: BACKGROUND Status === DENIED')
                //alert('The user explicitly disabled background behavior for this app or for the whole system.');
            } else if (status === BackgroundFetch.STATUS_RESTRICTED) {
                console.log('STICKY: BACKGROUND Status === RESTRICTED')
                //alert('Background updates are unavailable and the user cannot enable them again.')
            }
        }

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
