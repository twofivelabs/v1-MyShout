import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'

const dbRootPath = 'Posts'

class Posts extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      title: null,
      slug: null,
      content: null,
      isMarkdown: true,
      tags: [],
      company: {
        id: null,
        name: null
      },
      featured_image_url: null,
      published: null,
      learn_more: null,
      learn_more_label: null,
      language: {},
    }
    this.multiLingualFields = {
      title: null,
      content: null,
      learn_more_label: null
    }
    return this
  }

  write () {
    if (!this.fields.slug) {
        this.fields.slug = this.slugify(this.fields.title)
    }
    return this
  }

  read () {
    this.prepareMultiLingualProperties()
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Posts(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Posts(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Posts({}).fields,
  one: new Posts({}).fields,
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
    const indexOfMatchingSlug = state.all.findIndex(one => one.slug === data.slug)
    if (indexOfMatchingSlug > -1) {
      // !! Need to use Vue, to keep the properties Reactive
      Vue.set(state.all, indexOfMatchingSlug, data)
    } else {
      state.all.push(data)
    }
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  REMOVE_ONE: (state, slug) => {
    const indexOfMatchingSlug = state.all.findIndex(one => one.slug === slug)
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
    data.slug = new FirestoreHelpers().slugify(data.title)
    const response = await this.$db.update(`${dbRootPath}/${data.slug}`, dataConverter, data)
    if (response) {
      await commit('PUSH_TO_ALL', data)
      await commit('PUSH_TO_LOADED', data)
    }
    return response
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
        comp: 'store/posts',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({ commit }, {
    where = 'posts',
    limit = 20
  }) {
    let all;
    if (this.$config?.wordpress?.usePosts) {
      all = await this.$wp.get_all(where, limit)
    } else {
      all = await this.$db.get(`${dbRootPath}`, {where, limit})
    }
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
