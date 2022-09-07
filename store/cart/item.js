import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

class Item extends FirestoreHelpers {
  constructor (data = {}) {
    super()
    this.data = data
    this.fields = {
      id: '',
      company: {
        id: '',
        name: ''
      },
      name: '',
      original_price: '',
      price: '',
      discount: '',
      quantity: '',
      currency: 'CAD',
      product_image: '',
      total: ''
    }
    return this
  }

  write () {
    this.fields.original_price = this.dollarsToCents(this.data.price)
    this.fields.price = this.data.sale_price
      ? this.strToInt(this.data.sale_price)
      : this.strToInt(this.data.price)
    this.fields.discount = this.data.sale_price
      ? this.dollarsToCents(this.strToInt(this.data.price) - this.strToInt(this.data.sale_price))
      : this.dollarsToCents(this.strToInt(this.data.price))
    this.fields.total = this.dollarsToCents(this.fields.price * this.fields.quantity)
    if (this.data.images && this.data.images[0]) {
      this.fields.product_image = this.data.images[0]
    }
    this.fields.price = this.dollarsToCents(this.fields.price)
    this.fields.sale_price = this.dollarsToCents(this.fields.sale_price)
    this.fields.bottle_deposit = this.dollarsToCents(this.fields.bottle_deposit)

    return this
  }
}

export const state = () => reactive({
  all: [],
  item: new Item({}).fields
})

export const getters = {
  item: (state) => {
    try {
      return state.item
    } catch {
      return false
    }
  },
  all: (state) => {
    try {
      return state.all
    } catch {
      return false
    }
  }
}

export const mutations = {
  INIT_ITEMS: (state, data) => {
    state.all = data
  },
  SET_ITEM: (state, data) => {
    state.item = data
  },
  SET_ITEMS: (state, data) => {
    const indexOfMatchingId = state.all.findIndex(one => one.sku === data.sku)
    if (indexOfMatchingId > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      const newQty = state.all[indexOfMatchingId].quantity + data.quantity
      const newTotal = state.all[indexOfMatchingId].total + data.total
      state.all[indexOfMatchingId].quantity = newQty
      state.all[indexOfMatchingId].total = newTotal
    } else {
      state.all.push(data)
    }
  },
  REMOVE_ITEM: (state, id) => {
    const indexOfMatchingId = state.all.findIndex(one => one.sku === id)
    if (indexOfMatchingId > -1) {
      state.all.splice(indexOfMatchingId, 1)
      return true
    }
    return false
  }
}

export const actions = {
  async add ({ commit, state, dispatch }, { product, quantity = 0 }) {
    product.quantity = quantity
    const obj = new Item(product).merge().write().format('write')
    await commit('SET_ITEMS', obj)
    await commit('cart/SET_ITEMS', state.all, { root: true })
    await dispatch('cart/syncCart', {}, { root: true })
    return state.all
  },
  async remove ({ dispatch, commit, state }, id) {
    await commit('REMOVE_ITEM', id)
    await commit('cart/SET_ITEMS', state.all, { root: true })
    await dispatch('cart/syncCart', {}, { root: true })
  },
  analytics_item ({ state }, product) {
    try {
      const found = state.all.findIndex(item => item.id === product.id)

      const item = state.all[found]
      item.item_id = item.id
      item.item_name = item.name
      return item
    } catch {
      return false
    }
  }
}
