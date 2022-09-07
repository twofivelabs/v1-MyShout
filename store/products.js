import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import { distanceBetween, geohashQueryBounds } from 'geofire-common'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import lodash from 'lodash'

const dbRootPath = 'Products'

class Product extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      name: null,
      slug: null,
      company: {
        id: null,
        name: null
      },
      description: null,
      published: null,
      images: [],
      sku: null,
      volume_in_ml: null,
      price: null,
      sale_price: null,
      bottle_deposit: null,
      tags: [],
      likes: null,
      dislikes: null,
      type: null, // alcohol, food, general
      variations: [],
      ibu: null,
      srm: null,
      abv: null,
      out_of_stock: false,
      height: null,
      width: null,
      length: null,
      weight: null
    }
    return this
  }

  write () {
    this.fields.price = this.dollarsToCents(this.fields.price)
    this.fields.sale_price = this.dollarsToCents(this.fields.sale_price)
    this.fields.bottle_deposit = this.dollarsToCents(this.fields.bottle_deposit)
    this.fields.sku = new FirestoreHelpers().slugify(this.fields.name)

    this.fields.height = this.strToInt(this.fields.height)
    this.fields.width = this.strToInt(this.fields.width)
    this.fields.length = this.strToInt(this.fields.length)
    this.fields.weight = this.strToInt(this.fields.weight)

    if (this.fields.variations && this.fields.variations.length > 0) {
      this.fields.variations.forEach((v, k) => {
        const labelSlug = new FirestoreHelpers().slugify(this.fields.variations[k].label)
        if (this.fields.sku) {
          this.fields.variations[k].sku = new FirestoreHelpers().slugify(this.fields.sku) + '-' + labelSlug
        } else if (this.fields.slug) {
          this.fields.variations[k].sku = new FirestoreHelpers().slugify(this.fields.slug) + '-' + labelSlug
        }

        this.fields.variations[k].price = this.dollarsToCents(this.fields.variations[k].price)
        this.fields.variations[k].sale_price = this.dollarsToCents(this.fields.variations[k].sale_price)
        this.fields.variations[k].bottle_deposit = this.dollarsToCents(this.fields.variations[k].bottle_deposit)

        this.fields.variations[k].height = this.strToInt(this.fields.variations[k].height)
        this.fields.variations[k].width = this.strToInt(this.fields.variations[k].width)
        this.fields.variations[k].length = this.strToInt(this.fields.variations[k].length)
        this.fields.variations[k].weight = this.strToInt(this.fields.variations[k].weight)
      })
    }

    return this
  }

  read () {
    this.fields.price = this.centsToDollars(this.fields.price)
    this.fields.sale_price = this.centsToDollars(this.fields.sale_price)
    this.fields.bottle_deposit = this.centsToDollars(this.fields.bottle_deposit)

    if (this.fields.variations && this.fields.variations.length > 0) {
      this.fields.variations.forEach((v, k) => {
        this.fields.variations[k].price = this.centsToDollars(this.fields.variations[k].price)
        this.fields.variations[k].sale_price = this.centsToDollars(this.fields.variations[k].sale_price)
        this.fields.variations[k].bottle_deposit = this.centsToDollars(this.fields.variations[k].bottle_deposit)
      })
    }

    return this
  }
}

const dataConverter = {
  toFirestore (data) {
    return new Product(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Product(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  all: [],
  default: new Product({}).fields,
  one: new Product({}).fields,
  selected: '', // used for variations
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
  selected: (state) => {
    try {
      return state.selected
    } catch {
      return null
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
  SET_SELECTED: (state, data) => {
    Vue.set(state, 'selected', data)
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
    Vue.set(state.loaded, data.id, data)
    // state.loaded[data.id] = data
  },
  SET_ONE: (state, data) => {
    state.one = data
  },
  SET_LIKES: (state, {
    productId,
    data
  }) => {
    lodash.set(state.loaded[productId], 'likes', data)
    // Vue.set(state.loaded[productId], 'likes', data)
    Vue.set(state.one, 'likes', data)
  },
  SET_DISLIKES: (state, {
    productId,
    data
  }) => {
    lodash.set(state.loaded[productId], 'dislikes', data)
    // Vue.set(state.loaded[productId], 'dislikes', data)
    Vue.set(state.one, 'dislikes', data)
  },
  REMOVE_ONE: (state, id) => {
    const indexOfMatchingId = state.all.findIndex(one => one.id === id)
    if (indexOfMatchingId > -1) {
      state.all.splice(indexOfMatchingId, 1)
      return true
    }
    return false
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
    if (data.company.id) {
      // Create relationship between product and company
      await this.$db.create_relationship(
        `${dbRootPath}/${data.slug}`,
        `Companies/${data.company.id}/${dbRootPath}/${data.slug}`)
    }
    const response = await this.$db.update(`${dbRootPath}/${data.slug}`, dataConverter, data)
    if (response) {
      // await commit('PUSH_TO_ALL', data)
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
        comp: 'store/prducts',
        msg: 'getOne',
        val: e
      })
      return false
    }
  },
  async getAll ({ commit }, {
    where,
    limit = 7,
    order = {}
  }) {
    const all = await this.$db.get_all(`${dbRootPath}`, where, dataConverter, order, limit)
    if (all) {
      await commit('SET_ALL', all)
    }
    return all
  },
  async getNearest (_, center) {
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
              matchingDocs.push(doc)
            }
          }
        }
      }
      return matchingDocs
    }).then((docs) => {
      // Process the matching documents
      return docs
    })
  },
  async remove ({ commit }, doc) {
    const response = await this.$db.delete_doc(`${dbRootPath}/${doc}`)
    if (response) {
      await commit('REMOVE_ONE', doc)
    }
    return response
  },
  async incrementLikes ({
    commit,
    state
  }, {
    productId = '',
    like = true
  }) {
    if (like === true) {
      await commit('SET_LIKES', {
        productId,
        data: state.one.likes + 1
      })
    } else {
      await commit('SET_DISLIKES', {
        productId,
        data: state.one.likes + 1
      })
    }
  },
  async updateSelected ({ commit }, product) {
    await commit('SET_SELECTED', product)
  }
}
