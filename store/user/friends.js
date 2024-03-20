import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import Vue from "vue";
import lodash from 'lodash'

const dbRootPath = 'Friends'

class Friends extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      id: '',
      isEmergency: false,
      status: 'pending'
    }
    return this
  }

  write () {
    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Friends(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Friends(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Friends({}).fields,
  one: new Friends({}).fields,
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
}

export const mutations = {
  SET_ALL: (state, data) => {
    state.all = data
  },
  PUSH_TO_ALL: (state, data) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.id === data.id)
    if (indexOfMatchingSlug > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      Vue.set(state.all, indexOfMatchingSlug, data)
      return
    }
    state.all.push(data)
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
    Vue.set(state.loaded, data.id, data)
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  REMOVE_ONE: (state, slug) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.slug === slug)
    if (indexOfMatchingSlug > -1) {
      state.all.splice(indexOfMatchingSlug, 1)
      return true
    }
    return false
  },
}

export const actions = {
  async search ({ rootState }, { term, field = 'type', operator = '==', limit = null }) {
    const uid = rootState.user.data.uid
    return await this.$db.search_collection({
      path: `Users/${uid}/${dbRootPath}`,
      term,
      field,
      operator,
      limit
    }, dataConverter)
  },
  async add ({ commit, rootState }, data) {
    const uid = rootState.user.data.uid
    if (uid) {
      //const response = await this.$db.update(`Users/${uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      const response = await this.$db.save(`Users/${uid}/${dbRootPath}/${data.id}`, data)
      if (response) {
        await commit('SET_ALL', data)
        await commit('PUSH_TO_LOADED', data)
      }
      return response
    }
  },
  async update ({ commit, rootState }, data) {
    const uid = (data.uid) ? data.uid : rootState.user.data.uid
    if (uid && data.id) {
      //const response = await this.$db.update(`Users/${uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      const response = await this.$db.save(`Users/${uid}/${dbRootPath}/${data.id}`, data)
      if (response) {
        await commit('PUSH_TO_LOADED', data)
      }
      return response
    }
  },
  async updateField ({ rootState }, data) {
      const uid = rootState.user.data.uid
      if (uid && data.id) {
        // const response = await this.$db.update(`Users/${uid}/${dbRootPath}`, null, data)
        const response = await this.$db.save(`Users/${uid}/${dbRootPath}/${data.id}`, data)
        if (response) {
            // await commit('SET_PROFILE_FIELD', data)
      }
      return response
    }
  },
  async getAll ({ commit, dispatch, rootState }, {
      where = {},
      limit = 20,
      order = {},
      uid = null
  }) {
    uid = uid || rootState.user.data.uid
    if (uid) {
      let response = await this.$db.get(`Users/${uid}/${dbRootPath}`, {
          where, dataConverter, order, limit
      })
      if (response) {
          commit('SET_ALL', response)
          // GET THE USER DETAILS
          for (const k in response) {
              response[k] = await dispatch('joinUser', response[k])
          }
      }
      return response
    }
  },
  async getOne ({ state, commit, rootState }, data) {
    try {
      if (state.loaded && state.loaded[data.id]) {
        // await commit('SET_ONE', state.loaded[id])
        // return state.loaded[id]
      }
      const uid = data.userId || rootState.user.data.uid
      if (!uid) { return }
      // const one = await this.$db.get_one(`Users/${uid}/${dbRootPath}/${data.id}`, dataConverter)
      const one = await this.$db.get_one(`Users/${uid}/${dbRootPath}/${data.id}`)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/friends',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAccess ({ rootState }, data) {
    try {
        const uid = data.userId || rootState.user.data.uid
        if (!uid) { return }
        //console.log('FRIEND ACCESS', `Users/${data.id}/${dbRootPath}/${uid}`)
        //return await this.$db.get_one(`Users/${uid}/${dbRootPath}/${data.id}`, dataConverter)
        return await this.$db.get(`Users/${data.id}/${dbRootPath}/${uid}`)
    } catch (e) {
        this.$system.log({ comp: 'store/friends', msg: 'getAccess', val: e })
        return false
    }
  },
  async getMyAccess ({ rootState }, data) {
    try {
        const uid = data.userId || rootState.user.data.uid
        if (!uid) { return }
        // console.log('FRIEND My ACCESS', `Users/${data.id}/${dbRootPath}/${uid}`)
        return await this.$db.get(`Users/${uid}/${dbRootPath}/${data.id}`)
        //return await this.$db.get_one(`Users/${data.id}/${dbRootPath}/${uid}`, dataConverter)
    } catch (e) {
        this.$system.log({ comp: 'store/friends', msg: 'getAccess', val: e })
        return false
    }
  },
  async remove ({ rootState }, doc) {
    const uid = rootState.user.data.uid
    return await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${doc}`).then(async () => {
        await this.$db.delete_doc(`Users/${doc}/${dbRootPath}/${uid}`)
    }).then(() => {
        return true
    }).catch(() => {
        return false
    })
  },
  async joinUser({ commit }, user) {
    try {
        return await this.$db.get(`Users/${user.id}`).then((doc) => {
                if (doc) {
                    // const data = doc.data()
                    const assignedData = Object.assign(lodash.cloneDeep(user), lodash.cloneDeep(doc))
                    commit('PUSH_TO_LOADED', assignedData)
                    return assignedData
                }
            })
    } catch (e) {
        console.error('ERROR LOADING USER', e)
    }
  }
}
