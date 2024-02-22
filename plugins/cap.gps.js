import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"
//import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch'
import { Device } from '@capacitor/device'
import { Preferences } from '@capacitor/preferences'

const geoLocationConfig = {
    // Activity Recognition
    stopTimeout: 5,
    heartbeatInterval: 30,
    // Application config
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 5, // Meters,
    // stationaryRadius: 5, // iOS only, when stopped the min distance must move
    stopOnStationary: false,
    preventSuspend: true, // iOS enable continuous tracking in the background
    showsBackgroundLocationIndicator: true,
    backgroundPermissionRationale: {
        title: "Allow My Shout to access this device's location even when closed or not in use.",
        message: "This app collects location data to notify your family and emergency contacts in case of emergency.",
        positiveAction: 'Change to Always Allow',
        negativeAction: 'Cancel'
    },
}
const currentPositionOptions = {
    samples: 3
}
let isGpsInit = false
let isGpsStarted = false

export default {
    /**
     * Init GPS and add watchers
     * @returns {Promise<void>}
     */
    async gpsInit() {
        if (isGpsInit) return

        isGpsInit = true

        // DESKTOP / WEBSITES
        const device = await Device.getInfo()
        if (device.platform === 'web') return

        try {
          BackgroundGeolocation.ready(geoLocationConfig).then(async () => {
            console.log('STICKY: [gps] #1 BackgroundGeoLocation is Ready')

            if (!isGpsStarted) {
                console.log('STICKY: [gps] #2 Starting Location Tracking')
                // YES -- .ready() has now resolved.
                BackgroundGeolocation.start().then(() => {
                    console.log('STICKY: [gps] #3 Location tracking Has Started')
                    isGpsStarted = true
                    this.gpsInitHeartbeat()
                    //this.gpsGetCurrentPosition()
                })
            }
          })
        } catch (error) {
          console.log('STICKY: [gps] ERROR Getting BackgroundGeoLocation Ready', error)
        }
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

    /**
     * This will run based upon the timeframe set in the settings to try and update
     * GPS coords in firebase
     */
    gpsInitHeartbeat() {
        console.log('STICKY: [gps] 5 gpsInitHeartbeat, waiting a few seconds before loading')

            try {
              console.log('STICKY: [gps] 6 [gpsInitHeartbeat] addListener')
              BackgroundGeolocation.addListener('heartbeat', () => {
                console.log('STICKY: [gps] 7 [heartbeat] success')
              })
            } catch (error) {
              console.log('STICKY: [gps] [gpsInitHeartbeat] addListener ERROR', error)
            }

            /*console.log('STICKY: [gps] 8 [gpsInitHeartbeat] onHeartbeat')

            try {
              console.log('STICKY: [gps] 9 [gpsInitHeartbeat] Starting onHeartbeat')
                BackgroundGeolocation.onHeartbeat(async () => {
                    console.log('STICKY: [gps] 10 [gpsInitHeartbeat] startBackgroundTask')
                    const taskId = await BackgroundGeolocation.startBackgroundTask()
    
                    console.log('STICKY: [gps] 11 [onHeartbeat] Inside Try before getcurrentposition', taskId)
                    // Perform long-running tasks
                    const location = await BackgroundGeolocation.getCurrentPosition({
                        samples: 3,
                        timeout: 30,
                        extras: {
                            "event": "heartbeat"
                        }
                    })
                    console.log("STICKY: [gps] 12 [onHeartbeat] location:", location, JSON.stringify(location))
                    await this.httpUpdateUsersGPS({
                        lat: location?.coords?.latitude || null,
                        lng: location?.coords?.longitude || null,
                        is_moving: location?.is_moving || null
                    }).catch(e => {
                        console.log("STICKY: [gps] [httpUpdateUsersGPS] error:", e, JSON.stringify(e))
                    })
    
                    // Be sure to signal completion of your background-task:
                    await BackgroundGeolocation.stopBackgroundTask(taskId)
                })  
            } catch (error) {
                console.log('STICKY: [gps] [gpsInitHeartbeat] onHeartbeat ERROR', error)
            }*/
            
    },


    async httpUpdateUsersGPS(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: [gps] [http] no data')

        let currentUserId = false
        let userToken

        console.log('STICKY: [gps] [http] step 1')

        const user = window.$nuxt.context.$fire.auth.currentUser
        userToken = user ? await user.getIdTokenResult() : false

        const { value } = await Preferences.get({ key: 'currentUserId' })
        currentUserId = userToken.claims.user_id || value

        if (!currentUserId) {
            console.log('STICKY: [gps] [http] no user to send request')
            return
        }

        console.log('STICKY: [gps] [http] step 2')

        const payload = {
            "userToken": userToken.token,
            "userId": currentUserId,
            "gps": {
                "lat": gps.lat,
                "lng": gps.lng
            },
            "data": {
                "data": {
                    "userId": currentUserId,
                    "gps": {
                        "lat": gps.lat,
                        "lng": gps.lng
                    }
                }
            }
        }

        console.log('STICKY: [gps] [http] step 3')

        const postStagingUrl = 'https://us-central1-my-shout-staging.cloudfunctions.net/Rest-updateGPS'
        //eslint-disable-next-line no-unused-vars
        const postLiveUrl = 'https://us-central1-my-shout-app.cloudfunctions.net/Rest-updateGPS'

        this.sendHttpRequest('POST', postStagingUrl, payload.data, function(error, responseData) {
            if (error) {
                console.log('STICKY: [gps] [http2] post error: ', error, JSON.stringify(error))
            } else {
                console.log('STICKY: [gps] [http2] post success: ', responseData, JSON.stringify(responseData))
            }
        })
        // await this.sendHttpRequest2('POST', postStagingUrl, payload)
        console.log('STICKY: [gps] [http] step 4 - FINISHED')
    },

    sendHttpRequest(method, url, data, callback) {
        /* if (!data?.userToken) {
            console.log('STICKY: [gps] [http] No User Token')
            return false
        } */
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        // xhr.setRequestHeader('Authorization', `Bearer ${data.userToken}`)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(null, JSON.parse(xhr.responseText))
            } else {
                callback('STICKY: [gps] [http2] Error: ' + xhr.status)
            }
        };

        xhr.onerror = function() {
            callback('STICKY: [gps] [http2] Request failed')
        }

        if (data) {
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send()
        }
    },
}
