// https://github.com/transistorsoft/capacitor-background-fetch#installing-the-plugin
// import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
import { Device } from '@capacitor/device'
import { registerPlugin } from "@capacitor/core"
import {Http} from "@capacitor-community/http"
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation")

let backgroundGeoLocationWatcherId = null

export default {
    async updateLoggedInUsersGPS(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: no gps data')

        const user = window.$nuxt.context.$fire.auth.currentUser
        const userToken = user ? await user.getIdTokenResult() : false

        if (!userToken.token) return console.log('STICKY: no user token available')

        const url = `https://firestore.googleapis.com/v1/projects/my-shout-app/databases/(default)/documents/Users/${userToken.claims.user_id}?updateMask.fieldPaths=gps.lat&updateMask.fieldPaths=gps.lng&currentDocument.exists=true`
        const data = {
            "fields": {
                "gps": {
                    "mapValue": {
                        "fields": {
                            "lat": {
                                "doubleValue": gps.lat
                            },
                            "lng": {
                                "doubleValue": gps.lng
                            }
                        }
                    }
                }
            }
        }

        try {
            const response = await Http.patch({
                headers: { 'Authorization': `Bearer ${userToken.token}` },
                url,
                data
            })
            console.log('STICKY: updateLoggedInUsersGPS > USER:', userToken.claims.user_id)
            console.log('STICKY: updateLoggedInUsersGPS > DATA:', data, JSON.stringify(data))
            console.log('STICKY: updateLoggedInUsersGPS > SUCCESS:', response.status)
        } catch (e) {
            console.log('STICKY: updateLoggedInUsersGPS > ERROR', e, JSON.stringify(e))
        }
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
                console.log('STICKY: background_positionWatcher Location: ', location, JSON.stringify(location))

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
                window.$nuxt.context.$capacitor.updateLoggedInUsersGPS({
                    lat: 55.555555,
                    lng: -111.111111
                })
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
        const result = await this.background_addBackgroundGeolocationWatcher();
        console.log('STICKY: BACKGROUND init results 3', result, JSON.stringify(result))

        /*const status = await BackgroundFetch.configure({
            minimumFetchInterval: 15
        }, async (taskId) => {
            console.log('STICKY: [BackgroundFetch] EVENT:', taskId);

            // Perform your work in an awaited Promise

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
*/
    },
    async background_updateUserGpsLocation() {
        // do background stuff
        console.log('STICKY: background_geoLocation 1')

        return new Promise((resolve, reject) => {
            console.log('STICKY: background_geoLocation 2')

            try {
                console.log('STICKY: background_geoLocation 3')
                this.background_positionWatcher()

                // Was not able to get traditional Geolocation (returned empty)

                resolve(true)

            } catch (e) {
                reject(false)
            }
        });
    }
}
