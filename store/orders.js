import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Carts'

class Order extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      order: {
        sub_total: 0,
        shipping_total: 0,
        taxes: 0,
        total: 0,
        total_after_tip: 0
      }
    }
    return this
  }

  write () {
    return this
  }

  read () {
    this.fields.order.sub_total = this.centsToDollars(this.fields.order.sub_total)
    this.fields.order.shipping_total = this.centsToDollars(this.fields.order.shipping_total)
    this.fields.order.taxes = this.centsToDollars(this.fields.order.taxes)
    this.fields.order.total = this.centsToDollars(this.fields.order.total)
    this.fields.order.total_after_tip = this.centsToDollars(this.fields.order.total_after_tip)
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Order(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Order(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Order({}).fields,
  one: new Order({}).fields
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
  SET_ONE: (state, data) => {
    Vue.set(state, 'one', data)
  },
  REMOVE_ONE: (state, slug) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.id === slug)
    if (indexOfMatchingSlug > -1) {
      state.all.splice(indexOfMatchingSlug, 1)
      return true
    }
    return false
  }
}

export const actions = {
  async search ({ rootState }, {
    term,
    field = 'province',
    operator = '==',
    limit = null
  }) {
    const uid = rootState.user.data.uid
    return await this.$db.search_collection({
      path: `${dbRootPath}/${uid}/Orders`,
      term,
      field,
      operator,
      limit
    }, dataConverter)
  },
  async add ({
    commit,
    rootState
  }, data) {
    let uid = rootState.user.data.uid
    if (data.uid) {
      uid = data.uid
    }
    let response = false
    if (data && data.id) {
      response = await this.$db.update(`${dbRootPath}/${uid}/Orders/${data.id}`, dataConverter, data)
    } else {
      response = await this.$db.add(`${dbRootPath}/${uid}/Orders`, dataConverter, data)
    }
    if (response) {
      await commit('SET_ONE', data)
      await commit('PUSH_TO_ALL', data)
    }
    return response
  },
  async getOne ({
    commit,
    rootState
  }, id) {
    try {
      const uid = rootState.user.data.uid
      const one = await this.$db.get_one(`${dbRootPath}/${uid}/Orders/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
      }
      return { ...one }
    } catch (e) {
      this.$system.log({
        comp: 'store/orders',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({
    commit,
    rootState
  }, options = {}, limit = null) {
    let uid = rootState.user.data.uid
    if (options.uid) {
      uid = options.uid
    }
    const all = await this.$db.get_all(`${dbRootPath}/${uid}/Orders`, options.where, dataConverter, options.order, limit)
    if (all) {
      await commit('SET_ALL', all)
    }
    return all
  },
  async remove ({
    commit,
    rootState
  }, doc) {
    const uid = rootState.user.data.uid
    const response = await this.$db.delete_doc(`${dbRootPath}/${uid}/Orders/${doc}`)
    if (response) {
      await commit('REMOVE_ONE', doc)
    }
    return response
  }
}
