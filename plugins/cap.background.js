// https://github.com/transistorsoft/capacitor-background-fetch#installing-the-plugin
import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
import { Device } from '@capacitor/device'

export default {
    async background_init() {
        const device = await Device.getInfo()

        // DESKTOP / WEBSITES
        if (device.platform === 'web') {
            console.log('STICKY: Background, not available on web')
            return
        }

        console.log('STICKY:BACKGROUND init')

        const status = await BackgroundFetch.configure({
            minimumFetchInterval: 15
        }, async (taskId) => {
            console.log('STICKY: [BackgroundFetch] EVENT:', taskId);
            // Perform your work in an awaited Promise

            const result = await this.background_geoLocation();

            console.log('STICKY: [BackgroundFetch] work complete:', result);
            // [REQUIRED] Signal to the OS that your work is complete.
            BackgroundFetch.finish(taskId);

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
                console.log('STICKY:BACKGROUND Status === DENIED')
                alert('The user explicitly disabled background behavior for this app or for the whole system.');
            } else if (status === BackgroundFetch.STATUS_RESTRICTED) {
                console.log('STICKY:BACKGROUND Status === RESTRICTED')
                alert('Background updates are unavailable and the user cannot enable them again.')
            }
        }

    },

    async background_geoLocation() {
        // do background stuff
        return new Promise((resolve, reject) => {
            console.log('STICKY: DO BACKGROUND TASK')
            //console.log('STICKY: BACKGROUND gpsBackgroundPosition')
            //window.$nuxt.context.$capacitor.gpsBackgroundPosition()
            //console.log('STICKY: BACKGROUND gpsGetCurrentPosition')
            // const currentGPS = window.$nuxt.context.$capacitor.gpsGetCurrentPosition()

            const currentGPS = new Promise((resolve, reject) => {
                return window.$nuxt.context.$capacitor.gpsGetCurrentPosition().then(gps => {
                    console.log('STICKY: BACKGROUND INSIDE', currentGPS, JSON.stringify(currentGPS))

                    resolve(gps)
                }).catch(e => {
                    reject('STICKY: BACKGROUND CURRENT POSITION', e, JSON.stringify(e))
                })
            })

            console.log('STICKY: BACKGROUND store', currentGPS, JSON.stringify(currentGPS))
            return window.$nuxt.context.$capacitor.updateLoggedInUsersGPS({
                lat: 55.555555,
                lng: -111.111111
            }).then((e) => {
                console.log('STICKY: BACKGROUND store success', e, JSON.stringify(e))
                resolve(true)
            }).catch(e => {
                console.log('STICKY: BACKGROUND store error', e, JSON.stringify(e))
                reject(e)
            })
            /*window.$nuxt.context.store.dispatch('user/updateGPS', {
                lat: 55.555555,
                lng: -111.111111,
                speed: null,
                data: null
            })*/
        });

    }
}
