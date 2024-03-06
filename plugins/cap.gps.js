import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation"
import { BackgroundFetch } from '@transistorsoft/capacitor-background-fetch'
import { Device } from '@capacitor/device'
import { Preferences } from '@capacitor/preferences'
import { CapacitorHttp } from '@capacitor/core'

const geoLocationConfig = {
    //url: 'https://us-central1-my-shout-staging.cloudfunctions.net/Rest-updateGPS',
    //autoSync: true,
    /* extras: {
        userId: 'YfF3k6iNYHUSoy1In4dHmeBjbbC2'
    }, */
    batchSync: true,
    // Activity Recognition
    stopTimeout: 5,
    heartbeatInterval: 30,
    // Application config
    debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    enableHeadless: true,
    distanceFilter: 5, // Meters,
    // stationaryRadius: 5, // iOS only, when stopped the min distance must move
    stopOnStationary: false,
    preventSuspend: true, // iOS enable continuous tracking in the background
    locationAuthorizationRequest: 'Always',
    showsBackgroundLocationIndicator: true,
    backgroundPermissionRationale: {
        title: 'gps.rationale_title',
        message: 'gps.rationale_message',
        positiveAction: 'gps.rationale_positive_action',
        negativeAction: 'gps.rationale_negative_action'
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
        if (device.platform === 'web') {
            this.gpsGetPositionAndUpdateUser('init')
            return
        }

        // Set User Id URL Param
        try {
            const user = window.$nuxt.context.$fire.auth.currentUser
            console.log('STICKY: [gps] User Is ', user)
            const userToken = user ? await user.getIdTokenResult() : false
            const {value} = await Preferences.get({key: 'currentUserId'})
            geoLocationConfig.params.userId = userToken.claims.user_id || value
            console.log('STICKY: [gps] Setting User Id = ', geoLocationConfig.params.userId)
        } catch (e) {
            console.log('STICKY: [gps] Setting User Id Error: ', e, JSON.stringify(e))
        }

        // Ready the background geolocation
        try {
            BackgroundGeolocation.ready(geoLocationConfig).then(async () => {
                console.log('STICKY: [gps] #1 BackgroundGeoLocation is Ready')

                if (!isGpsStarted) {
                    console.log('STICKY: [gps] #2 Starting Location Tracking')
                    // YES -- .ready() has now resolved.
                    BackgroundGeolocation.start().then(() => {
                        console.log('STICKY: [gps] #3 Location tracking Has Started')
                        isGpsStarted = true
                    })

                    // When HTTP sends a request
                    /* BackgroundGeolocation.onHttp(response => {
                        console.log('STICKY: [gps] [onHttp] response: ', response, JSON.stringify(response))
                    }) */

                    //this.gpsInitHeartbeat()
                    this.gpsInitProviderListeners()
                    // await this.gpsInitOnLocation()
                    await this.gpsInitBackgroundFetch()
                } else {
                    console.log('STICKY: [gps] #2.1 isGpsStarted TRUE')
                    //this.gpsInitHeartbeat()
                    this.gpsInitProviderListeners()
                    // await this.gpsInitOnLocation()
                    await this.gpsInitBackgroundFetch()
                }

                BackgroundGeolocation.onHeartbeat( () => {
                    //const taskId = await BackgroundGeolocation.startBackgroundTask()
                    console.log('STICKY: [gps] #4.2 init onHeartbeat event')
                    this.gpsGetPositionAndUpdateUser().then((r) => {
                        console.log('STICKY: [gps] #4.3 SUCCESS:', r, JSON.stringify(r))
                    }).catch((e) => {
                        console.log('STICKY: [gps] #4.3 ERROR:', e, JSON.stringify(e))
                    })

                    //await BackgroundGeolocation.stopBackgroundTask(taskId)
                });
            })
        } catch (error) {
            console.log('STICKY: [gps] ERROR Getting BackgroundGeoLocation Ready', error, JSON.stringify(error))
        }
    },

    /**
     * Fired whenever the location changes
     * Caution: can be fired a lot when driving
     * @returns {Promise<void>}
     */
    async gpsInitOnLocation() {
        const taskId = await BackgroundGeolocation.startBackgroundTask()

        console.log('STICKY: [gps] OnLocation Event #1')

        BackgroundGeolocation.onLocation((location) => {
            console.log('STICKY: [gps] OnLocation Event #2', location, JSON.stringify(location))
        })

        await BackgroundGeolocation.stopBackgroundTask(taskId);

    },

    /**
     * This will run based upon the timeframe set in the settings to try and update
     * GPS coords in firebase
     */
    gpsInitHeartbeat() {
        console.log('STICKY: [gps] #4.1 init onHeartbeat event')
        BackgroundGeolocation.onHeartbeat( () => {
            //const taskId = await BackgroundGeolocation.startBackgroundTask()
            console.log('STICKY: [gps] #4.2 init onHeartbeat event')
            this.gpsGetPositionAndUpdateUser().catch((e) => {
                console.log('STICKY: [gps] #4.3 ERROR:', e, JSON.stringify(e))
            })

            //await BackgroundGeolocation.stopBackgroundTask(taskId)
        });
    },

    /**
     * Initialize listeners for when the user changes location permissions
     */
    gpsInitProviderListeners() {
        console.log('STICKY: [gps] [registerProviderListeners]')

        BackgroundGeolocation.onProviderChange((event) => {
            console.log('STICKY: [gps] [onProviderChange] event:', event, JSON.stringify(event))
            switch(event.status) {
                case BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS:
                    console.log('STICKY: [gps] [onProviderChange] AUTH ALWAYS')
                    break;
                case BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE:
                    console.log('STICKY: [gps] [onProviderChange] AUTH - WHEN IN USE' )
                    BackgroundGeolocation.requestPermission().then(r => {
                        console.log('STICKY: [gps] [requestPermission] Res:', r, JSON.stringify(r))
                    })
                    break;
                case BackgroundGeolocation.AUTHORIZATION_STATUS_DENIED:
                    console.log('STICKY: [gps] [onProviderChange] AUTH - DENIED' )
                    BackgroundGeolocation.requestPermission().then(r => {
                        console.log('STICKY: [gps] [requestPermission] Res:', r, JSON.stringify(r))
                    })
                    break;
                case BackgroundGeolocation.AUTHORIZATION_STATUS_RESTRICTED:
                    console.log('STICKY: [gps] [onProviderChange] AUTH - RESTRICTED' )
                    BackgroundGeolocation.requestPermission().then(r => {
                        console.log('STICKY: [gps] [requestPermission] Res:', r, JSON.stringify(r))
                    })
                    break;
                default:
                    BackgroundGeolocation.requestPermission().then(r => {
                        console.log('STICKY: [gps] [requestPermission] Default:', r, JSON.stringify(r))
                    })
            }
        })
    },

    /**
     * TESTING: Using a background fetch instead of heartbeat
     * @returns {Promise<void>}
     */
    async gpsInitBackgroundFetch() {
        await BackgroundGeolocation.startBackgroundTask((taskId) => {
            console.log('STICKY: [gps] gpsInitOnLocation SUCCESS', taskId, JSON.stringify(taskId))
            this.gpsGetPositionAndUpdateUser('backgroundTask')
        }, (error) => {
            console.log('STICKY: [gps] gpsInitOnLocation ERROR', error, JSON.stringify(error))
        })

        const backgroundFetchConfig = {
            minimumFetchInterval: 1 // minutes
        }
        const status = await BackgroundFetch.configure(backgroundFetchConfig, async (taskId) => {
            console.log('STICKY: [gps] [BackgroundFetch] EVENT:', taskId)
            // Perform your work in an awaited Promise
            const result = await this.gpsGetPositionAndUpdateUser()
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

    /**
     * Receive the GPS from the phone and submit a HTTP request to update user
     * @param eventType
     * @returns {Promise<boolean>}
     */
    gpsGetPositionAndUpdateUser(eventType = 'heartbeat') {
        const getCurrentPositionConfig = {
            samples: 1,
            persist: true,
            timeout: 30,
            extras: {
                "event": eventType
            }
        }
        return BackgroundGeolocation.getCurrentPosition(getCurrentPositionConfig).then(location => {
            console.log('STICKY: [gps] #5.1 gpsGetPositionAndUpdateUser', location, JSON.stringify(location))

            // Try and update the user store
            window.$nuxt.context.store.dispatch('user/updateGPS', {
                lat: location?.coords?.latitude || null,
                lng: location?.coords?.longitude || null,
            }).then(() => {
                console.log('STICKY: [gps] #5.1.1 update local user')
            }).catch((e) => {
                console.log('STICKY: [gps] #5.1.1 update local user ERROR: ', e, JSON.stringify(e))
            })

            // Send Update Firebase
            return this.httpUpdateUsersGPS({
                lat: location?.coords?.latitude || null,
                lng: location?.coords?.longitude || null,
                is_moving: location?.is_moving || null
            }).then(() => {
                return true

            }).catch(e => {
                console.log("STICKY: [gps] [gpsGetPositionAndUpdateUser] error:", e, JSON.stringify(e))
                return false
            })

            // Update local user
            // window.$nuxt.context.store.dispatch('user/updateGPS', gps)
        }).catch((e) => {
            console.log("STICKY: [gps] [gpsGetPositionAndUpdateUser] error:", e, JSON.stringify(e))
            return false
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

    /**
     * Prep HTTP request to update the users GPS data in Firebase
     * @param gps
     * @returns {Promise<void>}
     */
    async httpUpdateUsersGPS(gps) {
        if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: [gps] [http] no data')

        let currentUserId = false
        let userToken

        const user = window.$nuxt.context.$fire.auth.currentUser
        userToken = user ? await user.getIdTokenResult() : false

        const { value } = await Preferences.get({ key: 'currentUserId' })
        currentUserId = userToken.claims.user_id || value

        if (!currentUserId) {
            console.log('STICKY: [gps] [http] no user to send request')
            return
        }

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
    },

    /**
     * Use basic HTTP request
     * @param method
     * @param url
     * @param data
     * @param callback
     */
    async sendHttpRequest(method, url, data, callback) {
        const options = {
            method: method,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await CapacitorHttp.request(options);
        console.log('STICKY: [gps] [httpCapacitor] Response:', response, JSON.stringify(response))
        console.log('Callback', callback)
        /* if (!data?.userToken) {
            console.log('STICKY: [gps] [http] No User Token')
            return false
        } */
        /* const xhr = new XMLHttpRequest()
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
        } */
    },
}
