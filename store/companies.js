import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import { distanceBetween, geohashForLocation, geohashQueryBounds } from 'geofire-common'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import lodash from 'lodash'

const dbRootPath = 'Companies'

class Company extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      name: null,
      slug: null,
      rating: null,
      description: null,
      featured_image_url: null,
      logo_url: null,
      published: null,
      likes: 0,
      dislikes: 0,
      website: null,
      // Location will include, address{} + geoHash
      locations: []
    }
    return this
  }

  write () {
    this.fields.slug = this.slugify(this.fields.name)

    // Create sub-collection on data
    if (this.fields.locations.length > 0) {
      for (const locKey in this.fields.locations) {
        if (this.fields.locations[locKey].lat) {
          const hash = geohashForLocation([this.fields.locations[locKey].lat, this.fields.locations[locKey].lng])
          if (hash) {
            this.fields.locations[locKey].geoHash = hash
          }
        }
        // Additional fields
        this.fields.locations[locKey].name = this.fields.name
        this.fields.locations[locKey].id = this.fields.slug
        this.fields.locations[locKey].address_slug = this.slugify(this.fields.locations[locKey].address_1)
        this.fields.locations[locKey].description = this.fields.description
        if (this.fields.logo_url) {
          this.fields.locations[locKey].logo_url = this.fields.logo_url
        }
        const locSlug = this.slugify(this.fields.locations[locKey].address_1)
        const path = `${dbRootPath}/${this.fields.slug}/Locations/${locSlug}`
        window.$nuxt.context.$db.update(path, null, this.fields.locations[locKey])
      }
      // Remove, we don't want this in the root of the company
      delete this.fields.locations
    }

    return this
  }

  read () {
    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Company(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Company(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Company({}).fields,
  one: new Company({}).fields,
  products: [],
  loaded: {},
  nearest: []
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
  products: (state) => {
    try {
      return state.products
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
  nearest: (state) => {
    try {
      return state.nearest
    } catch {
      return []
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
      return
    }
    state.all.push(data)
  },
  PUSH_TO_LOADED: (state, data) => {
    state.loaded[data.id] = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  SET_PRODUCTS: (state, data) => {
    Vue.set(state.one, 'products', data)
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
    data.slug = new FirestoreHelpers().slugify(data.name)
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
      const one = await this.$db.get_one(`${dbRootPath}/${id}`, dataConverter)
      if (one) {
        await commit('SET_ONE', one)
        await commit('PUSH_TO_LOADED', one)
      }
      return one
    } catch (e) {
      this.$system.log({
        comp: 'store/companies',
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
  },
  async getLocations (_, id) {
    try {
      return await this.$db.get_all(`${dbRootPath}/${id}/Locations`, {}, null)
    } catch (e) {
      this.$system.log({
        comp: 'store/companies',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getNearest ({ commit }, center) {
    const radiusInM = 50 * 90
    const bounds = geohashQueryBounds(center, radiusInM)
    const promises = []

    // Get all the bounding companies
    for (const b of bounds) {
      const q = this.$fire.firestore.collectionGroup('Locations').orderBy('geoHash').startAt(b[0]).endAt(b[1])
      promises.push(q.get())
    }

    return await Promise.all(promises).then((snapshots) => {
      const matchingDocs = []
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          if (doc.get('lat')) {
            const lat = doc.get('lat')
            const lng = doc.get('lng')

            // We have to filter out a few false positives due to GeoHash
            const distanceInKm = distanceBetween([lat, lng], center)
            const distanceInM = distanceInKm * 300
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc.data())
              // matchingDocs.push(doc)
            }
          }
        }
      }
      return matchingDocs
    }).then((docs) => {
      // Process the matching documents
      commit('SET_STATE_FIELD', {
        field: 'nearest',
        data: []
      })
      if (docs && docs.length > 0) {
        commit('SET_STATE_FIELD', {
          field: 'nearest',
          data: lodash.cloneDeep(docs)
        })
      }
      return docs
    })
  }
}
