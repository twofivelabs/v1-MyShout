import lodash from 'lodash'
// import { defineCustomElements } from '@stripe-elements/stripe-elements/loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyBAD2Twrykrl6E3PmuTRMFkIuDc_hWaBFc'
const ABSTRACT_API_KEY = '1d389e652459454083cd4ba089cc12da'

/*defineCustomElements(window).then(() => {
  // ...
})*/

export default ({
  $axios,
  app,
  store
}, inject) => {
  inject('services', {
    /* getSetUserLocation () {
      // Set GPS LAT/LNG through GPS
      app.$capacitor.watchPosition().then((coordinates) => {
        store.dispatch('user/updateGPS', {
          lat: coordinates.lat,
          lng: coordinates.lng
        })
        if (coordinates.data) {
          this.updateUserMeta(coordinates.data)
        }
      }).catch((e) => {
        app.$system.log({
          comp: 'Services',
          msg: 'getSetUserLocation',
          val: e
        })
      })
    }, */
    async getSetUserGeneralLocation () {
      // If we don't have a user postal/city for shipping calculations
      if (!app.$config.reverseGeocode) {
        return
      }
      if (!store.state.user.profile || !store.state.user.profile.location || !store.state.user.profile.location.postal) {
        if (store.state.user.gps.lat && store.state.user.gps.lng) {
          const res = await this.reverseGeocode(store.state.user.gps.lat, store.state.user.gps.lng)
          if (res) {
            // Update user so we can better serve them
            store.dispatch('user/updateField', {
              location: {
                country: res.country,
                province: res.administrative_area_level_1,
                city: res.locality,
                postal: res.postal_code,
                lat: store.state.user.gps.lat,
                lng: store.state.user.gps.lng
              }
            })
          }
        }
      }
    },
    async getVisitorLocationByIP () {
      return await $axios.$get(`/geolocation/?api_key=${ABSTRACT_API_KEY}`)
        .then((res) => {
          return res
        })
        .catch((e) => {
          app.$system.log({ comp: 'Services', msg: 'getVisitorLocationByIP', val: e })
          return false
        })
    },
    async searchAddress (val = null) {
      try {
        return await $axios.$get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${val}&inputtype=textquery&fields=formatted_address&key=${GOOGLE_MAPS_API_KEY}`)
      } catch (e) {
        app.$system.log({ comp: 'Services', msg: 'searchAddress', val: e })
      }
    },
    /** FIREBASE CALLABLE FUNCTION */
    async reverseGeocode (lat, lng) {
        const responseFunc = app.$fire.functions.httpsCallable('Location-reverseGeocode')
        const reverse = await responseFunc({
            lat,
            lng
        })
        let res = {}
// console.log('STICKY: reverseGeocode', reverse)

        if (reverse && reverse.data) {
            const comp = lodash.chain(reverse.data.results[0].address_components)
                .keyBy('types[0]')
                .mapValues('short_name')
                .value()
            res = {
                country: comp.country,
                province: comp.administrative_area_level_1,
                city: comp.locality,
                postal: comp.postal_code,
            }
        }

        if (!res.city || !res.country) {
            return null
        }
        return res
    },

    /**
     * MyShout Alert Button
     * Type: 'accident', 'kidnapping', 'robbery', 'shout'
     * User: object
     */
    async alertButton (type=null, data={}) {
      const responseFunc = app.$fire.functions.httpsCallable('AlertButtons-sendAlert')
      const res = await responseFunc({
            type,
            data
      })
      console.log('ALERT BUTTON RESPONSE FROM FB', res)
      return res
    },

      /**
       * MyShout Update GPS VIA HTTP method
       * User: object
       * GPS: object
       */
    async restUpdateGPS (gps={}) {
          if (!gps || !gps.lat || !gps.lng) return console.log('STICKY: no gps data')

          await app.$db.fire().capAuth?.getIdToken()
          const user = app.$fire.auth.currentUser
          const userToken = user ? await user.getIdTokenResult() : false

          if (!userToken.token) return console.log('STICKY: no user token available')
          console.log('STICKY: UserTokenClaims:', userToken.claims.user_id)
          const responseFunc = app.$fire.functions.httpsCallable('Rest-updateGPS')
          //const responseFunc = app.$fire.functions.httpsCallable('REST-getLocationByIP')
          const payload = {
              userId: userToken.claims.user_id,
              gps
          }
          console.log('STICKY: restUpdateGPS PAYLOAD', payload)
          const res = await responseFunc(payload)
          console.log('STICKY: RES BUTTON RESPONSE FROM FB', res)
          return res
    },
    /**
    * Twilio Send SMS
    * body: data.body,
    * to: data.phone,
    */
    async sendSMS (data={}) {
      console.log('SEND SMS', JSON.stringify(data))
      const responseFunc = app.$fire.functions.httpsCallable('Twilio-sendSMS')
      const res = await responseFunc({
          data
      })
      console.log('sendSMS RESPONSE FROM FB', res)
      return res
    },
    /**
    * Twilio Send SMS
    * to: data.phone,
    */
    async getPhoneNumber (data={}) {
      console.log('SEND SMS', JSON.stringify(data))
      const responseFunc = app.$fire.functions.httpsCallable('Twilio-getPhoneNumber')
      const res = await responseFunc({
          data
      })
      console.log('getPhoneNumber RESPONSE FROM FB', res)
      return res
    },

    /** STRIPE FUNCTIONS */
    async subscriber (data) {
      const subscribeUser = app.$fire.functions.httpsCallable('MailerLite-subscribeUser')
      return await subscribeUser(data)
    },
    /*async sendStripeTransfers (userId, orderId) {
      const responseFunc = app.$fire.functions.httpsCallable('StripeWebhooks-sendStripeTransfers')
      return await responseFunc({
        userId: userId,
        orderId: orderId
      })
    },
    async stripeCreatePaymentIntent (data) {
      const responseFunc = app.$fire.functions.httpsCallable('StripeWebhooks-stripeCreatePaymentIntent')
      return await responseFunc(data)
    },
    async stripeCreateCustomer (customer) {
      const responseFunc = app.$fire.functions.httpsCallable('StripeWebhooks-createCustomer')
      return await responseFunc(customer)
    },
    async stripeCreateCustomerEphemeralKeys (customerId) {
      const responseFunc = app.$fire.functions.httpsCallable('StripeWebhooks-createCustomerEphemeralKeys')
      return await responseFunc(customerId)
    },
*/
    updateUserMeta (data) {
      if (data) {
        const meta = {
          location: {
            city: data.city,
            country: data.country,
            postal: data.postal_code,
            province: data.region_iso_code,
            lat: data.latitude,
            lng: data.longitude
          },
          ip: data.ip_address
        }
        // console.log('UPDATE USER META LOCATION', meta)
        store.dispatch('user/updateField', meta)
      }
    }
  })
}
