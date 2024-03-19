import Vue from 'vue'
import lodash from 'lodash'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Feedback'

class Feedback extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      comment: null,
      company: {
        id: null
      },
      like: null,
      product: {
        id: null
      },
      user: {
        id: null
      },
      ip: null
    }
    return this
  }

  write () {
    return this
  }

  read () {
    try {
      this.fields.created_at = this.timeAgo(this.fields.created_at.toDate())
    } catch (err) {
      // ...
    }
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Feedback(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Feedback(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Feedback({}).fields,
  one: new Feedback({}).fields,
  company_slug: '',
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
  company: (state) => {
    try {
      return state.all[state.company_slug]
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
  SET_PRODUCT_ALL: (state, {
    productId,
    data
  }) => {
    Vue.set(state.loaded, productId, data)
  },
  SET_COMPANY_SLUG: (state, company) => {
    Vue.set(state, 'company_slug', company)
  },
  SET_COMPANY: (state, {
    company,
    data
  }) => {
    Vue.set(state, 'company_slug', company)
    Vue.set(state.all, company, data)
  },
  PUSH_TO_ALL: (state, data) => {
    if (data && data.product.id) {
      if (state.loaded[data.product.id]) {
        state.loaded[data.product.id].push(data)
        // Vue.set(state.loaded, data.product.id, data)
      } else {
        Vue.set(state.loaded, data.product.id, [])
        state.loaded[data.product.id].push(data)
      }
    }
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
    if (state.loaded[data.product.id]) {
      state.loaded[data.product.id].push(data)
    } else {
      Vue.set(state.loaded, data.product.id, [])
      state.loaded[data.product.id].push(data)
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
  },
  SET_FEEDBACK_USER: (state, {
    user,
    index
  }) => {
    lodash.set(state, `all[${index}].user`, user)
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
  async add ({
    commit,
    dispatch
  }, data) {
    const response = await this.$db.add(`${dbRootPath}`, dataConverter, data)
    if (response && response.id) {
      await dispatch('products/incrementLikes', {
        productId: data.product.id,
        like: data.like
      }, { root: true })
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
      //const one = await this.$db.get_one(`${dbRootPath}/${id}`, dataConverter)
      const one = await this.$db.get(`${dbRootPath}/${id}`)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/feedback',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({ commit }, {
    where = {},
    limit = 50,
    order = {
      by: 'created_at',
      direction: 'desc'
    }
  }) {
    const all = await this.$db.get_all(`${dbRootPath}`, where, dataConverter, order, limit)
    if (all) {
      if (where.value) {
        await commit('SET_PRODUCT_ALL', {
          productId: where.value,
          data: all
        })
      } else {
        await commit('SET_ALL', all)
      }
    }
    return all
  },
  async remove ({ commit }, doc) {
    const response = await this.$db.delete_doc(`${dbRootPath}/${doc}`)
    if (response) {
      await commit('REMOVE_ONE', doc)
    }
    return response
  },
  async addUserToFeedback ({
    commit,
    dispatch
  }, uid) {
    const user = await dispatch('user/get', uid, { root: true })
    if (user) {
      await commit('SET_FEEDBACK_USER', { user })
    }
    return user
  }
}
