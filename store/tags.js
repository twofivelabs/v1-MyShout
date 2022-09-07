import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Tags'

class Tag extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      name: null
    }
    return this
  }

  write () {
    this.fields.name = this.slugify(this.fields.name)
    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Tag(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Tag(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Tag({}).fields,
  one: new Tag({}).fields,
  loaded: {}
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
  }
}

export const mutations = {
  SET_ALL: (state, { data }) => {
    state.all = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  }
}

export const actions = {
  async search (_, {
    term,
    field = 'name',
    operator = '>',
    limit = null
  }) {
    return await this.$db.search_collection({
      path: dbRootPath,
      term,
      field,
      operator,
      limit
    }, dataConverter)
  },
  async add ({ commit }, data) {
    data.slug = new FirestoreHelpers().slugify(data.name)
    const response = await this.$db.update(`${dbRootPath}/${data.slug}`, dataConverter, data)
    if (response) {
      await commit('PUSH_TO_ALL', data)
      await commit('PUSH_TO_LOADED', data)
    }
    return response
  },
  async getOne ({ commit }, id) {
    try {
      if (state.loaded && state.loaded[id]) {
        await commit('SET_ONE', state.loaded[id])
        return state.loaded[id]
      }
      const one = await this.$db.get_one(`${dbRootPath}/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/tags',
        msg: 'getOne',
        val: e
      })
      return false
    }
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
