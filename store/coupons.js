import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Coupons'

class Coupon extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      published: null, // Boolean
      title: null, // 50% Off all products
      code: null, // 50OFF
      applies_to: [], // All or objects of company ids
      product: {
        ids: [], // array of product ids, or null
        type: null, // percent | dollar
        discount: null // 50
      },
      cart: {
        min_quantity: null,
        min_sub_total: null,
        type: null, // perecent | dollar
        discount: null
      }
    }
    return this
  }

  write () {
    this.fields.cart.min_sub_total = this.dollarsToCents(this.fields.cart.min_sub_total)
    this.fields.cart.min_quantity = this.strToInt(this.fields.cart.min_quantity)
    if (this.fields.cart.type === 'dollar') {
      this.fields.cart.discount = this.dollarsToCents(this.fields.cart.discount)
    } else {
      this.fields.cart.discount = this.strToInt(this.fields.cart.discount)
    }
    if (this.fields.product.type === 'dollar') {
      this.fields.product.discount = this.dollarsToCents(this.fields.product.discount)
    } else {
      this.fields.product.discount = this.strToInt(this.fields.product.discount)
    }

    return this
  }

  read () {
    this.fields.cart.min_quantity = this.strToInt(this.fields.cart.min_quantity)
    this.fields.cart.min_sub_total = this.centsToDollars(this.fields.cart.min_sub_total)
    if (this.fields.cart.type === 'dollar') {
      this.fields.cart.discount = this.centsToDollars(this.fields.cart.discount)
    }
    if (this.fields.product.type === 'dollar') {
      this.fields.product.discount = this.centsToDollars(this.fields.product.discount)
    }
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Coupon(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Coupon(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Coupon({}).fields,
  one: new Coupon({}).fields,
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
    const indexOfMatchingSlug = state.all.findIndex(one => one.code === data.code)
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
    const indexOfMatchingSlug = state.all.findIndex(one => one.code === slug)
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
    field = 'code',
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
    data.code = new FirestoreHelpers().slugify(data.code)
    const response = await this.$db.update(`${dbRootPath}/${data.code}`, dataConverter, data)
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
        comp: 'store/coupons',
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
