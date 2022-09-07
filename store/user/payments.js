import Vue from 'vue'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
const dbRootPath = 'Payments'

class Favourites extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      tokenId: null,
      cardId: null,
      clientIp: null
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
    return new Favourites(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Favourites(data).merge().read().format('read')
  }
}

export const state = () => ({
  all: [],
  card: {}
})

export const getters = {
  all: (state) => {
    try {
      return state.all
    } catch {
      return false
    }
  },
  card: (state) => {
    try {
      return state.card
    } catch {
      return false
    }
  }
}

export const mutations = {
  SET_ALL: (state, data) => {
    Vue.set(state, 'all', data)
  },
  SET_CARD: (state, data) => {
    Vue.set(state, 'card', data)
  },
  PUSH_TO_ALL: (state, data) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one === data)
    if (indexOfMatchingSlug > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      Vue.set(state.all, indexOfMatchingSlug, data)
      return
    }
    state.all.push(data)
  },
  REMOVE_ONE: (state, id) => {
    const indexOfMatchingId = state.all.findIndex(one => one === id)
    if (indexOfMatchingId > -1) {
      state.all.splice(indexOfMatchingId, 1)
      return true
    }
    return false
  }
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
      data.slug = new FirestoreHelpers().slugify(data.name)
      const response = await this.$db.add(`Users/${uid}/${dbRootPath}`, dataConverter, data)
      if (response) {
        await commit('PUSH_TO_ALL', data.slug)
      }
      return data.slug
    }
  },
  async update ({ commit }, data) {
    if (data.uid && data.id) {
      const response = await this.$db.update(`Users/${data.uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async getAll ({ commit, rootState }) {
    const uid = rootState.user.data.uid
    const response = await this.$db.get_all(`Users/${uid}/${dbRootPath}`)
    if (response) {
      await commit('SET_ALL', response.map(fav => fav.id))
    }
    return response
  },
  async remove ({ commit, rootState }, id) {
    const uid = rootState.user.data.uid
    const response = await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${id}`)
    if (response) {
      await commit('REMOVE_ONE', id)
    }
    return response
  }
}
