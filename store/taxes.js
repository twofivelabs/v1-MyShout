import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Taxes'

class Tax extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      title: null,
      type: null,
      country_code: null,
      province: null,
      conditions: [],
      tax_calculation: null
    }
    return this
  }

  write () {
    this.fields.country_code = this.data.country_code || 'CA'
    this.fields.province = this.data.province || 'BC'
    this.fields.tax_calculation = this.data.tax_calculation || 'add'
    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Tax(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Tax(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Tax({}).fields,
  one: new Tax({}).fields,
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
  SET_ALL: (state, data) => {
    state.all = data
  },
  PUSH_TO_ALL: (state, data) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.title === data.title)
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
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  },
  REMOVE_ONE: (state, slug) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.title === slug)
    if (indexOfMatchingSlug > -1) {
      state.all.splice(indexOfMatchingSlug, 1)
      return true
    }
    return false
  }
}

export const actions = {
  async search (_, {
    term,
    field = 'province',
    operator = '==',
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
    let response = false
    if (data && data.id) {
      response = await this.$db.update(`${dbRootPath}/${data.id}`, dataConverter, data)
    } else {
      response = await this.$db.add(`${dbRootPath}`, dataConverter, data)
    }
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
        comp: 'store/taxes',
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
