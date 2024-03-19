import Vue from 'vue'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
const dbRootPath = 'ADMIN/'

// Used for in response to UPDATING a document, this is a global variable
let toFirestoreData = null

class Admin extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {}
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
    toFirestoreData = new Admin(data).merge().write().format('write')
    return toFirestoreData
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Admin(data).merge().read().format('read')
  }
}

export const state = () => ({
  all: [],
  one: {},
  UI: {
    TravelTime: {}
  }
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
  TravelTime: (state) => {
    try {
      return state.UI.TravelTime
    } catch {
      return false
    }
  }
}

export const mutations = {
  SET_ALL: (state, data) => {
    state.all = data
  },
  PUSH_TO_ALL: (state, data) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.slug === data.slug)
    if (indexOfMatchingSlug > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      Vue.set(state.all, indexOfMatchingSlug, data)
    } else {
      state.all.push(data)
    }
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
  }
}

export const actions = {
  async search (_, { adminPath = '', term, field = 'title', operator = '>' }) {
    return await this.$db.search_collection({
      path: `${dbRootPath}${adminPath}`,
      term,
      field,
      operator
    })
  },
  async add ({ commit }, { adminPath, data }) {
    data.slug = new FirestoreHelpers().slugify(data.title)
    const response = await this.$db.update(`${dbRootPath}${adminPath}/${data.slug}`, dataConverter, data)
    if (response) {
      await commit('PUSH_TO_ALL', toFirestoreData)
    }
    return response
  },
  async getOne ({ commit }, { adminPath, id }) {
    //const one = await this.$db.get_one(`${dbRootPath}${adminPath}/${id}`, dataConverter)
    const one = await this.$db.get(`${dbRootPath}${adminPath}/${id}`)
    if (one) {
      await commit('SET_ONE', one)
    }
    return one
  },
  async getAll ({ commit }, where = {}) {
    const all = await this.$db.get_all(`${dbRootPath}`, where, dataConverter)
    if (all) {
      await commit('SET_ALL', all)
    }
    return all
  },
  async remove ({ commit }, doc) {
    const response = await this.$db.delete_doc(`${dbRootPath}/${doc}`)
    if (response) {
      await commit('REMOVE_ONE', doc)
    }
    return response
  }
}
