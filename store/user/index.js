import lodash from 'lodash'
import Vue from 'vue'
import { reactive, watchEffect } from '@nuxtjs/composition-api'
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
      created_at: null,
      device: null,
      onboarded: 8,
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
      notifications: {
        message: 0,
        alert: 0,
        checkIn: 0,
        friendRequest: 0
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

function createInitial (data) {
    if (data && data.username && data.initial.length > 0) {
        return data.username.charAt(0).toUpperCase()
    } else if (data && data.first_name && data.first_name.length > 0) {
        return data.first_name.charAt(0).toUpperCase()
    } else if (data && data.email && data.email.length > 0) {
        return data.email.charAt(0).toUpperCase()
    }
    return 'A'
}


export const state = () => reactive({
  all: [],
  profile: new User({}).fields,
  data: {},
  gps: {}, // Used for position GPS
  one: new User({}).fields,
  loaded: {},
  authStateLoaded: false,
  hasOnboarded: false
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
    if (state.profile.email) return true
    else if (state.data.uid) return true
    else if (state.data && state.data.role && state.data.role.isAnonymous) return false
    else if (state.data && state.data.isReset) return false
    else if (!state.data) return false
    return false
  },
  authStateLoaded: async () => {
    /* while (state.authStateLoaded === false) {
        console.info(`%c🔐authStateLoaded, ${state.authStateLoaded}`)
        await new Promise(resolve => setTimeout(resolve, 250))
    } */
    return true
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
  SET_KEY: (state, { key, value }) => {
    if (!key) return
    Vue.set(state, key, value)
  },
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
    Vue.set(state, 'gps', gps)
  },
  SET_PROFILE_FIELD: (state, value) => {
    state.profile = Object.assign(state.profile, value)
    const key = Object.keys(value)[0]
    const v = value[key]

    Vue.set(state, `profile.${key}`, v)
  },
  SET_HAS_NOTIFICATIONS: (_, value) => {
    if( typeof value === 'undefined' ) return false

    if( typeof value === 'object' ) {
        // ...
    }

    if( typeof value === 'boolean' ) {
        console.log('SET_HAS_NOTIFICATIONS', value)
        // state.has.notifications = value
        //lodash.set(state.profile.has, 'notifications', value)
        //Vue.set(state.profile.has, 'notifications', value)

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
    Vue.set(state, 'profile', combineUserProfile)

    if (userProfile?.first_name) {
      Vue.set(state.profile, 'initial', createInitial(userProfile))
    }
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
      if (!authUser) return

      const {
        uid,
        email,
        phoneNumber,
        emailVerified,
        photoURL
      } = authUser

      state.data.id = uid
      state.data.uid = uid
      state.data.email = email || null
      state.data.emailVerified = emailVerified
      state.data.phone = phoneNumber || null
      state.data.photoURL = photoURL || null
      state.data.customer = claims.customer
      state.data.admin = claims.admin
      state.data.role = { ...claims }
      state.data.isAnonymous = false

      state.profile.id = uid
      state.profile.email = email
      state.profile.phone = phoneNumber
      state.profile.emailVerified = emailVerified
      state.profile.photoURL = photoURL || null
      state.profile.initial = createInitial(state.profile)
      state.profile.role = { ...claims }
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
      return await this.$db.save(`${dbRootPath}/${id}`, data)
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
          const response = await this.$db.save(`${dbRootPath}/${userId}`, data)
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
      const response = await this.$db.save(`${dbRootPath}/${userId}`, data)
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
    //const response = await this.$db.get_one(`${dbRootPath}/${id}`)
    const response = await this.$db.get(`${dbRootPath}/${id}`)
    if (response) {
      //await commit('SET_HAS_NOTIFICATIONS', { ...response })
      await commit('SET_USER_PROFILE_INIT', { ...response })
    }
    return response
  },
  async listen({ commit, dispatch, rootState, state }, id) {
      try {
        if(id) {
            // state.authStateLoaded = false
            const userListener = await this.$db.listen(`Users/${id}`, {where:null})

            // Making adjustment to watcher
            watchEffect(async () => {
                if (rootState.listeners[`Users/${id}`]) {
                    await commit('SET_USER_PROFILE_INIT', {...rootState.listeners[`Users/${id}`]})

                    setTimeout(async () => {
                        await dispatch("checkUserData")
                        console.log('🔐Auth state should be loaded now')
                        state.authStateLoaded = true
                    }, 1000)
                } else {
                    console.log('STICKY: User / Listener / Could not find users listener: ', id)
                }
            })
            return userListener

        } else {
            console.log('STICKY: User / Listener / No userId to listen to')
            console.log('LISTENERS:', rootState.listeners)
        }
      } catch(e) {
          console.log('STICKY: User / Listener / Error listening to user:', e)
          console.log('LISTENERS:', rootState.listeners)
      }
  },
  async checkUserData ({ state }) {
    if (window.location.pathname === '/auth') return;
    if (state.profile.onboarded===null || state.profile.onboarded===undefined || state.profile.onboarded < 8 ) {
        return this.$router.push('/auth/setup-profile')
    } else {
        state.hasOnboarded = true
    }
  },
  async getAll ({ commit, rootState }, { where = {}, limit = 20, order = {}, uid = null }) {
    uid = uid || rootState.user.data.uid
    if (uid) {
        let response = await this.$db.get(`${dbRootPath}`, where, dataConverter, order, limit)
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

      // const one = await this.$db.get(`${dbRootPath}/${id}`, dataConverter)
      const one = await this.$db.get(`${dbRootPath}/${id}`)
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
        return await this.$db.fire().fs
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
        this.$system.log({ comp: 'store/user', msg: 'joinUser', val: e })
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
    if (!authUser) {
        return await dispatch('signOut')
    }

    try {
      await this.$storage.setUniversal('uid', authUser.uid)
    } catch (e) {
      console.log('onAuthStateChanged > getIdToken:', e)
    }

    // Set some local storage
    await this.$storage.setUniversal('uid', authUser.uid)
    await this.$storage.setUniversal('claims', claims)

    // Mutation of user when state is ready
    // Basically just sets the profile
    await commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })

    // Start listeners
    await dispatch('listen', authUser.uid)
    await dispatch('notifications/listen', { root:true })

    // User is ready
    console.info(`👤User: ${authUser.uid}`)
  },
  async setUserProfile ({ dispatch }, authUserUid) {
    if (authUserUid) {
        await dispatch('listen', authUserUid)
        await dispatch('notifications/listen', { root:true })
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
  async signOut ({ commit, rootState }) {
      try {
          commit('RESET_STORE')
          this.$storage.setUniversal('uid', null)
          // rootState.appLoading = true
          rootState.isAppInit = false

          await this.$db.fire().signOut(this.$db.fire().auth)
          await this.$db.fire().capAuth.signOut()

          await this.$router.push('/auth/')

      } catch (e) {
          this.$system.log({ comp: 'store/user', msg: 'signOut', val: e })
      }
  }
}
