import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Shipping'

class Shipping extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      // id: null,
      title: null,
      country_code: null,
      province: null,
      applies_to: null, // Global (empty) / Company Ids
      cities: [],
      conditions: []
    }
    return this
  }

  write () {
    if (this.fields.conditions && this.fields.conditions.length > 0) {
      this.fields.conditions.forEach((con, index) => {
        const cost = this.fields.conditions[index].cost
        if (cost.toLowerCase() !== 'free') {
          this.fields.conditions[index].cost = this.dollarsToCents(cost)
        }
        if (this.fields.conditions[index].minimum) {
          this.fields.conditions[index].minimum = parseInt(this.fields.conditions[index].minimum)
        }
        if (this.fields.conditions[index].maximum) {
          this.fields.conditions[index].maximum = parseInt(this.fields.conditions[index].maximum)
        }
      })
    }

    return this
  }

  read () {
    if (this.fields.conditions && this.fields.conditions.length > 0) {
      this.fields.conditions.forEach((con, index) => {
        const cost = this.fields.conditions[index].cost
        if (typeof cost === 'string' || cost instanceof String) {
          if (cost.toLowerCase() !== 'free') {
            this.fields.conditions[index].cost = this.centsToDollars(cost)
          }
        } else {
          this.fields.conditions[index].cost = this.centsToDollars(cost)
        }
      })
    }

    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Shipping(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Shipping(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Shipping({}).fields,
  one: new Shipping({}).fields,
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
    const indexOfMatchingSlug = state.all.findIndex(one => one.id === data.id)
    if (indexOfMatchingSlug > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      Vue.set(state.all, indexOfMatchingSlug, data)
    } else {
      state.all.push(data)
    }
  },
  PUSH_TO_LOADED: (state, data) => {
    Vue.set(state.loaded, data.id, data)
    // state.loaded[data.id] = data
  },
  SET_ONE: (state, data) => {
    Vue.set(state, 'one', data)
  },
  REMOVE_ONE: (state, id) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.id === id)
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
    field = 'title',
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
        comp: 'store/shipping',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({ commit }, {
    where = {},
    limit = 100,
    order = {}
  }) {
    const all = await this.$db.get_all(`${dbRootPath}`, where, dataConverter, order, limit)
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
