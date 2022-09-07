import Vue from 'vue'
// import lodash from 'lodash'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Messages'

class Messages extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      subject: '',
      h1: '',
      message: '',
      meta: {},
      to_email: '',
      to_name: '',
      to_phone: ''
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
    return new Messages(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Messages(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  one: new Messages({}).fields,
  company_slug: ''
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
  async search (_, { term, field = 'code', operator = '>', limit = null }) {
    return await this.$db.search_collection({
      path: dbRootPath,
      term,
      field,
      operator,
      limit
    }, dataConverter)
  },
  async add (_, data) {
    /*if (response) {
      await commit('SET_ONE', response)
      await commit('PUSH_TO_ALL', data)
    }*/
    return await this.$db.add(`${dbRootPath}`, dataConverter, data)
  },
  async getOne ({ commit }, id) {
    try {
      const one = await this.$db.get_one(`${dbRootPath}/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/messages',
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
