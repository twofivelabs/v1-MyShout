import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
const dbRootPath = 'Notifications'

class Notification extends FirestoreHelpers {
  constructor (data) {
    super()
    this.data = data
    this.fields = {
      uid: '',
      title: '',
      body: '',
      color: '',
      goTo: null,
      seen: false,
      type: null,
      meta: {},
      completed: false,
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
    return new Notification(data).merge().write().format('write')
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new Notification(data).merge().read().format('read')
  }
}

export const state = () => reactive({
  hasNotifications: false,
  all: [],
  unseen: [],
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
    // Vue.set(state, 'all', data)
  },
  PUSH_TO_LOADED: (state, data) => {
    Vue.set(state.loaded, data.id, data)
    // state.loaded[data.id] = data
  },
  UNSHIFT_TO_LOADED: (state, data) => {
    Vue.set(state, 'loaded', data)
  },
  REMOVE: (state, data) => {
    Vue.delete(state.loaded, data.id)
    // state.loaded[data.id] = data
  },
  SET_HAS_NOTIFICATIONS: (state, data) => {
    state.hasNotifications = data
    Vue.set(state, 'hasNotifications', data)
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
  async add (_, data) {
    // Using the rootState was causing abnormal notifications
    // const uid = data.uid || rootState.user.data.uid
    const uid = data.uid
    if (uid) {
      if(!data.imageUrl) {
          data.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/my-shout-app.appspot.com/o/ADMIN%2FMyShout%20200X200.png?alt=media&token=2e8bf86d-c111-47e2-b320-9e6724c1d017'
      }
      const response = await this.$db.add(`Users/${uid}/${dbRootPath}`, dataConverter, data)
      if (response) {
        // Causing to show the notification in my own notifications
        // await commit('SET_ALL', response)
        // await commit('PUSH_TO_LOADED', data)
      }
      return response
    }
  },
  async update ({ commit, rootState }, data) {
    const uid = data.uid || rootState.user.data.uid
    if (uid) {
      // Don't use data converter here, so we need to remove created_at
      if (data.created_at) {
          delete data.created_at
      }
      const response = await this.$db.update(`Users/${uid}/${dbRootPath}/${data.id}`, null, data)
      if (response) {
        await commit('PUSH_TO_LOADED', data)
      }
    }
  },
  async getAll ({ commit, rootState }, where = {}) {
    const uid = rootState.user.data.uid
    if (uid) {
      const response = await this.$db.get_all(`Users/${uid}/${dbRootPath}`, where, dataConverter, {
        by: 'created_at',
        direction: 'desc'
      }, 40)
      if (response) {
        await commit('SET_ALL', response)
        response.forEach((data) => {
          if (data.seen === false) {
            commit('SET_HAS_NOTIFICATIONS', true)
          }
          commit('PUSH_TO_LOADED', data)
        })
      }
      return response
    }
  },
  async listen ({ rootState, commit }) {
    const uid = rootState.user.data.uid
    await this.$fire.firestore.collection(`Users/${uid}/${dbRootPath}`)
        .orderBy('created_at', 'desc')
        .limitToLast(100)
        .onSnapshot((snapshot) => {
          commit('SET_ALL', [])
          snapshot.docChanges().forEach((change) => {
            const data = change.doc.data()
            data.id = change.doc.id
            data.created_at = data.created_at.toDate().toDateString()
            if (change.type === 'added') {
              if (data && data.seen === false) {
                commit('SET_HAS_NOTIFICATIONS', true)
              }
              commit('PUSH_TO_LOADED', data)
            } else if (change.type === 'removed') {
              commit('REMOVE', data)
            }
          })
        })
  },
  async remove ({ rootState }, doc) {
    const uid = rootState.user.data.uid
    return await this.$db.delete_doc(`Users/${uid}/${dbRootPath}/${doc}`)
  }
}
