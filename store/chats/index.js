import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
// import lodash from 'lodash'

const dbRootPath = 'Chats'

/**
 * participants: [
 *  created_at:
 *  id:
 * ]
 * lastMessage: is used as the last message received
 */
class Chats extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      owner: null,
      title: null,
      description: null,
      photoUrl: null,
      participants: [],
      admins: [],
      seen: [],
      unseen: [],
      typing: [],
      muted: [],
      message: {
        snippet: null,
        created_at: null,
        sent_by: null
      }
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
    return new Chats(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Chats(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Chats({}).fields,
  one: new Chats({}).fields,
  loaded: {},
  users: {}
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
  },
  users: state => (id) => {
    try {
        if (id && state.users[id]) {
            return state.users[id]
        }
        return {}
    } catch {
        return {}
    }
  },
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
      return
    }
    state.all.push(data)
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  },
  PUSH_TO_USERS: (state, data) => {
    state.users[data.id] = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  SET_FIELD: (state, value) => {
    state = Object.assign(state, value)
    const key = Object.keys(value)[0]
    // console.log('VALUE', key)
    Vue.set(state, key, value)
    // state.profile = Object.assign(state.profile, value)
  },
  REMOVE_ONE: (state, slug) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.slug === slug)
    if (indexOfMatchingSlug > -1) {
      state.all.splice(indexOfMatchingSlug, 1)
      return true
    }
    return false
  },
  SET_STATE_FIELD: (state, {
    field = null,
    data = null
  }) => {
    if (field) {
      // state[field] = data
      Vue.set(state, field, data)
    }
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
    const response = await this.$db.save(`${dbRootPath}`, dataConverter, data)
    if (response) {
      await commit('PUSH_TO_ALL', data)
      await commit('PUSH_TO_LOADED', data)
    }
    return response
  },
  async update ({ commit }, data) {
    if(!data.id) {
        return false
    }
    //const response = await this.$db.update(`${dbRootPath}/${data.id}`, dataConverter, data)
    const response = await this.$db.save(`${dbRootPath}/${data.id}`, data)
    if (response) {
        await commit('PUSH_TO_ALL', data)
        await commit('PUSH_TO_LOADED', data)
    }
    return response
  },
  async updateField ({ commit }, data) {
    if(!data.id) {
      return false
    }
    if (this.$db) {
        //const response = await this.$db.update(`${dbRootPath}/${data.id}`, null, data)
        const response = await this.$db.save(`${dbRootPath}/${data.id}`, data)
        if (response) {
          await commit('SET_FIELD', data)
        }
        return response
    }
  },
  async getOne ({
    state,
    commit
  }, id) {
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
        comp: 'store/chats',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({ commit }, {
    where = {},
    limit = 20,
    order = {}
  }) {
    const all = await this.$db.get(`${dbRootPath}`, where, dataConverter, order, limit)
    if (all) {
      await commit('SET_ALL', all)
    }
    return all
  },
  async remove ({ commit }, doc) {
    const response = await this.$db.delete(`${dbRootPath}/${doc}`)
    if (response) {
      await commit('REMOVE_ONE', doc)
    }
    return response
  },
  async listen ({ commit }, {
    where = {},
  }) {
    const all = await this.$db.listen(`${dbRootPath}`, where, dataConverter)
    console.log('ALL', all)
    if (all) {
      await commit('SET_ALL', all)
    }
    return all
  },
}
