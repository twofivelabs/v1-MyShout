import { reactive } from '@nuxtjs/composition-api'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import Vue from 'vue'

const dbRootPath = 'Messages'

class Messages extends FirestoreHelpers {
    constructor (data = {}) {
        super()
        this.data = data
        this.fields = {
            owner: '',
            message: '',
            replies: [],
            replyTo: null,
            deleted: false,
            hide: [],
            image: null,
            audioUrl: '',
            videoUrl: '',
            urls: [],
            seen: []
        }
        return this
    }

    write () {
        return this
    }

    read () {
        // this.fields.created_at = this.timeAgo(this.fields.created_at.toDate())
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
    default: new Messages({}).fields,
    one: new Messages({}).fields,
    loaded: {},
})

export const getters = {
    all: (state) => {
        try {
            return state.all
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
        if (!data) return

        let indexOfMatchingSlug = -1
        if (data?.id) {
            indexOfMatchingSlug = state.all.findIndex(one => one.id === data.id)
        }

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
    REMOVE_ONE: (state, slug) => {
        if (!slug) return

        let indexOfMatchingSlug = -1
        if (slug) {
            indexOfMatchingSlug = state.all.findIndex(one => one.slug === slug)
        }
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
    async add (_ , { message, chatId }) {
        const response = await this.$db.add(`Chats/${chatId}/${dbRootPath}/`, dataConverter, message)
        if (response) {
            // await commit('PUSH_TO_ALL', data)
            // await commit('PUSH_TO_LOADED', data)
        }
        return response
    },
    async getOne ({ state, commit }, id) {
        try {
            if (state.loaded && state.loaded[id]) {
              await commit('SET_ONE', state.loaded[id])
              return state.loaded[id]
            }
            //const one = await this.$db.get_one(`Chats/${id}/${dbRootPath}`, dataConverter)
            const one = await this.$db.get(`Chats/${id}/${dbRootPath}`)
            if (one) {
                await commit('SET_ONE', one)
                await commit('PUSH_TO_LOADED', one)
            }
            return one
        } catch (e) {
            this.$system.log({ comp: 'store/chats/messages', msg: 'getOne', val: e })
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
    async remove ({ commit }, data) {
        const response = await this.$db.delete_doc(`Chats/${data.chatId}/${dbRootPath}/${data.id}`)
        if (response) {
            await commit('REMOVE_ONE', data)
        }
        return response
    },
    async updateField ({ commit }, data) {
        if (this.$db) {
            const response = await this.$db.update(`Chats/${data.chatId}/${dbRootPath}/${data.id}`, null, data.data)
            if (response) {
                await commit('SET_STATE_FIELD', data)
            }
            return response
        }
    },
}
