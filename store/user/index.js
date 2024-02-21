import lodash from 'lodash'
import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import { geohashForLocation } from 'geofire-common'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import {Badge} from '@capawesome/capacitor-badge'

const dbRootPath = 'Users'

class User extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      email: null,
      password: null,
      initial: null,
      first_name: null,
      last_name: null,
      username: null,
      phone: null,
      badges: [],
      location: {
        address_1: null,
        address_2: null,
        city: null,
        country: null,
        postal: null,
        province: null
      },
      role: {
        isAdmin: false,
        isActive: true,
        isCustomer: null,
        isAnonymous: null,
        isVendor: false,
        isDriver: false,
        companyId: null
      },
      permissions: {
        notifications: true,
        location: false,
        shareLocationWithFriends: true
      },
      has: {
        notifications: false,
        messages: false
      },
      notifcations: {
        messages: 0,
        alerts: 0,
        request: 0
      },
      gps: {
        lat: null,
        lng: null
      },
      photoURL: null,
      notificationWebToken: null,
      notificationDeviceToken: null,
      isOnline: {
          status: 'offline'
      },
      stripeCustomerId: null,
      securityPin: null
    }
    return this
  }

  write () {
    if (this.fields.first_name) {
      this.fields.initial = this.fields.first_name.charAt(0).toUpperCase()
    } else if (this.fields.email) {
      this.fields.initial = this.fields.email.charAt(0).toUpperCase()
    } else if (this.fields.username) {
      this.fields.initial = this.fields.username.charAt(0).toUpperCase()
    }

    try {
      this.fields.location.province = this.location.province.toUpperCase()
    } catch {
      // ...
    }

    if (!this.fields.email) {
      delete this.fields.email
      delete this.fields.password
    }

    // Save phone valid SMS
    if (this.fields.phone) {
        this.fields.phone = this.formatPhone(this.fields.phone)
    }

    return this
  }

  read () {
    if (!this.fields.initial) {
      if(this.fields.username) {
          this.fields.initial = this.fields.username.charAt(0).toUpperCase()
      } else {
        this.fields.initial = 'A'
      }
    }

    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new User(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new User(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  profile: new User({}).fields,
  data: {},
  gps: {}, // Used for position GPS
  one: new User({}).fields,
  loaded: {},
})

export const getters = {
  all: (state) => {
    try {
        return state.all
    } catch {
        return false
    }
  },
  isLoggedIn: (state) => {
    try {
      return state.data.uid && state.data.uid.length > 1
    } catch {
      return false
    }
  },
  userId: (state) => {
    try {
      return state.data.uid
    } catch {
      return false
    }
  },
  user: (state) => {
    try {
      return state.data
    } catch {
      return false
    }
  },
  profile: (state) => {
    try {
      return state.profile
    } catch {
      return false
    }
  },
  gps: (state) => {
    try {
      return state.gps
    } catch {
      return false
    }
  },
  one: (state) => {
    try {
      return state.one
    } catch {
      return false
    }
  },
  loaded: state => (id) => {
    try {
      if (id && state.loaded[id]) {
        return state.loaded[id]
      }
      return {}
    } catch {
      return {}
    }
  },
  hasNotificatoins: () => {
    //..
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    state.data = {}
    state.profile = new User({}).fields
    state.gps = {}
  },
  SET_ALL: (state, data) => {
    state.all = data
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  SET_GPS: (state, gps) => {
    state.gps = gps
    // Vue.set(state, 'gps', gps)
  },
  SET_PROFILE_FIELD: (state, value) => {
    state.profile = Object.assign(state.profile, value)
    const key = Object.keys(value)[0]
    const v = value[key]
    // console.log('VALUE', key)
    // console.log('SET PROFILE FIELD', key, v, JSON.stringify(value) )
    // Vue.set(state, `profile.${key}`, value)
    Vue.set(state, `profile.${key}`, v)
    // console.log('PROFILE', state.profile)
    // state.profile = Object.assign(state.profile, value)
  },
  SET_HAS_NOTIFICATIONS: (state, value) => {
    if( typeof value === 'undefined' ) return false

    if( typeof value === 'object' ) {
        // ...
    }

    if( typeof value === 'boolean' ) {
        console.log('SET_HAS_NOTIFICATIONS', value)
        // state.has.notifications = value
        lodash.set(state.profile.has, 'notifications', value)
        Vue.set(state.profile.has, 'notifications', value)
        //console.log('USER STATE', state)

        if (value === true) {
            const count = 1
            Badge.set({ count })
        } else {
            Badge.clear()
        }
    }
  },
  SET_AUTH_USER: (state, { authUser, claims }) => {
    state.data = {
      uid: authUser.uid,
      email: authUser.email,
      phoneNumber: authUser.phoneNumber || null,
      photoURL: authUser.photoURL || null,
      customer: claims.customer,
      admin: claims.admin,
      role: { ...claims }
    }
    if (state.profile.first_name) {
      state.profile.initial = state.profile.first_name.charAt(0).toUpperCase()
    } else if (authUser.email) {
      state.profile.initial = authUser.email.charAt(0).toUpperCase()
    } else {
      state.data.isAnonymous = true
      state.profile.initial = 'A'
    }
  },
  SET_USER_PROFILE_INIT: async (state, userProfile) => {
    const combineUserProfile = Object.assign(state.profile, userProfile)

    if (!lodash.has(state.profile, 'has.messages')) {
        console.log('STICKY: USER > no hasMessages')
        //lodash.set(state.profile, 'has.messages', false)
        //Vue.set(state.profile, 'has.messages', false)
    }
    if (!lodash.has(state.profile, 'has.notifications')) {
        lodash.set(state.profile, 'has.notifications', false)
        Vue.set(state.profile, 'has.notifications', false)
    }

    Vue.set(state, 'profile', combineUserProfile)

    if (userProfile?.first_name) {
      Vue.set(state.profile, 'initial', userProfile.first_name.charAt(0).toUpperCase())
    }
  },

  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // NO USER
    } else {
      const {
        uid,
        email,
        phoneNumber,
        emailVerified,
        photoURL
      } = authUser
      state.data = {
        uid,
        email,
        phone: phoneNumber || null,
        photoURL: photoURL || null,
        customer: claims.customer,
        admin: claims.admin,
        role: { ...claims },
        emailVerified
      }
      state.profile.email = email
      state.profile.phone = phoneNumber
      state.profile.emailVerified = emailVerified
      state.profile.photoURL = photoURL || null
      if (state.profile.first_name && state.profile.first_name.length > 0) {
        state.profile.initial = state.profile.first_name.charAt(0).toUpperCase()
      } else if (email && email.length > 0) {
        state.profile.initial = email.charAt(0).toUpperCase()
      } else {
        if(!state.profile.initial || state.profile.initial.length <= 0) {
            if(state.profile.username && state.profile.initial.length >= 1) {
                state.profile.initial = state.profile.username.charAt(0).toUpperCase()
            }
        }
        state.data.isAnonymous = true
        state.profile.initial = 'A'
      }
    }
  }
}

