import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"
// import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch'
import { Device } from '@capacitor/device'

const geoLocationConfig = {
    // Activity Recognition
    stopTimeout: 5,
    // Application config
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 5, // Meters,
    // stationaryRadius: 5, // iOS only, when stopped the min distance must move
    stopOnStationary: true,
    preventSuspend: true, // iOS enable continuous tracking in the background
    showsBackgroundLocationIndicator: true,
    backgroundPermissionRationale: {
        title: "Allow My Shout to access this device's location even when closed or not in use.",
        message: "This app collects location data to notify your family and emergency contacts in case of emergency.",
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel'
    },
}
const currentPositionOptions = {
    samples: 3
}
let isGpsInit = false

export default {
    async gpsInit() {
        if (isGpsInit) return

        console.log('STICKY: [gps] gpsInit')
        isGpsInit = true

        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: Background, not available on web')
            return
        }

        BackgroundGeolocation.ready(geoLocationConfig).then(async (state) => {
            console.log('STICKY: [gps] READY ', state, JSON.stringify(state))
            // YES -- .ready() has now resolved.
            await BackgroundGeolocation.start().then(async () => {
                const gps = await this.gpsGetCurrentPosition()
                this.gpsWatchPosition()
                await window.$nuxt.context.store.dispatch('user/updateGPS', gps)
            })
        }).catch(error => {
            console.log('STICKY: [gps] READY ERROR ', error, JSON.stringify(error))
        })
    },
    /* async initBackgroundFetch() {
        const status = await BackgroundFetch.configure({
            minimumFetchInterval: 3
        }, async (taskId) => {
            console.log('STICKY: [gps] [BackgroundFetch] EVENT:', taskId)
            // Perform your work in an awaited Promise
            const result = this.performBackgroundFetch()
            console.log('STICKY: [gps] [BackgroundFetch] work complete:', result)
            // [REQUIRED] Signal to the OS that your work is complete.
            // await BackgroundFetch.finish(taskId)
        }, async (taskId) => {
            // The OS has signalled that your remaining background-time has expired.
            // You must immediately complete your work and signal #finish.
            console.log('STICKY: [gps] [BackgroundFetch] TIMEOUT:', taskId)
            // [REQUIRED] Signal to the OS that your work is complete.
            await BackgroundFetch.finish(taskId)
        })

        // Checking BackgroundFetch status:
        if (status !== BackgroundFetch.STATUS_AVAILABLE) {
            // Uh-oh:  we have a problem:
            if (status === BackgroundFetch.STATUS_DENIED) {
                console.log('STICKY: [gps] The user explicitly disabled background behavior for this app or for the whole system.');
            } else if (status === BackgroundFetch.STATUS_RESTRICTED) {
                console.log('STICKY: [gps] Background updates are unavailable and the user cannot enable them again.')
            }
        }
    }, */
    /* performBackgroundFetch() {
        console.log('STICKY: [gps] performBackgroundFetch')
        return true
    }, */

    /**
     * RESPONSE: {"is_moving":false,"uuid":"21b3b4e4-ee0b-4e76-ae8a-d5509edb2e82","timestamp":"2024-02-12T20:39:10.732Z","age":82,"odometer":0,"coords":{"latitude":50.11398,"longitude":-119.39603,"accuracy":5,"speed":20.39,"speed_accuracy":0.5,"heading":209,"heading_accuracy":30,"altitude":0,"ellipsoidal_altitude":0,"altitude_accuracy":0.5,"age":88},"activity":{"type":"still","confidence":100},"battery":{"is_charging":false,"level":1},"extras":{}}
     * @returns {Promise<{lng, lat, is_moving}>}
     */
    async gpsGetCurrentPosition() {
        console.log('STICKY: [gps] gpsGetCurrentPosition')
        return await BackgroundGeolocation.getCurrentPosition(currentPositionOptions).then(location => {
            console.log('STICKY: [gps] success ', location, JSON.stringify(location))
            return {
                lat: location?.coords?.latitude || null,
                lng: location?.coords?.longitude || null,
                is_moving: location?.is_moving || false,
            }
        }).catch(error => {
            console.log('STICKY: [gps] error ', error, JSON.stringify(error))
            return error
        })
    },

    gpsWatchPosition() {
        BackgroundGeolocation.onHeartbeat(heartbeatEvent => {
            console.log("STICKY: [gps] [background] [heartbeat] ", heartbeatEvent)
        })
        BackgroundGeolocation.onLocation((location) => {
            console.log("STICKY: [gps] [background] [onLocation] success: ", location);
        }, (error) => {
            console.log("STICKY: [gps] [background] [onLocation] ERROR: ", error);
        });
        BackgroundGeolocation.watchPosition((location) => {
            console.log("STICKY: [gps] [background] [watchPosition] -", location);
        }, (errorCode) => {
            console.log("STICKY: [gps] [background] [watchPosition] ERROR -", errorCode);
        }, {
            interval: 1000,
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            persist: true,
            extras: {foo: "bar"},
            timeout: 60000
        });
    }
}
