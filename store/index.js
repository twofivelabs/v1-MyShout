import Vue from 'vue'
import { reactive } from '@nuxtjs/composition-api'

export const strict = false

export const state = () => reactive({
  isAppInit: false,
  appLoading: true,
  authUser: null,
  listeners: reactive({}),
  onboarding: {
      phoneNumber: null
  },
  globals: {
    showFooter: false
  }
})

export const getters = {
    listeners: state => (path) => {
        try {
            if (path && state.listeners[path]) {
                return state.listeners[path]
            }
            return state.listeners
        } catch {
            return {}
        }
    },
}

export const mutations = {
    SHOW_FOOTER: (state, data) => {
    state.globals.showFooter = data
    },
    SET_APP_LOADING: (state, value) => {
        Vue.set(state, 'loading', value)
    },
    SET_KEY: (state, { key, value }) => {
        if (!key) return
        Vue.set(state, key, value)
    },
}

export const actions = {
  /**
   * Can get VERIFIED user on server side
   * via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
   * @param dispatch
   * @param res
   * @param ctx
   * @returns {Promise<void>}
   */
  async nuxtServerInit ({
    state,
    dispatch
  }, { res }) {
    if (res && res.locals && res.locals.user) {
      const {
        allClaims: claims,
        ...authUser
      } = res.locals.user

      console.info('Auth User verified on server-side.')

      await dispatch('user/onAuthStateChanged', {
        authUser,
        claims
      })
    }
    console.log('NuxtServerInit', { ...state.user.data })
  },
  nuxtClientInit (_, { res }) {
    console.log('CLIENT INIT >> nuxtClientInit', res)
  },
  async altAuthStateChanged (_, { authUser }) {
    if (!authUser) {
      console.log('NO USER, RESET')
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    console.log('COMMIT SET AUTH USER')
    // commit('SET_AUTH_USER', { authUser })
  }
}
