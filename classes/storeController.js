import Vue from 'vue'
import FirestoreHelpers from '~/classes/FirestoreHelpers'
import {reactive, ref} from '@nuxtjs/composition-api'
import {hooks} from '~/classes/hooks'
import {cloneDeep} from 'lodash'

const consoleInfoStyles = [
    'color: white',
    'background: #266bab',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')
const consoleListeningStyles = [
    'color: white',
    'background: #0bbe4d',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')
const consoleJoinStyles = [
    'color: white',
    'background: #74369d',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')

export let storeHooks = hooks
export let className = null
export const listeners = []
const dataJoins = {}

/**
 * Sets the read and write for the data converter
 * @param classN Class Name Object
 * @returns {*}
 */
export const setDataConverter = (classN) => {
    className = classN
    return {
        toFirestore (data) {
            return new classN(data).merge().write().format('write')
        },
        fromFirestore (snapshot, options) {
            const data = snapshot.data(options)
            return new classN(data).merge().read().format('read')
        }
    }
}

/**
 * parent: Used to keep data organized in the store: IE (All Comments associated to a post, postId is the parent)
 */
export const stateController = (className) => reactive({
    dbRootPath: '',
    collectionName: '',
    class: className,
    subCollectionId: null,
    dataConverter: null,
    showNotifications: true,
    loading: false,
    multiLingualFields: false,
    parent: null,

    default: new className({}).fields,
    one: new className({}).fields,
    all: [],
    allCount: 0,
    loaded: {},
    loadedCount: 0,
    search: {}
})

export const gettersController = {
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
    search: state => {
        try {
            return state.search
        } catch {
            return false
        }
    }
}

export const mutationsController = {
    SET_KEY: (state, { key, value }) => {
        if (!key) return
        Vue.set(state, key, value)
    },
    SET_ALL: (state, data) => {
        Vue.set(state, 'all', data)
        Vue.set(state, 'allCount', state.all.length)
    },
    SET_SEARCH: (state, data) => {
        Vue.set(state, 'search', data)
    },
    PUSH_TO_ALL: (state, { data, position }) => {
        if (!data) return

        let indexOfMatchingSlug = -1
        if (data && data.id) {
            indexOfMatchingSlug = state.all.findIndex(one => one.id === data.id)
        }
        if (indexOfMatchingSlug > -1) {
            Vue.set(state.all, indexOfMatchingSlug, data)
            Vue.set(state, 'allCount', state.all.length)
        } else {
            if (!position || position === 'push') {
                state.all.push(data)
                Vue.set(state, 'allCount', state.all.length)
            } else {
                state.all.unshift(data)
                Vue.set(state, 'allCount', state.all.length)
            }
        }
    },
    PUSH_TO_LOADED: (state, data) => {
        if (!data) return

        // console.log('PUSH_TO_LOADED', state)
        if (state.parent && !state.loaded[state.parent]) {
            Vue.set(state.loaded, state.parent, {})
        }

        // IF ARRAY LOOP
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((d) => {
                if (d.id) {
                    if (state.parent) {
                        Vue.set(state.loaded[state.parent],d.id, d)
                    } else {
                        Vue.set(state.loaded, d.id, d)
                    }
                }
            })
        } else {
            if (data.id) {
                if (state.parent) {
                    Vue.set(state.loaded[state.parent], data.id, data)
                } else {
                    Vue.set(state.loaded, data.id, data)
                }
            }
        }
    },
    UPDATE_FIELD: (state, { id, data }) => {
        // Update loaded
        Vue.set(state.loaded, id, data)

        // Update All
        let indexOfMatchingSlug = -1
        if (data && data.id) {
            indexOfMatchingSlug = state.all.findIndex(one => one.id === data.id)
        }
        if (indexOfMatchingSlug > -1) {
            Vue.set(state.all, indexOfMatchingSlug, data)
        }
    },
    SET_ONE: (state, data) => {
        Vue.set(state, 'one', data)
    },
    REMOVE_ONE: (state, slug) => {
        // Delete from loaded
        let adjustedSlug = slug
        if(slug.includes('/')) {
            adjustedSlug = slug.split('/')[1]
        }
        try {
            Vue.delete(state.loaded, adjustedSlug)
            delete state.loaded[adjustedSlug]
        } catch { /**/ }

        // Delete from all
        try {
            const indexOfMatchingSlug = state.all.findIndex(one => one.slug === adjustedSlug)
            if (indexOfMatchingSlug > -1) {
                state.all.splice(indexOfMatchingSlug, 1)
                return true
            }
        } catch { /**/ }
        try {
            const indexOfMatchingId = state.all.findIndex(one => one.id === adjustedSlug)
            if (indexOfMatchingId > -1) {
                state.all.splice(indexOfMatchingId, 1)
                return true
            }
        } catch { /**/ }

        return false
    }
}

export const actionsController = {
    getDefault({ state, commit }) {
        const formattedDataRead = new state.class({}).merge().read().format('read')
        const data = cloneDeep(formattedDataRead)

        commit('SET_KEY', { key: 'default', value: data })
        return data
    },

    /**
     * This will determine the path for the collection depth
     * @param state
     * @param commit
     * @param v
     * @returns {string}
     */
    getPath({ state, dispatch }, v) {
        // let p = ''
        let path = null
        if (state.id) {
            // This creates an issue when using things like users that are loaded
            // p = '/' + state.id
        }
        if (v && v.path) {
            path = v.path
        } else {
            path = v
        }

        // 2023-03-06 Fixing path parsing
        const { newPath } = this.$db.parsePath(path)
        path = newPath

        /*
        if (v && (typeof v == 'string' || v instanceof String)) {
            if (v.includes('/')) {
                path = v.split('/').map((pp) => {
                    if (!pp || pp === 'undefined') return
                    if (rootState[pp.toLowerCase()]) return new FirestoreHelpers().slugify(pp, '-', false)
                    return pp
                }).join('/')
            }
        } else if (v && typeof v === 'object') {
            if (v.id || v.slug || v.title || v.name) {
                p = '/' + (new FirestoreHelpers().slugify(v.id, '-', false) || new FirestoreHelpers().slugify(v.slug || v.title || v.name))
            }

            path = `${state.dbRootPath ? state.dbRootPath+'/' : ''}`
            path = path + `${state.subCollectionId ? state.subCollectionId+'/' : ''}`
            path = path + `${state.collectionName ? state.collectionName : ''}`
            path = path + p
        }
         */

        // dispatch('getSubCollectionId', v)
        dispatch('getSubCollectionId', path)

        if ('Log' !== path) {
            // console.info(`%c📮getPath: ${path}`, consoleInfoStyles)
        }

        // GET/SET HOOKS
        hooks.create(`${state.collectionName}_getPath_after_get`, path)
        hooks.create(`${state.collectionName}_getPath_after_set`, (p) => {
            if (!p) {
                path = p
            }
        })

        return path
    },

    getFormattedData({ state }, data) {
        const formattedData = new state.class(data).merge().write().format('write')
        return new state.class(formattedData).merge().read().format('read')
    },

    getSubCollectionId({ commit }, v) {
        let preId
        if (v && (typeof v == 'string' || v instanceof String)) {
            preId = null
        } else if (v && typeof v === 'object') {
            if (v.subCollectionId) {
                preId = v.subCollectionId
            }
        }

        if (preId) {
            commit('SET_KEY', {
                key: 'subCollectionId',
                value: preId
            })
        }
    },

    /**
     * Search data collection
     * @param _ Ignore
     * @param data
     * @returns {Promise<*>}
     */
    async search ({ state, commit, dispatch }, data = [ 'slug', '>', '' ]) {
        if (!this.$db) return Promise.resolve(false)

        const response = await this.$db._search_collection({
            path: await dispatch('getPath'),
            field: data[0],
            operator: data[1],
            term: data[2],
            limit: 50
        }, state.dataConverter)

        if (response) {
            await commit('SET_SEARCH', response)
        }

        return response
    },

    /**
     * Add data to collection
     * @param state
     * @param commit Ignore
     * @param dispatch
     * @param data If data has an ID, it will UPDATE the document
     * @returns {Promise<boolean|*>}
     */
    async add ({ state, commit, dispatch }, data) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            let response = null
            const dataPosition = (data.position ? data.position : 'push')

            // Don't want this to be saved to db
            if (data.position) {
                delete data.position
            }

            response = await this.$db._add(await dispatch('getPath', data), state.dataConverter, data)

            if (response) {
                // Prepare data for instant UI update
                const formattedDataRead = await dispatch('getFormattedData', data)

                if ('Log' !== state.collectionName) {
                    await commit('PUSH_TO_LOADED', formattedDataRead)
                    await commit('PUSH_TO_ALL', {
                        data: formattedDataRead,
                        position: dataPosition
                    })
                }

                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.success'), color: 'green' })
                }

                // GET/SET HOOKS
                hooks.create(`${state.collectionName}_add_after`, formattedDataRead)

                return formattedDataRead

            } else {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
                }
                if ('Log' !== state.collectionName) {
                    dispatch('log/add', {
                        comp: state.collectionName, msg: 'add / step 1', val: response
                    }, { root: true })
                }
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_add_after`, response)

            return response

        } catch (e) {
            if (state.showNotifications) {
                this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
            }
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'add / step 2', val: e
                }, {root: true})
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Add data to collection
     * @param state
     * @param commit Ignore
     * @param dispatch
     * @param data If data has an ID, it will UPDATE the document
     * @returns {Promise<boolean|*>}
     */
    async save ({ state, commit, dispatch }, data) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            let response = null
            const dataPosition = (data.position ? data.position : 'push')
            const path = await dispatch('getPath', data)

            // Prepare data for instant UI update
            let formattedData = await dispatch('getFormattedData', data)

            // Don't want this to be saved to db
            delete data.position
            delete data.path
            delete data.joined
            delete data.timeAgo

            // EXISTING DOC
            if ('id' in data || 'slug' in data) {
                console.log('SAVE > existing doc', path, data)
                // data.slug = (new FirestoreHelpers().slugify(data.id, '-', false) || new FirestoreHelpers().slugify(data.slug || data.title || data.name))
                data.slug = (new FirestoreHelpers().slugify(data.id, '-', false) || new FirestoreHelpers().slugify(data.slug || data.name))
                data.id = data.slug
                data.updated_at = new Date()
                if (!data.created_at) {
                    data.created_at = new Date()
                } else {
                    delete data.created_at
                    delete data.timeAgo
                }
                // Disable data-converter for 'updating'. As it might over-ride data.
                // console.log('BEFORE SAVE', data)
                // TODO: WE NEED TO MAKE THIS RUN THROUGH THE CONVERTER WITHOUT BREAKING
                response = await this.$db._update(path, null, data, true)
                // response = await this.$db.update(await dispatch('getPath', data), state.dataConverter, data, true)
            }
            // NEW DOC
            else if (!data.created_at && (formattedData.id || formattedData.slug) ) {
                console.log('SAVE > new doc', path, data)
                data.id = formattedData.id || formattedData.slug || null
                response = await this.$db._update(path, state.dataConverter, data)
            }
            // NEW DOC SAFETY
            else {
                // Added 2023-01-20
                //console.log('DATA BEFORE UPDATE', data)
                response = await this.$db._update(path, state.dataConverter, data)
                // response = await this.$db._add(path, state.dataConverter, data)
                // Added 2023-01-20
                formattedData = await dispatch('getFormattedData', data)
                //console.log('SAVE > new doc safety', data, formattedData)
            }

            if (response) {
                if ('Log' !== state.collectionName) {
                    await commit('PUSH_TO_LOADED', formattedData)
                    await commit('PUSH_TO_ALL', { data: formattedData, position: dataPosition })
                }

                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.success'), color: 'green' })
                }

                // GET/SET HOOKS
                hooks.create(`${state.collectionName}_save_after`, formattedData)

                return formattedData

            } else {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
                }
                if ('Log' !== state.collectionName) {
                    dispatch('log/add', {
                        comp: state.collectionName, msg: 'save / step 1', val: response
                    }, { root: true })
                }
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_save_after`, response)

            return response

        } catch (e) {
            if (state.showNotifications) {
                this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
            }
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'save / step 2', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Update data document
     * @param commit Ignore
     * @param rootState Ignore
     * @param state Ignore
     * @param data Include uid, path
     * @returns {Promise<void>}
     */
    async update ({ state, commit, dispatch }, data) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            const dataPosition = (data.position ? data.position : 'push')
            if (data.position) delete data.position
            // if (data.created_at) delete data.created_at
            data.updated_at = new Date()

            const path = await dispatch('getPath', data)
            const response = await this.$db._update(path, state.dataConverter, data, true)

            if (response) {
                // Prepare data for instant UI update
                const formattedDataRead = await dispatch('getFormattedData', data)

                await commit('PUSH_TO_LOADED', data)
                await commit('PUSH_TO_ALL', {
                    data: formattedDataRead,
                    position: dataPosition
                })

                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.success'), color: 'green' })
                }

                // GET/SET HOOKS
                hooks.create(`${state.collectionName}_update_after`, formattedDataRead)

                return formattedDataRead

            } else {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
                }
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'update', val: data
                }, { root: true })
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_update_after`, response)

            return response

        } catch (e) {
            if (state.showNotifications) {
                this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
            }
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'update', val: data
                }, { root: true })
            }
            throw new Error( e )

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Update a specific field of data, will not go through the data modifier
     * dispatch('users/updateField', {
     *     id: user.value.uid,
     *     customInput: 'CustomValue'
     * })
     *
     * @param rootState Ignore
     * @param state Ignore
     * @param commit Ignore
     * @param data The value of the field
     * @returns {Promise<*>}
     */
    async updateField ({ state, commit, dispatch }, data) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            if (!data || !data.id) {
                // console.log('updateField, No ID specified')
                return Promise.resolve(false)
            }
            const path = await dispatch('getPath', data)
            delete data.id
            const newData = data
            newData.updated_at = new Date()

            const response = await this.$db._update(path, null, newData)

            if (response) {
                // Prepare data for instant UI update
                const formattedDataRead = await dispatch('getFormattedData', data)
                await commit('UPDATE_FIELD', { data:data.id, formattedDataRead })

                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.success'), color: 'green' })
                }

                // GET/SET HOOKS
                hooks.create(`${state.collectionName}_updateField_after`, formattedDataRead)

                return formattedDataRead
            } else {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
                }
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'updateField', val: response
                }, { root: true })
            }

            return response

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'updateField', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Get a single document
     * @param state Ignore
     * @param commit Ignore
     * @param dispatch Ignore
     * @param path The document that you want to get
     * @returns {Promise<boolean|*>}
     */
    async getOne ({ state, commit, dispatch }, path) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            // Error Handling
            if (!path || path === 'undefined' || path.path === 'undefined') {
                return dispatch('getDefault')
            }

            // Get a currently loaded object, save on the db queries
            // Get a currently loaded object, save on the db queries
            // This could be put into $ttlStorage, so it expires after a period of time
            let loadedPath = path.path ? path.path : path
            if (loadedPath.includes('/')) {
                const pathParts = loadedPath.split('/')
                loadedPath = pathParts[pathParts.length - 1]
            }
            // console.log('GET ONE', loadedPath, state.loaded)

            if (state.loaded && state.loaded[loadedPath]) {
                console.info(`%c🔄Getting PreLoaded: ${loadedPath}`, consoleInfoStyles)

                await commit('SET_ONE', state.loaded[loadedPath])
                return state.loaded[loadedPath]
            }

            // 2023-03-03 updated path to help eliminate issues with object pathing
            const response = await this.$db._get_one(await dispatch('getPath', path.path || path), state.dataConverter)

            if (response) {
                await commit('SET_ONE', response)
                await commit('PUSH_TO_LOADED', response)
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_getOne_after`, response)

            return response

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'getOne', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Get all documents from a collection
     * @param state
     * @param commit Ignore
     * @param dispatch
     * @param data If you need to filter down the data using WHERE
     * @returns {Promise<boolean|*>}
     */
    async getAll ({ state, commit, dispatch }, data = {}) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            if ((typeof data == 'string' || data instanceof String)) {
                await commit('SET_KEY', { key: 'subCollectionId', value: data })
                data = {}
            }
            const path = await dispatch('getPath', data)
            const where = (data.where ? data.where : null)
            // const order = (data.order ? data.order : { by:'created_at', direction:'desc' })
            const order = (data.order ? data.order : null)
            const limit = (data.limit ? data.limit : 500)
            const direction = (data.direction ? data.direction : null)
            const paginate = (data.paginate ? data.paginate : false)
            const returnData = (data.return ? data.return : false)

            let response = await this.$db._get_all(path, where, state.dataConverter, order, limit, paginate, direction)

            if (data.join) {
                response = await dispatch('join', { data: response, ...data.join })
            }

            if (response) {
                if (!returnData) {
                    await commit('SET_ALL', response)
                }
                await commit('PUSH_TO_LOADED', response)
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_getAll_after`, response)

            return response

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'getAll', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Paginate documents from a collection
     * @param state Ignore
     * @param commit Ignore
     * @param dispatch Ignore
     * @param data If you need to filter down the data using WHERE
     * @returns {Promise<boolean|*>}
     */
    async paginate ({ state, commit, dispatch }, data = {}) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            hooks.create(`${state.collectionName}_paginate_before`, data)

            const response = await dispatch('getAll', data)

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_paginate_after`, response)

            return response

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'paginate', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Remove a document
     * @param state
     * @param commit Ignore
     * @param dispatch
     * @param path Path of document to delete
     * @returns {Promise<boolean|*>}
     */
    async remove ({ state, commit, dispatch }, path) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            const response = await this.$db._delete_doc( await dispatch('getPath', path) )

            if (response) {
                await commit('REMOVE_ONE', path)

                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.success'), color: 'green' })
                }
            } else {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.error_try_again'), color: 'red' })
                }
            }

            // GET/SET HOOKS
            hooks.create(`${state.collectionName}_remove_after`, {
                response,
                path
            })

            return response

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'remove', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Listen to the collection
     * @param state Ignore
     * @param commit Ignore
     * @param dispatch Ignore
     * @param path Path to collection other than the root
     * @param where
     * @param limit Limit your results
     * @param position Push/Unshift data
     * @param orderBy
     * @param orderDirection
     * @returns {Promise<void>}
     */
    async listen ({ state, commit, dispatch }, { path, where = [], limit = 25, position = 'push', orderBy = 'created_at', orderDirection = 'asc' }) {
        if (!this.$db) return Promise.resolve(false)
        const fire = this.$db.fire()

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })
        const responseData = ref([])
        // let responseData = []

        try {
            // Path can mess up the formatting for those that don't have stores
            // path = await dispatch('getPath', path)
            // commit('SET_ALL', [])

            // TODO: SHOULD BE MOVED TO FB.JS

            const pathSplit = path.split('/')
            const queryConstraints = []
            let collectionDoc

            if ( (pathSplit.length % 2) === 0 ) {
                collectionDoc = fire.doc(fire.fs, path)
            } else {
                collectionDoc = fire.collection(fire.fs, path)
                queryConstraints.push( fire.orderBy(orderBy, orderDirection) )
                queryConstraints.push( fire.limitToLast(limit) )
            }

            if ( where && (where.length >= 3) ) {
                queryConstraints.push( fire.where(where[0],where[1],where[2]) )
            }

            console.info(`%c👂Listening: ${path} WHERE: ${JSON.stringify(where)}, ORDER: ${JSON.stringify(orderBy)}, LIMIT: ${limit}`, consoleListeningStyles)

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(state.dataConverter)

            let unsubscribeListener = fire.onSnapshot( q, (snapshot) => {
                // DOCUMENT
                if ( (pathSplit.length % 2) === 0 ) {
                    const data = { id: snapshot.id, ...snapshot.data() }

                    // console.log('snap data 1', data)
                    // TODO: Should we format data here?
                    responseData.value = data

                    // GET/SET HOOKS
                    hooks.create(`${state.collectionName}_listen_after`, responseData.value)
                }
                // COLLECTION
                else {
                    snapshot.docChanges().forEach(async (change) => {
                        const data = { id: change.doc.id, ...change.doc.data() }
                        let formattedData

                        try {
                            data.created_at = data.created_at.toDate().toDateString()
                        } catch { /**/ }

                        formattedData = await dispatch('getFormattedData', data)

                        if (change.type === 'added' || change.type === 'modified') {
                            commit('PUSH_TO_ALL', {data: formattedData, parent, position})
                            commit('PUSH_TO_LOADED', formattedData)

                            responseData.value.push(formattedData)

                        } else if (change.type === 'removed') {
                            commit('REMOVE_ONE', (formattedData.id || formattedData.slug))
                        }
                    })

                    // GET/SET HOOKS
                    // hooks.create(`${state.collectionName}_listen_after`, responseData.value)
                    hooks.create(`${state.collectionName}_listen_after`, state.all)
                }
            })
            // If we need to un-sub a listener
            listeners.push(unsubscribeListener)
            // return responseData.value
            return state.all

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'listen', val: e
                }, { root: true })
            }
            responseData.value = false

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }

        return Promise.resolve(true)
    },

    async muteListeners (_, which=null) {
        if (!which) {
            if (listeners.length === 0) return

            listeners.forEach((listener) => {
                listener()
            })
        }
    },

    /**
     * Does collection/doc exists
     * @param state Ignore
     * @param commit Ignore
     * @param dispatch Ignore
     * @param path
     * @returns {Promise<boolean|*>}
     */
    async exists ({ state, commit, dispatch}, path) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            // Get a currently loaded object, save on the db queries
            if (state.loaded && state.loaded[path]) {
                return state.loaded[path]
            }
            const thePath = await dispatch('getPath', path)
            console.log('EXISTS', thePath)
            const response = await this.$db._get_one(thePath, state.dataConverter)

            if (response) {
                if (state.showNotifications) {
                    this.$notify.show({ text: this.$i18n.t('notify.exists_already'), color: 'orange'})
                }
                return Promise.resolve(true)
            }

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'exists', val: e
                }, { root: true })
            }

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
        return Promise.resolve(false)
    },

    /**
     * Join data to the loop
     * join: {
     *     path: 'Users',
     *     key: 'id',
     *     getKey: 'uid'
     * }
     * @param state
     * @param commit
     * @param dispatch
     * @param data
     * @param path
     * @param by
     * @param value
     * @param label
     * @returns {Promise<null|boolean>}
     */
    async join ({ state, commit, dispatch }, { data = null, path = '', pathKey = 'id', currentKey = null, label = 'joined' }) {
        if (!this.$db) return Promise.resolve(false)
        const fire = this.$db.fire()

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            const newPath = path.charAt(0).toUpperCase() + path.slice(1)

            if (!data) return Promise.resolve(false)

            // join
            for(const k in data) {
                // DATA EXISTS IN CURRENTLY LOADED
                if (dataJoins[data[k][currentKey]]) {
                    console.log('JOIN > Loading data from currently loaded')
                    data[k][label] = dataJoins[data[k][currentKey]]
                }
                    // GET DATA FROM FIRESTORE
                // TODO: Perhaps we should use the internal store to GETALL
                else {
                    console.info(`%c✨Joining From: ${newPath} Key:${pathKey} = ${currentKey} Labeled: ${label}`, consoleJoinStyles)

                    const q = fire.query(
                        fire.collection(fire.fs, newPath),
                        fire.where(pathKey, '==', data[k][currentKey])
                    )
                    await fire.getDocs(q).then((docs) => {
                        const joinLoopData = []
                        docs.forEach((doc) => {
                            joinLoopData.push(doc.data())
                        })
                        // If there is only 1 object, just return the object, not the array
                        if (joinLoopData.length <= 1) {
                            data[k][label] = joinLoopData[0]
                            dataJoins[data[k][currentKey]] = joinLoopData[0]
                        } else {
                            data[k][label] = joinLoopData
                            dataJoins[data[k][currentKey]] = joinLoopData
                        }
                    })
                }
            }
            return data

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'join', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },

    /**
     * Group Collection Reference
     * @param state Ignore
     * @param commit Ignore
     * @param dispatch Ignore
     * @param where
     * @param limit
     * @param order
     * @param join
     * @returns {Promise<boolean|*>}
     */
    async group ({ state, commit, dispatch }, { where = {}, limit = 25, order = {}, join = null }) {
        if (!this.$db) return Promise.resolve(false)

        commit('SET_KEY', 'loading', true)
        commit('SET_APP_LOADING', true, { root: true })

        try {
            const data = await this.$db._group(state.collectionName, where, state.dataConverter, order, limit)

            if (data) {
                commit('PUSH_TO_ALL', { data, position:'push' })
                commit('PUSH_TO_LOADED', data)

                if (join) {
                    const joinedData = await dispatch('join', { data, ...join })
                    console.log('joinedData', joinedData)
                    return joinedData
                }
            }

            return data

        } catch (e) {
            if ('Log' !== state.collectionName) {
                dispatch('log/add', {
                    comp: state.collectionName, msg: 'group', val: e
                }, { root: true })
            }
            return Promise.resolve(false)

        } finally {
            commit('SET_KEY', 'loading', false)
            commit('SET_APP_LOADING', false, { root: true })
        }
    },
}

