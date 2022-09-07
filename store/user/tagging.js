import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
const dbRootPath = 'Tagging'

class Tagging extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      tag: '',
      like: '',
      purchased: null
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
    return new Tagging(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Tagging(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: []
})

export const getters = {
  all: (state) => {
    try {
      return state.all
    } catch {
      return false
    }
  }
}

export const mutations = {
  SET_ALL: (state, data) => {
    state.all = data
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
      data.slug = new FirestoreHelpers().slugify(data.tag)
      const response = await this.$db.update(`Users/${uid}/${dbRootPath}/${data.slug}`, dataConverter, data)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async update ({ commit }, { data }) {
    if (data.uid && data.id) {
      const response = await this.$db.update(`Users/${data.uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async getAll ({ commit, rootState }, uid = null) {
    uid = uid || rootState.user.data.uid
    if (uid) {
      const response = await this.$db.get_all(`Users/${uid}/${dbRootPath}`)
      if (response) {
        await commit('SET_ALL', response)
      }
      return response
    }
  },
  async remove ({ rootState }, doc) {
    const uid = rootState.user.data.uid
    return await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${doc}`)
  }
}
