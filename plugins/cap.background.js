// https://github.com/transistorsoft/capacitor-background-fetch#installing-the-plugin
import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
import { Device } from '@capacitor/device'
import { registerPlugin } from "@capacitor/core"
import {Geolocation} from '@capacitor/geolocation'
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation")

let backgroundGeoLocationWatcherId = null

export default {
    // This will watch the app in the background.
    // But will only last about 5 minutes before shutting off
    // gpsBackgroundPosition
    async background_positionWatcher () {
        console.log('STICKY: gpsBackgroundPosition')

        if (backgroundGeoLocationWatcherId) {
            console.log('STICKY: We already have a watcher ID', backgroundGeoLocationWatcherId)
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
                console.log('STICKY: Background Location: ', location, JSON.stringify(location))

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
                console.log('STICKY: Background before restUpdateGPS: ', location, JSON.stringify(location))
                window.$nuxt.context.$capacitor.updateLoggedInUsersGPS({
                    lat: location.latitude,
                    lng: location.longitude
                })
                window.$nuxt.context.$services.restUpdateGPS({
                    lat: location.latitude,
                    lng: location.longitude,
                    speed: location.speed || null
                })
                console.log('STICKY: Background after restUpdateGPS: ', location, JSON.stringify(location))

                /*app.$capacitor.updateLoggedInUsersGPS({
                    lat: location.latitude,
                    lng: location.longitude,
                    speed: location.speed || null,
                    data: null
                })*/
            })
        } catch (e) {
            console.log('STICKY: Background Location ERROR: ', e, JSON.stringify(e))
        }
    },
    async background_init() {
        console.log('STICKY: Background Init 1')

        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: Background, not available on web')
            return
        }

        console.log('STICKY: BACKGROUND init 2')

        const status = await BackgroundFetch.configure({
            minimumFetchInterval: 15
        }, async (taskId) => {
            console.log('STICKY: [BackgroundFetch] EVENT:', taskId);

            // Perform your work in an awaited Promise
            const result = await this.background_geoLocation();

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
    async background_geoLocation() {
        // do background stuff
        console.log('STICKY: DO BACKGROUND TASK 1')

        return new Promise((resolve, reject) => {
            console.log('STICKY: DO BACKGROUND TASK 2')

            try {
                console.log('STICKY: background_positionWatcher')
                this.background_positionWatcher()

                console.log('STICKY: Geolocation.getCurrentPosition')
                const coordinates = Geolocation.getCurrentPosition({enableHighAccuracy: true})
                console.log('STICKY: PHONE COORDS', coordinates, JSON.stringify(coordinates))
                resolve(true)

            } catch (e) {
                reject(false)
            }
        });
    }
}
