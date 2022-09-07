import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
const dbRootPath = 'Address'

class Address extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      type: 'billing', // shipping/billing
      first_name: null,
      last_name: null,
      company: null,
      country: null,
      address_1: null,
      address_2: null,
      city: null,
      province: null,
      postal: null,
      phone: null
    }
    return this
  }

  write () {
    this.fields.slug = this.slugify(this.fields.address_2 + this.fields.address_1)
    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Address(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Address(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  shipping: new Address({}).fields,
  billing: new Address({}).fields,
  all: {}
})

export const getters = {
  shipping: (state) => {
    try {
      return state.shipping
    } catch {
      return false
    }
  },
  billing: (state) => {
    try {
      return state.billing
    } catch {
      return false
    }
  }
}

export const mutations = {
  SET_SHIPPING: (state, data) => {
    Vue.set(state, 'shipping', data)
  },
  SET_BILLING: (state, data) => {
    Vue.set(state, 'billing', data)
  },
  SET_ALL: (state, data) => {
    Vue.set(state, 'all', data)
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
  async add ({ commit }, { uid, data, type }) {
    if (uid) {
      data.slug = new FirestoreHelpers().slugify(data.address_2 + data.address_1)
      const response = await this.$db.update(`Users/${uid}/${dbRootPath}/${data.slug}`, dataConverter, data)
      if (response) {
        if (type === 'shipping') {
          await commit('SET_SHIPPING', response)
        } else if (type === 'billing') {
          await commit('SET_BILLING', response)
        }
      }
      return response
    }
  },
  async update ({ commit }, { data, type }) {
    if (data.uid && data.id) {
      const response = await this.$db.update(`Users/${data.uid}/${dbRootPath}/${data.id}`, dataConverter, data)
      if (response) {
        if (type === 'shipping') {
          await commit('SET_SHIPPING', response)
        } else if (type === 'billing') {
          await commit('SET_BILLING', response)
        }
      }
      return response
    }
  },
  async getAll ({ commit }, { uid }) {
    const response = await this.$db.get_one(`Users/${uid}/${dbRootPath}`)
    if (response) {
      await commit('SET_ALL', response)
    }
    return response
  },
  async remove ({ rootState }, doc) {
    const uid = rootState.user.data.uid
    return await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${doc}`)
  }
}
