import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import Vue from "vue";
const dbRootPath = 'CheckIns'

class CheckIns extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      userId: '',
      requestedBy: '',
      responded: false
    }
    return this
  }

  write () {
    return this
  }

  read () {
    try {
      this.fields.timeAgo = this.timeAgo(this.fields.created_at.toDate())
    } catch (err) {
      // ...
    }
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new CheckIns(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new CheckIns(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new CheckIns({}).fields,
  one: new CheckIns({}).fields,
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
    const uid = rootState?.user?.data?.uid
    if (!uid) return

    return await this.$db.search_collection({
      path: `Users/${uid}/${dbRootPath}`,
      term,
      field,
      operator,
      limit
    }, dataConverter)
  },
  async add ({ commit }, data) {
    const uid = data.userId
    if (uid) {
      const response = await this.$db.add(`Users/${uid}/${dbRootPath}`, dataConverter, data)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async update ({ commit }, data) {
    if (data?.uid && data?.id) {
      const response = await this.$db.update(`Users/${data.uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async getAll ({ commit, rootState }, uid = null) {
    uid = uid || rootState?.user?.data?.uid
    if (uid) {
        const where = {}

        const response = await this.$db.get_all(`Users/${uid}/${dbRootPath}`, where, dataConverter, {
            by: 'updated_at',
            direction: 'desc'
        }, 1)
      if (response) {
        await commit('SET_ALL', response)
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
      const uid = uid || rootState?.user?.data?.uid
      if (!uid) { return }
      const one = await this.$db.get_one(`Users/${uid}/${dbRootPath}/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/checkins',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async remove ({ rootState }, doc) {
    const uid = rootState?.user?.data?.uid
    return await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${doc}`)
  }
}