export const actions = {
  async search (_, { term, field = 'type', operator = '==', limit = null }) {
    return await this.$db.search_collection({
        path: `${dbRootPath}`,
        term,
        field,
        operator,
        limit
    }, dataConverter)
  },
  async add (_, data, id = null) {
    if (!id) {
      id = data.id
    }
    if (id) {
      return await this.$db.update(`${dbRootPath}/${id}`, dataConverter, data)
    }
  },
  async update ({ getters, commit }, data) {
      let userId = getters.userId
      if (data.uid) {
          userId = data.uid
      } else if (data.id) {
          userId = data.id
      }
      if (userId && this.$db) {
          const response = await this.$db.update(`${dbRootPath}/${userId}`, dataConverter, data)
          if (response) {
            await commit('SET_USER_PROFILE_INIT', data)
          }
        return response
      }
  },
  async updateField ({ getters, commit }, data) {
    let userId = getters.userId
    if (data.uid) {
        userId = data.uid
    } else if (data.id) {
        userId = data.id
    }

    if (userId && this.$db) {
      const response = await this.$db.update(`${dbRootPath}/${userId}`, null, data)
      if (response) {
        await commit('SET_PROFILE_FIELD', data)
      }
      return response
    }
  },
  async updateGPS ({ state, commit, dispatch }, data) {
    if (data && (data.lat && data.lng)) {
      if ((state.gps.lat === data.lat) && (state.gps.lng === data.lng)) {
        console.log('STICKY: User has not moved', data.lat, data.lng)
      } else {
        // GET CITY FOR LOCATION
        let city = null
        if (this.$config.reverseGeocode) {
          // eslint-disable-next-line no-unused-vars
          city = await this.$services.reverseGeocode(data.lat, data.lng).then((res) => {
            const comp = lodash.chain(res.data.results[0].address_components)
                .keyBy('types[0]')
                .mapValues('short_name')
                .value()
            return comp.locality
          }).catch(() => {
            // ...
          })
        }
        // eslint-disable-next-line no-unused-vars
        const hash = geohashForLocation([data.lat, data.lng])
        const current_date = new Date()

        commit('SET_GPS', {
          lat: data.lat,
          lng: data.lng,
          geoHash: hash,
          city: city,
          updated_at: current_date
        })
        dispatch('updateField', {
          gps: {
            lat: data.lat,
            lng: data.lng,
            geoHash: hash,
            city: city,
            updated_at: current_date
          }
        })
      }
    }
  },
  async get ({ getters, commit }, id = null) {
    if (!id) {
      id = getters.userId
    }
    const response = await this.$db.get_one(`${dbRootPath}/${id}`)
    if (response) {
      //await commit('SET_HAS_NOTIFICATIONS', { ...response })
      await commit('SET_USER_PROFILE_INIT', { ...response })
    }
    return response
  },
  async listen({ commit, dispatch }, id) {
      try {
        if(id) {
          return this.$fire.firestore
              .doc(`Users/${id}`)
              .onSnapshot(async (doc) => {
                if (doc.exists) {
                  const data = doc.data()
                  data.id = doc.id
                  await commit('SET_USER_PROFILE_INIT', {...data})
                  await dispatch("checkUserData")

                }
              })
        }
      } catch {
          console.log('Error listening to user')
      }
  },
  async checkUserData ({ state }) {
    if (window.location.pathname !== '/auth' && (state.profile && state.profile.role.isActive)) {
      // CHECK IS USERNAME IS AVAILABLE
      if (state.profile.username===null || state.profile.username===undefined || state.profile.username.length === 0) {
        // Make sure were not on the page we are redirecting to [could cause loop]
        return this.$router.push('/auth/setup-profile')
      } else if (state.profile.email===null || state.profile.email===undefined || state.profile.email.length === 0) {
        // Make sure were not on the page we are redirecting to [could cause loop]
        return this.$router.push('/auth/setup-profile')
      }
    }
  },
  async getAll ({ commit, rootState }, { where = {}, limit = 20, order = {}, uid = null }) {
    uid = uid || rootState.user.data.uid
    if (uid) {
        let response = await this.$db.get_all(`${dbRootPath}`, where, dataConverter, order, limit)
        if (response) {
            commit('SET_ALL', response)
        }
        return response
    }
  },
  async getOne ({ state, commit, rootState }, id) {
    try {
      if (state.loaded && state.loaded[id]) {
        // await commit('SET_ONE', state.loaded[id])
        // return state.loaded[id]
      }
      const uid = id || rootState.user.data.uid
      if (!uid) { return }

      const one = await this.$db.get_one(`${dbRootPath}/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/user',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async joinUser({ commit }, user) {
    try {
        const uid = (user && user.id) ? user.id : user
        return await this.$fire.firestore
            .doc(`${dbRootPath}/${uid}`)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data()
                    const assignedData = Object.assign(lodash.cloneDeep(user), lodash.cloneDeep(data))
                    commit('PUSH_TO_LOADED', assignedData)
                    return assignedData
                }
            })
    } catch (e) {
        this.$system.log({
          comp: 'store/user',
          msg: 'joinUser',
          val: e
        })
        return false
    }
  },
  /**
   * When the Firebase auth changes
   * @param commit
   * @param dispatch
   * @param authUser
   * @param claims
   * @returns {Promise<void>}
   */
  async onAuthStateChanged ({ commit, dispatch }, { authUser, claims }) {
    console.log("AUTH:", authUser)
    if (!authUser) {
      await dispatch('noUserCleanUp')
      return
    }

    try {
      await this.$storage.setUniversal('uid', authUser.uid)
    } catch (e) {
      this.$system.log({
        comp: 'store/user',
        msg: 'onAuthStateChanged > getIdToken',
        val: e
      })
    }
    // await commit('SET_AUTH_USER', { authUser, claims })
    await commit('ON_AUTH_STATE_CHANGED_MUTATION', {
      authUser,
      claims
    })

    await dispatch('setUserProfile', authUser.uid)
  },
  async setUserProfile ({ dispatch }, authUserUid) {
    if (authUserUid) {
      //if (this.$db) { // This was stopping things from working....
        // await dispatch('get', authUserUid)
        await dispatch('listen', authUserUid)
        //await dispatch('cart/getCurrent', authUserUid, { root: true })
        //await dispatch('user/favourites/getAll', authUserUid, { root: true })
        //await dispatch('user/tagging/getAll', authUserUid, { root: true })
        //await dispatch('user/notifications/getAll', {}, { root: true })
        await dispatch('user/notifications/listen', null, { root:true })
      //}
    }
  },
  async noUserCleanUp ({ commit }) {
    await commit('RESET_STORE')
    this.$storage.setUniversal('uid', null)
  },
  /**
   * Sign user out
   * @returns {Promise<void>}
   */
  async signOut ({ dispatch }) {
    try {
      await this.$fire
        .auth
        .signOut()
        .then(() => {
          dispatch('noUserCleanUp')
          this.$router.push('/auth/')
        })
    } catch (e) {
      this.$system.log({
        comp: 'store/user',
        msg: 'signOut',
        val: e
      })
    }
  },
  async setHas ({ dispatch }, data) {
    if (data.type === 'notifications') {
      //commit('SET_HAS_NOTIFICATIONS', data.value)
      dispatch('updateField', {
        has: {
          notifications: data.value
        }
      })
      if (data.value === false) {
        this.$capacitor.pushNotificationsRemoveAllNotifications()
      }
    }
  }
}
