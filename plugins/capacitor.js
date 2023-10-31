import { Geolocation } from '@capacitor/geolocation'
import { Device } from '@capacitor/device'
import { Share } from '@capacitor/share'
import { FCM } from "@capacitor-community/fcm"
import { PushNotifications } from '@capacitor/push-notifications'

import { App } from '@capacitor/app'
import { Camera, CameraResultType } from '@capacitor/camera'
import { VoiceRecorder } from 'capacitor-voice-recorder'

import { Contacts } from '@capacitor-community/contacts'
import { Badge } from '@capawesome/capacitor-badge'

import admob from './cap.admob'
// import background from './cap.background'

// VARIABLES
let watchCallbackId = null
// const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

export default function ({
  app,
  store
}, inject) {
  // INIT
  if(app) {
      app.store.dispatch('user/updateField', {
        isOnline: {
            'status': 'online',
            'created_at': new Date()
        }
      })
  }
  if(App) {
      App.addListener('appStateChange', ({ isActive }) => {
        app.store.dispatch('user/updateField', {
          isOnline: {
              'status': (isActive === true) ? 'online' : 'offline',
              'created_at': new Date()
          }
        })
      })
  }
  if(document) {
      document.addEventListener('resume', function () {
          app.store.dispatch('user/updateField', {
              isOnline: {
                  'status': 'online',
                  'created_at': new Date()
              }
          })
      })
      document.addEventListener('pause', function () {
          app.store.dispatch('user/updateField', {
              isOnline: {
                  'status': 'paused',
                  'created_at': new Date()
              }
          })
      })
  }

  inject('capacitor', {
      ...admob,
      //...background,

      async getContacts() {
          return await Contacts.getPermissions().then(async (permission) => {
              if (permission.granted) {
                return await Contacts.getContacts()
              }
          })
      },

    /**
     https://capacitorjs.com/docs/apis/geolocation
     accuracy: 16.687
     altitude: null
     altitudeAccuracy: null
     heading: null
     latitude: 50.0092119
     longitude: -119.396922
     speed: null
     */
    async gpsSetPosition (gps) {
        // console.log('STICKY: GPS > SET', gps, JSON.stringify(gps))
        await store.dispatch('user/updateGPS', gps)
    },

    async gpsGetCurrentPosition () {
        const device = await Device.getInfo()
        let gps = null

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            await navigator.geolocation.getCurrentPosition((coordinates) => {
                if (coordinates && coordinates.coords) {
                    gps = coordinates.coords
                    console.log('LOGGER: WEB COORDS', coordinates)
                    app.$capacitor.gpsSetPosition({
                        lat: coordinates.coords.latitude,
                        lng: coordinates.coords.longitude,
                        speed: coordinates.coords.speed || null,
                        data: null
                    })
                }
            })
        }
        // MOBILE DEVICES
        else {
            await Geolocation.getCurrentPosition({enableHighAccuracy: true}).then((coordinates) => {
                if (coordinates && coordinates.coords) {
                    gps = coordinates.coords
                    console.log('LOGGER: PHONE COORDS', coordinates)
                    app.$capacitor.gpsSetPosition({
                        lat: coordinates.coords.latitude,
                        lng: coordinates.coords.longitude,
                        speed: coordinates.coords.speed || null,
                        data: null
                    })
                }
            })
        }
        // GET BY IP
        // TODO: Need to tweak, because this might always run
        if (app.$config.getVisitorIP) {
            // ('$capacitor > getSetCurrentPosition > getVisitorLocationByIP')
            await app.$services.getVisitorLocationByIP().then(async (coordinates) => {
                app.$capacitor.gpsSetPosition({
                    lat: coordinates.latitude,
                    lng: coordinates.longitude,
                    speed: null,
                    data: coordinates
                })
            })
        }

        return gps
    },
    async gpsCheckPermissions () {
        // DESKTOP / WEB, When requesting location will auto pop-up with location

        // 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'
        try {
            const permission = await Geolocation.checkPermissions()
            if (permission.location === 'denied') {
                await Geolocation.requestPermissions()
                app.$notify.show({ text: app.i18n.t('notify.gps_permission_denied'), color: 'error' })
                return false
            }
            else if (permission.location === 'prompt' || permission.location === 'prompt-with-rationale') {
                await Geolocation.requestPermissions().catch((e) => {
                    // app.$notify.show({ text: app.i18n.t('notify.gps_permission_prompt'), color: 'error' })
                    app.$system.log({
                        comp: 'Capacitor',
                        msg: 'requestPermissions',
                        val: e
                    })
                })
                return false
            }
            else if (permission.location === 'granted') {
                // app.$notify.show({ text: 'Permission Location Success', color: 'green' })
                return true
            }
        } catch (e) {
            if ('UNIMPLEMENTED' === e.code) {
                // ... Don't record error
            } else {
                app.$system.log({
                    comp: 'Capacitor',
                    msg: 'gpsCheckPermissions',
                    val: e
                })
            }
            return false
        }
    },

    // Older GPS functions
    async getSetCurrentPosition () {
      try {
        let retCoordinates = {
          lat: null,
          lng: null,
          speed: null,
          data: null
        }
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true
        }).catch(() => {
          return false
        })
        if (coordinates) {
          // console.log('$capacitor > getSetCurrentPosition > coordinates', coordinates)
          retCoordinates = {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
            speed: coordinates.coords.speed
          }
        } else {
          // Most likely using this 1 time, don't want to burn through our API requests
          if (!store.state.user.gps.lat) {
              if(app.$config.getVisitorIP) {
                  // console.log('$capacitor > getSetCurrentPosition > getVisitorLocationByIP')
                  await app.$services.getVisitorLocationByIP().then(async (data) => {
                      retCoordinates = {
                          lat: data.latitude,
                          lng: data.longitude,
                          data: data
                      }
                  })
              }
          } else {
            retCoordinates = { ...store.state.user.gps }
          }
        }
        store.dispatch('user/updateGPS', retCoordinates)
        return retCoordinates
      } catch (e) {
        app.$system.log({
          comp: 'Capacitor',
          msg: 'getCurrentPosition',
          val: e
        })
        return false
      }
    },
    async watchPosition () {
      const info = await Device.getInfo()
      try {
        if (info && info.platform === 'web') {
          return this.getSetCurrentPosition()
        }
        watchCallbackId = await Geolocation.watchPosition({
          enableHighAccuracy: true
        }, (coordinates) => {
          // This log will load the database up so much, careful
          store.dispatch('user/updateGPS', {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
            speed: coordinates.coords.speed
          })
          return coordinates
        }).catch((e) => {
            app.$system.log({
                comp: 'Capacitor',
                msg: 'watchPosition',
                val: e
            })
        })
      } catch (e) {
        app.$system.log({
          comp: 'Capacitor',
          msg: 'watchPosition 2',
          val: e
        })
      }
    },
    async clearWatchPosition () {
      try {
        await Geolocation.clearWatch({ id: watchCallbackId })
      } catch (e) {
        app.$system.log({
          comp: 'Capacitor',
          msg: 'clearWatchPosition',
          val: e
        })
      }
    },
    async positionPermissions () {
      let hasPermission = false
      try {
        // 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'
        await Geolocation.checkPermissions()
          .then(async (permission) => {
              // Only request permissions if not granted
              console.log('STICKY: CHECK PERMISSIONS', permission.location)
              if (permission.location === 'denied') {
                  app.$notify.show({ text: app.i18n.t('gps_permission_denied'), color: 'error' })
              }
              if (permission.location !== 'granted') {
              const device = await Device.getInfo()

              // WEB
              if (device.platform === 'web') {
                navigator.geolocation.getCurrentPosition((coordinates) => {
                  store.dispatch('user/updateGPS', {
                    lat: coordinates.coords.latitude,
                    lng: coordinates.coords.longitude,
                    speed: coordinates.coords.speed
                  })
                })
                hasPermission = true
              } else {
                // DEVICES
                Geolocation.requestPermissions().then((p) => {
                  hasPermission = true
                  app.$system.log({
                    comp: 'Capacitor',
                    msg: 'requestPermissions',
                    val: p
                  })
                })
              }
            }
          }).catch((e) => {
            app.$system.log({
                comp: 'Capacitor',
                msg: 'positionPermissions',
                val: e
            })
            hasPermission = false
          })
      } catch (e) {
        app.$system.log({
          comp: 'Capacitor',
          msg: 'positionPermissions 2',
          val: e
        })
        hasPermission = false
      }
      console.log('STICKY: positionPermissions, ', hasPermission)
      return hasPermission
    },

    async share (data) {
      let payload = {
        title: 'MyShout',
        text: '',
        url: null,
        dialogTitle: 'Share With Your Friends'
      }
      payload = Object.assign(payload, data)
      try {
        await Share.share(payload)
      } catch (e) {
        app.$notify.show({
          text: 'Sorry, sharing is not available at the moment.',
          color: 'orange'
        })
        app.$system.log({
          comp: 'Capacitor',
          msg: 'share',
          val: e
        })
      }
    },

    // https://capacitorjs.com/docs/apis/device#deviceinfo
    async device () {
      try {
        /*const info = await Device.getInfo()
        console.log(`STICKY: Info, ${info.platform}`)
        console.log(`STICKY: navigator ${navigator.userAgent}`)*/
        return await Device.getInfo()
      } catch (e) {
        app.$system.log({
            comp: 'Capacitor',
            msg: 'device',
            val: e
        })
        return null
      }
    },

    // Notifications
    // Register with Apple / Google to receive push via APNS/FCM
    async pushNotificationsRequestAndRegisterPermissions () {
        try {
            const device = await this.device()

            // Mobile notifications
            if (device.platform !== 'web') {
                let permission = await PushNotifications.checkPermissions();
                if (permission.receive === 'prompt') {
                    permission = await PushNotifications.requestPermissions();
                }

                if (permission.receive === 'granted') {
                    await PushNotifications.register();
                    console.log("STICKY: REGISTERED")

                    await this.pushNotificationsListeners()
                    console.log('STICKY: NOTIFICATIONS > Mobile > True')

                    return true
                } else {
                    app.$system.log({
                        comp: 'Capacitor',
                        msg: 'pushNotificationsRequestAndRegisterPermissions > Permission',
                        val: permission
                    })
                    return false
                }
            }

            // Web notifications
            if (Notification) {
                // permission === 'granted'
                const permission = await Notification.requestPermission()

                if (permission === 'granted') {
                    await this.pushNotificationsGetToken()
                    await this.pushNotificationsListeners()
                    return true
                }
                console.log('STICKY: NOTIFICATIONS > Web > ', permission)
                return false
            }

        } catch (e) {
            app.$system.log({
                comp: 'Capacitor',
                msg: 'pushNotificationsRequestAndRegisterPermissions 3',
                val: e
            })
            return false
        }
    },
    // Token Type: web/mobile
    async pushNotificationsGetToken () {
        try {
          console.log("STICKY: pushNotificationsGetToken Start")
            if (app.$fire.messaging) {
                const token = await app.$fire.messaging.getToken({ vapidKey: app.$config.firebase.fcmPublicVapidKey })
                console.log('STICKY: pushNotificationsGetToken', token)

                app.$ttlStorage.set('notificationWebToken', token)
            }
        } catch (e) {
            app.$system.log({
                comp: 'Capacitor',
                msg: 'trying to get notification token',
                val: e
            })
        }
    },
    async pushNotificationsListeners () {
        try {
            const device = await this.device()
            // Mobile notifications
            if (device.platform !== 'web') {
              console.log("STICKY: Device is not WEB")
                // IOS DEVICES
                // Capacitor plugin does not return the proper FCM token
                if (device.platform === 'ios') {
                    await FCM.getToken().then(async(r) => {
                        console.log('STICKY FCM TOKEN: ', r.token)
                        await app.store.dispatch('user/updateField', {
                            notificationDeviceToken: r.token
                        })
                    }).catch((e) => {
                        app.$system.log({
                            comp: 'Capacitor',
                            msg: 'FCM Error',
                            val: e
                        })
                    });
                }
                // ANDROID DEVICES
                else {
                    await PushNotifications.addListener('registration', async (PushNotificationToken) => {
                        console.log("STICKY: Registration Listener attached.")
                        console.log("STICKY: Token is", PushNotificationToken)
                        if (PushNotificationToken && PushNotificationToken.value) {
                            // SAVE TOKEN
                            await app.store.dispatch('user/updateField', {
                                notificationDeviceToken: PushNotificationToken.value
                            })
                        }
                    }).catch((e) => {
                        app.$system.log({
                            comp: 'Capacitor',
                            msg: 'pushNotificationsListeners > registration',
                            val: e
                        })
                    })
                    await PushNotifications.addListener('registrationError', (error) => {
                        // TODO: try getting the token again?
                        app.$system.log({
                            comp: 'Capacitor',
                            msg: 'pushNotificationsListeners > registrationError',
                            val: JSON.stringify(error)
                        })
                    })
                }
                await PushNotifications.addListener('pushNotificationReceived', (notification) => {
                    // Default settings
                    const snack = {
                        title: notification.title,
                        text: notification.body,
                        color: 'blue',
                        timeout: 6000,
                        type: 'general',
                        id: null
                    }
                    // Override settings
                    if (notification.data && notification.data.goTo) {
                        snack.goTo = notification.data.goTo
                    }
                    if (notification.data && notification.data.id) {
                        snack.type = 'notification'
                        snack.id = notification.data.id
                    }
                    app.$notify.show(snack)
                })
                await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                    const data = notification.notification.data
                    if (notification.actionId === 'tap') {
                        store.dispatch('user/notifications/update', {
                            id: data.id,
                            seen: true,
                            actions: {
                                tap: true
                            }
                        })
                        if (data.goTo) {
                            setTimeout(() => {
                                app.router.push(data.goTo)
                            }, 1500)
                        }
                    }
                })
            }
            if (app.$fire.messaging) {
                console.log('STICKY: Start onMessage')
                app.$fire.messaging.onBackgroundMessage((payload) => {
                    console.log('STICKY: onBackgroundMessage', payload)
                })
                app.$fire.messaging.onMessage((payload) => {
                    console.log('STICKY: We have a message', payload)
                    const snack = {
                        title: payload.notification.title,
                        text: payload.notification.body,
                        color: payload.notification.body || 'blue'
                    }
                    if (payload.data && payload.data.goTo) {
                        snack.goTo = payload.data.goTo
                    }
                    app.$notify.show(snack)
                    app.$system.log({
                        comp: 'Capacitor',
                        msg: 'Message received',
                        val: payload
                    })
                })
            }
        } catch (e) {
            if(e.code !== 'messaging/only-available-in-sw') {
                app.$system.log({
                    comp: 'Capacitor',
                    msg: 'pushNotificationsListeners',
                    val: e
                })
            }
        }
    },
    async pushNotificationsRemoveListeners () {
        try {
            await PushNotifications.removeAllListeners()
        } catch {
            // ..
        }
    },
    async pushNotificationsRemoveAllNotifications() {
        try {
            await PushNotifications.removeAllDeliveredNotifications()
            // Clear the badge bubble on the app
            await Badge.clear()
        } catch {
            // ..
        }
    },
    async pushNotificationsSetBadge(count) {
        await Badge.set({ count })
    },
    async pushNotificationsClearBadge() {
        await Badge.clear()
    },

    // Camera
    // Will return a URL of the path we can use to upload
    async cameraTakePicture (allowEditing = true) {
        const cameraOptions = {
            quality: 90,
            allowEditing: allowEditing,
            resultType: CameraResultType.Base64,
        }
        const image = await Camera.getPhoto(cameraOptions)
        return image.base64String
    },

    // Microphone
      /**
       * https://github.com/tchvu3/capacitor-voice-recorder
       * android/ios - audio/aac,
       * chrome/firefox - audio/webm;codecs=opus
       * safari - audio/mp4
       */
    async microphonePermissions () {
        VoiceRecorder.hasAudioRecordingPermission().then((result) => {
            console.log('STICKY: MICROPHONE', result.value)
            if (false === result.value) {
                VoiceRecorder.requestAudioRecordingPermission()
            }
        }).catch(() => {
            // ...
        })
    },
    async microphoneStart () {
        await this.microphoneStop()
        return await VoiceRecorder.startRecording()
            .then((result) => {
                console.log('STICKY: STARTED RECORDING')
                return result.value
            })
            .catch(e => {
                app.$system.log({
                    comp: 'Capacitor',
                    msg: 'microphoneStart',
                    val: e
                })
                return false
            })
    },
    async microphoneStop () {
        try {
            const status = await VoiceRecorder.getCurrentStatus()
            if (status.status !== 'RECORDING') {
                return false
            }
            return await VoiceRecorder.stopRecording()
                .then((result) => {
                    return result.value
                })
                .catch(e => {
                    console.log('STOP RECORDING ERROR: ', e)
                    app.$system.log({
                        comp: 'Capacitor',
                        msg: 'microphoneStop',
                        val: e
                    })
                    return false
                })
        } catch (e) {
            console.log('Error stopping', e)
            return false
        }
    }
  })
}
