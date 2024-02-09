import { Device } from '@capacitor/device'
import { Http } from '@capacitor-community/http'
import { Preferences } from '@capacitor/preferences'
import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"
// import { geohashForLocation } from 'geofire-common'


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
const BackgroundGeolocationOptions = {}
let backgroundGeoLocationWatcherId = null


export default {
    async gpsInit () {
        console.log('STICKY: [gps] Init 1')
        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: [gps] not available on web')
            return
        }

        console.log('STICKY: [gps] init 2')
        await this.gpsAddWatcher()
    },
    async gpsAddWatcher () {
        console.log('STICKY: [gps] positionWatcher')

        if (backgroundGeoLocationWatcherId) {
            console.log('STICKY: [gps] positionWatcher, We already have a watcher ID', backgroundGeoLocationWatcherId)
            return true
        }

        return BackgroundGeolocation.ready(BackgroundGeolocationConfig).then((state) => {
            console.log('STICKY > [gps] is enabled:', state.enabled)
            console.log('STICKY > [gps] state:', state, JSON.stringify(state))

            BackgroundGeolocation.start()
            BackgroundGeolocation.getCurrentPosition(BackgroundGeolocationOptions).then((pos) => {
                console.log('STICKY > [gps] Position:', pos, JSON.stringify(pos))
            })

            return true

        }).catch((e) => {
            console.log('STICKY: [gps] gpsAddWatcher Error: ', e, JSON.stringify(e))
            return e
        })
    },
    async gpsGetLocation() {
        return BackgroundGeolocation.getCurrentPosition(BackgroundGeolocationOptions)
    },
    async gpsUpdateUserLocation(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: [gps] no data')
        let currentUserId = false

        console.log('STICKY: [gps] > gpsGetLocation > 1&2')

        if (!currentUserId) {
            const { value } = await Preferences.get({ key: 'currentUserId' })
            if (!value) return false
            currentUserId = value
        }

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
            console.log('STICKY: [gps] gpsGetLocation > DATA:', payload, JSON.stringify(payload))
            console.log('STICKY: [gps] gpsGetLocation > RESPONSE:', response.status, JSON.stringify(response.data))
        } catch (e) {
            console.log('STICKY: [gps] gpsGetLocation > ERROR', e, JSON.stringify(e))
        }

        console.log('STICKY: [gps] gpsGetLocation > FINISHED')
    },
}
