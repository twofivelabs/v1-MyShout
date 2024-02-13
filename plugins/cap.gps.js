import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"
//import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch'
import { Device } from '@capacitor/device'

const geoLocationConfig = {
    // Activity Recognition
    stopTimeout: 5,
    heartbeatInterval: 60,
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
    /**
     * Init GPS and add watchers
     * @returns {Promise<void>}
     */
    async gpsInit() {
        if (isGpsInit) return

        console.log('STICKY: [gps] gpsInit')
        isGpsInit = true

        // DESKTOP / WEBSITES
        const device = await Device.getInfo()
        if (device.platform === 'web') {
            console.log('STICKY: [gps] Background, not available on web')
            return
        }

        BackgroundGeolocation.ready(geoLocationConfig).then(async (state) => {
            console.log('STICKY: [gps] GEO STATE', state, JSON.stringify(state))
            if (!state.enabled) {
                // YES -- .ready() has now resolved.
                await BackgroundGeolocation.start().then(async () => {
                    // await window.$nuxt.context.store.dispatch('user/updateGPS', gps)
                })
            } else {
                console.log('STICKY: [gps] READY BackgroundGeolocation')
                setTimeout(() => {
                    console.log('STICKY: [gps] INIT ITEMS')
                    this.gpsGetCurrentPosition().then(gps => {
                        window.$nuxt.context.store.dispatch('user/updateGPS', gps)
                    })
                    this.gpsHeartbeatPosition()
                }, 10000)
            }

        }).catch(error => {
            console.log('STICKY: [gps] READY ERROR ', error, JSON.stringify(error))
        })
    },

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

    gpsHeartbeatPosition() {
        console.log('STICKY: [gps] [onHeartbeat] Try Watching GPS Position')
        BackgroundGeolocation.onHeartbeat(async () => {

            const taskId = await BackgroundGeolocation.startBackgroundTask()
            try {
                // Perform long-running tasks
                const location = await BackgroundGeolocation.getCurrentPosition({
                    samples: 3,
                    timeout: 30,
                    extras: {
                        "event": "heartbeat"
                    }
                })
                console.log("STICKY: [gps] [onHeartbeat] location:", location, JSON.stringify(location))
            } catch(error) {
                console.log("STICKY: [gps] [onHeartbeat] ERROR:", error, JSON.stringify(error))
            }
            // Be sure to signal completion of your background-task:
            await BackgroundGeolocation.stopBackgroundTask(taskId)
        });
    },

    /* async gpsInitBackgroundFetch() {
        const status = await BackgroundFetch.configure({
            minimumFetchInterval: 1
        }, async (taskId) => {
            console.log('STICKY: [gps] [BackgroundFetch] EVENT:', taskId)
            // Perform your work in an awaited Promise
            const result = this.gpsPerformBackgroundFetch()
            console.log('STICKY: [gps] [BackgroundFetch] work complete:', result)
            // [REQUIRED] Signal to the OS that your work is complete.
            // await BackgroundFetch.finish(taskId)
        }, async (taskId) => {
            // The OS has signalled that your remaining background-time has expired.
            // You must immediately complete your work and signal #finish.
            console.log('STICKY: [gps] [BackgroundFetch] TIMEOUT:', taskId)
            // [REQUIRED] Signal to the OS that your work is complete.
            // await BackgroundFetch.finish(taskId)
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
    },
    gpsPerformBackgroundFetch() {
        console.log('STICKY: [gps] performBackgroundFetch')
        return true
    }, */

}
