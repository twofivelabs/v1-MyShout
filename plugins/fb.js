import {
    addDoc,
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    endAt,
    endBefore,
    getCountFromServer,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    limitToLast,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    startAfter,
    startAt,
    where,
    FieldValue,
    arrayUnion,
    arrayRemove,
    increment
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    linkWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signOut,
    initializeAuth,
    PhoneAuthProvider,
    RecaptchaVerifier,
} from 'firebase/auth'
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadString,
} from 'firebase/storage'

import { Capacitor  } from '@capacitor/core'
import {getMessaging, getToken, onMessage} from 'firebase/messaging'
import {onBackgroundMessage} from 'firebase/messaging/sw'
import {getAnalytics, logEvent} from 'firebase/analytics'
import {getFunctions, httpsCallable} from 'firebase/functions'

import firebaseApp from './../firebaseConfig'

import {filter} from 'lodash'
import { FirebaseAuthentication } from '@capacitor-firebase/authentication'
import Vue from "vue"

const fs = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const capAuth = FirebaseAuthentication
const storage = getStorage(firebaseApp)
let messaging

try {
    messaging = getMessaging(firebaseApp);
} catch (err) {
    console.error('Failed to initialize Firebase Messaging', err);
}

const analytics = getAnalytics(firebaseApp)
const functions = getFunctions(firebaseApp)
const app = firebaseApp

const fire = {
    app,
    capAuth,
    fs, onSnapshot, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, collection, collectionGroup, query, limitToLast, endBefore, startAfter, limit, startAt, endAt, where, orderBy,
    FieldValue, arrayUnion, arrayRemove, increment,
    auth, PhoneAuthProvider, RecaptchaVerifier, sendPasswordResetEmail, signOut, sendEmailVerification, createUserWithEmailAndPassword, EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword, signInWithPhoneNumber,
    storage,
    messaging, getToken, onMessage, onBackgroundMessage,
    analytics, logEvent,
    functions, httpsCallable
}

const listeners = []
const paginationMarkers = {}

const consoleFbStyles = [
    'color: #ff6719',
    'background: transparent',
    'border: 1px solid #ff6719',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')
const consoleGreenStyles = [
    'color: #0bbe4d',
    'background: transparent',
    'border: 1px solid #0bbe4d',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')
const consoleYellowStyles = [
    'color: #ffdd00',
    'background: transparent',
    'border: 1px solid #ffdd00',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')


export default ({ app, store }, inject) => {
    function upperFirstChar(v) {
        if (typeof v === "string") {
            return v.charAt(0).toUpperCase() + v.slice(1)
        }
        return v
    }
    function parse_path(path, data=null) {
        let storeToUseAll = path
        let storeToUseOne = path
        let storeToUse = path
        let pathId = path
        let newPath
        let slug

        path = upperFirstChar(path)
        newPath = path

        // Check for ID in object data
        if (data && typeof data === 'object') {
            if (data.id || data.slug || data.name) {
                const additionalPath = (app.$helper.slugify(data.id, '-', false) || app.$helper.slugify(data.slug || data.name))
                slug = additionalPath
                if (!path?.includes(additionalPath)) {
                    //path = path + '/' + additionalPath
                }
            }
        }
        if (path && path?.includes('/')) {
            let pathParts = path.split('/')

            pathId = pathParts[pathParts?.length - 1]
            slug = pathId
            storeToUseAll = pathParts[pathParts?.length - 1].toLowerCase()
            storeToUseOne = pathParts[pathParts?.length - 2].toLowerCase()
            storeToUse = store.state[storeToUseOne] ? storeToUseOne : storeToUseAll

            // Auto capitalize the elements in the string
            /* newPath = pathParts.map((p) => {
                if (!p || p === 'undefined') return
                if (p === slug) return p
                return upperFirstChar(p)
            }).join('/') */
            //.replace(/\/+$/, '')
        }

        // verify
        if (!store.state[storeToUseOne]) {
            storeToUseOne = storeToUseOne?.toLowerCase()
        }
        if (!store.state[storeToUseAll]) {
            storeToUseAll = storeToUseAll?.toLowerCase()
        }
        if (!store.state[storeToUse]) {
            storeToUse = storeToUse?.toLowerCase()
        }

        return {
            newPath, storeToUseAll, storeToUseOne, storeToUse, pathId, slug
        }
    }
    function invalidPath(path) {
        let invalid = false
        if (!path) invalid = true
        else if (path?.includes('undefined')) invalid = true
        else if (path?.slice(-1) === '/') invalid = true
        else if (path?.includes('//')) invalid = true

        if (invalid) console.log('Path is invalid: ', path)
        return invalid
    }

    inject('db', {
        fire () {
            return fire
        },
        isWeb () {
            if (Capacitor.isNativePlatform()) {
                console.log('IS NATIVE')
                return false
            }
            console.log('IS WEB')
            return true
        },
        whichAuth () {
            let auth
            if (!this.isWeb()) {
                auth = initializeAuth(firebaseApp, {
                    persistence: true
                })
            } else {
                auth = getAuth()
            }
            return auth
        },
        parsePath (path) {
            return parse_path(path)
        },
        // DO NOT DIRECTLY ACCESS THESE METHODS, only through the store
        async _search_collection ({ path, term, field = 'title', operator = '>', limit = null }, dataConverter = null) {
            if (!path) return

            // If the TERM is a number, search for a number not a string
            if(app.$helper.hasOnlyDigits(term)) {
                term = parseInt(term)
            }

            console.info(`%c🔥SEARCH: ${path} ${field} ${operator} ${term}`, consoleFbStyles)

            const queryConstraints = []
            let collectionDoc

            collectionDoc = fire.collection(fire.fs, path)

            queryConstraints.push( fire.where(field, operator, term) )

            if (operator !== '==') {
                queryConstraints.push( fire.orderBy(field, 'asc') )
            }
            if (limit) {
                queryConstraints.push( fire.limit(limit) )
            }
            if (dataConverter) {
                // queryConstraints.push( fire.withConverter(dataConverter) )
            }

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

            return await fire.getDocs(q)
                .then((docs) => {
                    const data = []
                    // TODO: Perhaps don't loop the data right away, only when needed?
                    docs.forEach((doc) => {
                        data.push({ id: doc.id, ...doc.data() })
                    })
                    return data

                }).catch((e) => {
                    app.$system.log({ comp: 'Firebase', msg: `SEARCH_COLLECTION: ${path}`, val: e.message })
                    return false
                })
        },
        /**
         * This is temporary until it's cleaned up
         * @param col - Collection Name
         * @param field - field to search within
         * @param value - the value to search with
         * @returns {Promise<boolean>}
         */
        async simpleSearch (col, field, value) {
            if (!value || value?.length < 3) {
                console.log('Search with a minimum of 2 characters')
                return false
            }

            const queryConstraints = []
            let collectionDoc
            collectionDoc = fire.collection(fire.fs, col)

            queryConstraints.push( fire.orderBy(field, 'asc') )
            queryConstraints.push( fire.startAt(value) )
            queryConstraints.push( fire.endAt(`${value}~`) )
            queryConstraints.push( fire.limit(50) )

            console.info(`%c🔍 SEARCH: ${upperFirstChar(col)} WHERE: ${value}`, consoleFbStyles)

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(null)

            return await fire.getDocs(q).then(snapshot => {
                if (snapshot.empty) {
                    console.info(`%c🔍 SEARCH: Empty`, consoleFbStyles)
                    return false
                }

                const allData = []

                snapshot.docs.forEach((doc) => {
                    allData.push({ id: doc.id, ...doc.data() })
                })

                return allData
            })
        },
        async search (v, options={}) {
            // Min input length before searching
            //const localItems = []
            //const localItems = new Set()

            if (!v || v.length < 3) {
                console.log('Search with a minimum of 2 characters')
                return false
            }

            v = v.trim().toLowerCase()
            const queryConstraints = []
            let collectionDoc

            collectionDoc = fire.collectionGroup(fire.fs, 'Searches')

            queryConstraints.push( fire.orderBy('q', 'asc') )
            queryConstraints.push( fire.startAt(v) )
            queryConstraints.push( fire.endAt(`${v}~`) )
            queryConstraints.push( fire.limit(50) )
            if (options?.collection) {
                queryConstraints.push( fire.where('collection', '==', upperFirstChar(options.collection)) )
            }

            console.info(`%c🔍 SEARCH: ${upperFirstChar(options.collection)}/Searches WHERE: ${v}`, consoleFbStyles)

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(null)

            return await fire.getDocs(q).then(r => {
                const dataPathCheck = {}

                // Loop docs
                const newDataArray = r.docs.map(async (doc) => {
                    if (options?.getFullDoc === true) {
                        if (!dataPathCheck[doc.data().path]){
                            // Set 'has checked'
                            dataPathCheck[doc.data().path] = doc.data().path

                            const res = await this._get_one(doc.data().path, null, true)
                            if (res) return res
                        }
                    } else {
                        return {
                            text: doc.data().name,
                            value: `${doc.data().q}-${doc.data().name}`,
                            path: doc.data().path,
                        }
                    }
                    // return { id: doc.id, ...doc.data() }
                })

                return Promise.all(newDataArray).then((results) => {
                    return results.filter(e => e != null)
                })
            })
        },
        async unsubscribeToAllListeners () {
            if (listeners.length > 0) {
                listeners.forEach((listener) => {
                    listener()
                })
            }
        },
        async _listen (what, where = {}, dataConverter, orderBy={}) {
            let response = []

            try {
                const queryConstraints = []
                let collectionDoc

                collectionDoc = fire.collection(fire.fs, what)
                // queryConstraints.push( fire.withConverter(dataConverter) )

                if (where && where.field && where.op && where.value) {
                    queryConstraints.push( fire.where(where.field, where.op, where.value) )
                }
                if (orderBy && orderBy.field) {
                    queryConstraints.push( fire.orderBy(orderBy.field, orderBy.direction || 'asc') )
                }

                const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

                let unsubscribe = await fire.onSnapshot( q, (docs) => {
                    response = [] // reset
                    docs.forEach((doc) => {
                        response.push({ id: doc.id, ...doc.data() })
                    })
                })

                listeners.push(unsubscribe)
                return response

            } catch (e) {
                app.$system.log({ comp: 'Firebase', msg: `LISTEN: ${what}, ${JSON.stringify(where)}`, val: e.message })
                return false

            } finally {
                console.info(`%c🔥LISTEN FINALLY: ${response}`, consoleYellowStyles)
            }
        },
        /**
         * IF you are missing the "CREATED_AT" field, this will return ZERO results
         * @param what
         * @param where
         * @param dataConverter
         * @param order
         * @param limit
         * @param paginate
         * @param direction
         * @returns {Promise<*[]|boolean>}
         * @private
         */
        async _get_all (what, where = {}, dataConverter, order = {}, limit = null, paginate = false, direction = 'next') {
            if (!what) return

            let pageSize = (limit ?? 15)
            let collectionDoc
            const queryConstraints = []

            collectionDoc = fire.collection(fire.fs, what)

            // WHERE STATEMENT
            if (Array.isArray(where) && where.length >= 1) {
                // multi level where statements
                if (Array.isArray(where[0])) {
                    where.forEach((w) => {
                        queryConstraints.push( fire.where(w[0], w[1], w[2]) )
                    })
                } else {
                    queryConstraints.push( fire.where(where[0], where[1], where[2]) )
                }
            }

            // ORDER STATEMENT
            if (order && order.by && order.direction) {
                queryConstraints.push( fire.orderBy(order.by, order.direction) )
            }

            // LIMIT STATEMENT
            queryConstraints.push( fire.limit(pageSize) )

            // PAGINATION STATEMENT, we require certain fields
            if (paginate) {

                if (!order || !order.by) {
                    queryConstraints.push( fire.orderBy('created_at', 'desc') )
                }

                // PAGINATE NEXT
                if (direction === 'next') {
                    if (paginationMarkers[`${what}-lastVisible`]) {
                        queryConstraints.push( fire.startAfter(paginationMarkers[`${what}-lastVisible`]) )
                        queryConstraints.push( fire.limit(pageSize) )
                    }
                }
                    // PREVIOUS
                //else if (direction === 'first') {
                else if (direction === 'first' || direction === 'previous') {
                    if (paginationMarkers[`${what}-first`]) {
                        queryConstraints.push( fire.endBefore(paginationMarkers[`${what}-first`]) )
                        queryConstraints.push( fire.limitToLast(pageSize) )
                    }
                }
            }

            console.info(`%c🔥GET_ALL: ${what} WHERE: ${JSON.stringify(where)}, ORDER: ${JSON.stringify(order)}, LIMIT: ${limit}, PAGINATE: ${paginate}, DIRECTION: ${direction}`, consoleFbStyles)

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

            if (paginate) {
                const getCountConstraints = filter(queryConstraints, (o) => {
                    if (o.type !== 'limit') return o
                })

                if (!(what in store.state.counter)) {
                    const queryTotalCount = await getCountFromServer(fire.query(collectionDoc, ...getCountConstraints))
                    store.state.counter[what] = queryTotalCount?.data()?.count
                }
            }

            return await fire.getDocs(q).then((docs) => {
                const allData = []

                // SET PAGINATION LEVEL
                if (paginate) {
                    if (!paginationMarkers[`${what}-top`]) {
                        paginationMarkers[`${what}-top`] = docs.docs[docs.docs?.length - 1]
                    }
                    // paginationMarkers[`${what}-last`] = docs.docs[docs.docs.length - 1]
                    paginationMarkers[`${what}-lastVisible`] = docs.docs[docs.docs?.length - 1]
                    paginationMarkers[`${what}-first`] = docs.docs[0]
                    // console.log('FIRST', paginationMarkers[`${what}-first`])
                }

                // TODO: Push this right onto the state, so we don't loop again?
                docs.forEach((doc) => {
                    allData.push({ id: doc.id, ...doc.data() })
                })

                return allData

            }).catch((e) => {
                app.$system.log({ comp: 'Firebase', msg: `GET_ALL: ${what}, ${where}`, val: e.message })
                return false
            })
        },
        async _count(what, where = {}) {
            if (!what) return

            let collectionDoc
            const queryConstraints = []

            collectionDoc = fire.collection(fire.fs, what)

            // WHERE STATEMENT
            if (Array.isArray(where) && where.length >= 1) {
                // multi level where statements
                if (Array.isArray(where[0])) {
                    where.forEach((w) => {
                        queryConstraints.push( fire.where(w[0], w[1], w[2]) )
                    })
                } else {
                    queryConstraints.push( fire.where(where[0], where[1], where[2]) )
                }
            }

            console.info(`%c🔥COUNT: ${what} WHERE: ${JSON.stringify(queryConstraints)}`, consoleFbStyles)

            const queryTotalCount = await getCountFromServer(fire.query(collectionDoc, ...queryConstraints))
            return queryTotalCount?.data()?.count
        },
        async _get_one (path, dataConverter, returnIfHasData=false) {
            if (!path) return

            console.info(`%c🔥GET_ONE: ${path}`, consoleFbStyles)
            try {

                const queryConstraints = []
                let collectionDoc

                collectionDoc = fire.doc(fire.fs, path)

                const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

                return await fire.getDoc(q).then((doc) => {
                    if (returnIfHasData) {
                        if (doc.data()) {
                            return { id: doc.id, ...doc.data() }
                        }
                        return false
                    } else {
                        return { id: doc.id, ...doc.data() }
                    }

                }).catch((e) => {
                    app.$system.log({ comp: 'Firebase', msg: `GET_ONE: ${path}`, val: e.message })
                    return false
                })

            } catch(e) {
                app.$system.log({ comp: 'Firebase', msg: `GET_ONE 2: ${path}`, val: e.message })
                return false
            }
        },
        async _update (path, dataConverter = null, data, merge = true) {
            if (!path) return

            console.info(`%c🔥UPDATE, ${path}, DATA:${JSON.stringify(data)}`, consoleFbStyles)
            try {
                // Adjusted on 2023-01-20
                let docRef

                if (path.split('/').length % 2 === 0) {
                    // EVEN
                    const queryConstraints = []
                    let collectionDoc
                    collectionDoc = fire.doc(fire.fs, path)
                    docRef = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

                } else {
                    // ODD
                    docRef = doc(collection(fire.fs, path)).withConverter(dataConverter)
                    if (!data.id) {
                        data.id = docRef.id
                    }
                }

                return await fire.setDoc(docRef, data, { merge }).then(() => {
                    // return true
                    return data
                }).catch((e) => {
                    app.$system.log({ comp: 'Firebase', msg: `UPDATE: ${path}`, val: { error: e.message, data: data } })
                    return false
                })

            } catch (e) {
                app.$system.log({ comp: 'Firebase', msg: `UPDATE 2: ${path}`, val: { error: e.message, data: data } })
                return false
            }
        },
        async _add (path, dataConverter = null, data) {
            if (!path) return

            if ('Log' !== path) {
                console.info(`%c🔥ADD: ${path} ${JSON.stringify(data)}`, consoleFbStyles)
            }

            try {
                const queryConstraints = []
                let collectionDoc

                collectionDoc = fire.collection(fire.fs, path)

                if (dataConverter) {
                    // queryConstraints.push(fire.withConverter(dataConverter))
                }

                const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

                return await fire.addDoc(q, data).then((response) => {
                    data.id = response.id
                    return data
                }).catch((e) => {
                    app.$system.log({ comp: 'Firebase', msg: `ADD: ${path}`, val: { error: e.message, data: data } })
                    return false
                })

            } catch (e) {
                app.$system.log({ comp: 'Firebase', msg: `ADD 2: ${path}`, val: { error: e.message, data: data } })
                return false
            }
        },
        async _group (what, where = {}, dataConverter, order = {}, limit = null) {
            if (!what) return

            const queryConstraints = []
            let collectionDoc

            collectionDoc = fire.collectionGroup(fire.fs, what)

            if (dataConverter) {
                // queryConstraints.push(fire.withConverter(dataConverter))
            }

            if (Array.isArray(where) && where.length >= 1) {
                // multi level where statements
                if (Array.isArray(where[0])) {
                    where.forEach((w) => {
                        queryConstraints.push(fire.where(w[0], w[1], w[2]))
                    })
                } else {
                    queryConstraints.push(fire.where(where[0], where[1], where[2]))
                }
            }
            if (order && order.by && order.direction) {
                // Will require firebase INDEX
                queryConstraints.push(fire.orderBy(order.by, order.direction))
            }
            if (limit) {
                queryConstraints.push(fire.limit(limit))
            }

            console.info(`%c🔥GROUP: ${what} WHERE: ${JSON.stringify(where)}, ORDER: ${JSON.stringify(order)}, LIMIT: ${limit}`, consoleFbStyles)

            const q = fire.query( collectionDoc, ...queryConstraints ).withConverter(dataConverter)

            return await fire.getDocs(q).then((docs) => {
                const allData = []

                // TODO: Push this right onto the state, so we don't loop again?
                docs.forEach((doc) => {
                    allData.push({ id: doc.id, ...doc.data() })
                })

                return allData

            }).catch((e) => {
                app.$system.log({ comp: 'Firebase', msg: 'group', val: e.message })
                return false
            })
        },
        async _delete_doc (path) {
            if (!path) return

            try {
                const queryConstraints = []
                let collectionDoc

                collectionDoc = fire.doc(fire.fs, path)
                const q = fire.query( collectionDoc, ...queryConstraints )

                return await fire.deleteDoc(q).then(() => {
                    return true
                }).catch((e) => {
                    app.$system.log({  comp: 'Firebase', msg: `DELETE_DOC: ${path}`, val: e.message })
                    return false
                })
            } catch(e) {
                app.$system.log({ comp: 'Firebase', msg: `DELETE_DOC 2: ${path}`, val: e.message })
                return false
            }
        },

        // Use these for DIRECT ACCESS, it will collect from the store, and re-use these FB functions
        /**
         * Upload a file to fire storage
         * @param path
         * @param data
         * @param options
         * @returns {Promise<boolean|*>}
         */
        async upload(path, data, options = { 'base64': false, metadata: {} }) {
            if (invalidPath(path)) return false
            if (!data) return false

            try {
                const filePath = ref(storage, path)

                let uploadResponse
                if (options.base64) {
                    uploadResponse = await uploadString(filePath, data, 'base64')
                } else if (data) {
                    uploadResponse = await uploadBytes(filePath, data, options.metadata)
                }
                if (uploadResponse) {
                    return await getDownloadURL(filePath)
                }
                console.log('Upload Response: ', uploadResponse)
            } catch (e) {
                console.log('Trying to set storage:', e)
            }
            return false
        },
        async deleteFile(path) {
            if (invalidPath(path)) return false

            const storage = getStorage()
            const filePath = ref(storage, path)

            return await deleteObject(filePath).then(() => {
                return true
            }).catch((e) => {
                console.log('Error: deleting file', e)
                return false
            })
        },
        async count(path, data= null) {
            if (invalidPath(path)) return false
            if (!store.state) return false

            // PARSE THE PATH GIVEN
            let {newPath} = parse_path(path)
            const where = (data.where ? data.where : null)

            return await this._count(newPath, where)
        },
        async get(path, data= null) {
            if (invalidPath(path)) return false

            // PARSE THE PATH GIVEN
            let { newPath } = parse_path(path)
            // const mergedData = Object.assign({path:newPath}, {...data})

            if ( (newPath.split('/').length % 2) === 0 ) {
                const getOneRes = await this._get_one(newPath, null, true)
                return (getOneRes) ? getOneRes : false
            } else {
                const getAllRes = await this._get_all(newPath, data, null)
                return (getAllRes) ? getAllRes : false
            }
        },
        async listen_withStore(path, data= null) {
            if (invalidPath(path)) return false
            if (!store.state) return false

            let {newPath, storeToUseAll, storeToUseOne} = parse_path(path)
            const mergedData = Object.assign({path:newPath}, {...data})

            // Last element in array is in the store, it's GET ALL
            if (store.state[storeToUseAll]) {
                if (!mergedData.path) mergedData.path = upperFirstChar(storeToUseAll)
                // console.log('Listen All', mergedData)
                return await store.dispatch(`${storeToUseAll}/listen`, mergedData)
            }
            // GET ONE
            else if (store.state[storeToUseOne]) {
                if (!mergedData.path) mergedData.path = upperFirstChar(storeToUseOne)
                // We use this to determine if the path is incomplete and need to return default
                return await store.dispatch(`${storeToUseOne}/listen`, mergedData)
            }
            console.log('No store available')
            return false
        },
        // PATCH JOBS FOR MYSHOUT
        async listen(path, { where = [], limit = 25, position = 'push', orderBy = null, orderDirection =null }) {
            if (invalidPath(path)) false
            let { newPath } = parse_path(path)

            try {
                // const pathSplit = path.split('/')

                const queryConstraints = []
                let collectionDoc

                if ( (newPath.split('/').length % 2) === 0 ) {
                    collectionDoc = fire.doc(fire.fs, path)
                } else {
                    collectionDoc = fire.collection(fire.fs, path)
                    if (orderBy && orderDirection) {
                        queryConstraints.push(fire.orderBy(orderBy, orderDirection))
                        queryConstraints.push( fire.limitToLast(limit) )
                    } else {
                        queryConstraints.push( fire.limit(limit) )
                    }
                }

                if ( where && (where.length >= 3) ) {
                    queryConstraints.push( fire.where(where[0],where[1],where[2]) )
                }

                console.info(`%c👂Listening: ${path} WHERE: ${JSON.stringify(where)}, ORDER: ${JSON.stringify(orderBy)}, LIMIT: ${limit}, POS: ${position}`, consoleYellowStyles)

                const q = fire.query( collectionDoc, ...queryConstraints )
                /* fire.onSnapshot( q, (snapshot) => {
                    console.log('snapshot 1', snapshot)
                }) */
                const snapshotListener = fire.onSnapshot( q, (snapshot) => {
                        console.info(`%c👂Change: ${path}`, consoleYellowStyles)

                        // DOCUMENT
                        // if ( (pathSplit?.length % 2) === 0 ) {
                        if ( (newPath.split('/').length % 2) === 0 ) {
                            if (snapshot.empty) return({})

                            const data = { id: snapshot.id, ...snapshot.data() }
                            //store.state.listeners[path] = data
                            //console.log('TRYING TO SET WITH VUE')
                            //console.log(store.state.listeners, path, data)
                            //Vue.set(store.state.listeners, path, data)
                            // TODO: Noticed that the Chats/*** was getting an extra listener when switching to a user profile
                            try {
                                Vue.set(store.state.listeners, path, data)
                            } catch {
                                store.state.listeners[path] = data
                            }
                            // store.state.listeners[path] = data
                            return (data)
                        }

                        // COLLECTION
                        else {
                            if (snapshot.empty) return([])

                            const responseData = []
                            snapshot.docChanges().forEach(async (change) => {
                                const data = { id: change.doc.id, ...change.doc.data() }

                                try {
                                    data.created_at = data.created_at.toDate().toDateString()
                                } catch { /**/ }

                                if (change.type === 'added') {
                                    data._changeType = 'added'
                                    responseData.push(data)
                                } else if (change.type === 'modified') {
                                    data._changeType = 'modified'
                                    responseData.push(data)
                                } else if (change.type === 'removed') {
                                    data._changeType = 'removed'
                                    responseData.push(data)
                                    //commit('REMOVE_ONE', (formattedData.id || formattedData.slug))
                                }
                            })
                            Vue.set(store.state.listeners, path, responseData)
                            return (responseData)
                        }
                    })

                return snapshotListener
            } catch (e) {
                console.log('STICKY: Error listening: ', e, JSON.stringify(e))
                return Promise.resolve(false)
            }
        },

        async paginate(path, data= null) {
            if (invalidPath(path)) return false
            if (!data) return false

            let { newPath, storeToUse, storeToUseAll } = parse_path(path)
            // let { newPath, storeToUse, storeToUseAll, pathId } = parse_path(path)
            // console.log('storeToUse', newPath, storeToUse, storeToUseAll)

            if (store.state[storeToUse]) {
                if (!store.state[storeToUseAll]) {
                    data.id = storeToUseAll
                }
                const mergedData = Object.assign({paginate:true, path:newPath}, {...data})
                return await store.dispatch(`${storeToUse}/paginate`, mergedData)
            }
            return false
        },
        async save(path, data= null) {
            if (invalidPath(path)) return false
            if (!data) return false

            let response = null
            let { newPath,  /* storeToUse, storeToUseAll, pathId,  */ } = parse_path(path, data)
            // Don't want this to be saved to db
            delete data.position
            delete data.path
            delete data.joined
            delete data.timeAgo

            const pathSplit = newPath.split('/')
            const documentId = pathSplit[pathSplit.length - 1]
            let addDataWith = null

            // DOCUMENT -> Update Doc
            if ( (newPath.split('/').length % 2) === 0 ) {
                // console.log('UPDATE DOC')
                addDataWith = 'update'
            }
            // COLLECTION -> New Doc
            else {
                // console.log('NEW DOC')
                addDataWith = 'new'
            }
            // DOCUMENT -> Update Doc -> Safety Net
            if ('id' in data || 'slug' in data) {
                // console.log('UPDATE DOC')
                addDataWith = 'update'
            }

            if (addDataWith === 'update') {
                console.info(`%c💾 SAVE > Update Doc: ${newPath} ${data}`, consoleGreenStyles)
                data.id = documentId || null
                data.updated_at = new Date()
                delete data.created_at // Don't want to update this field

                response = await this._update(newPath, null, data, true)

            } else {
                console.info(`%c💾 SAVE > New Doc: ${newPath} ${data}`, consoleGreenStyles)
                data.id = data.id || data.slug || null
                data.created_at = new Date()
                //response = await this._update(newPath, null, data)
                response = await this._add(newPath, null, data)
            }

            return response || false
        },
        async save_withStore(path, data= null) {
            if (invalidPath(path)) return false
            if (!data) return false

            let { newPath, storeToUse, storeToUseAll, pathId } = parse_path(path, data)

            // storeToUseAll if it's an ID will mess things up
            if (store.state[storeToUse]) {
                if (!store.state[storeToUseAll]) {
                    if (!data.id) data.id = pathId
                }

                const mergedData = Object.assign({path:newPath}, {...data})
                // console.log('MERGED DATA', mergedData)
                return await store.dispatch(`${storeToUse}/save`, mergedData)
            }
            return false
        },
        async delete(path) {
            if (invalidPath(path)) return false

            let { newPath } = parse_path(path)

            return await this._delete_doc(newPath).then(() => {
                return true
            }).catch(() => {
                return false
            })
        },
        async delete_withStore(path) {
            if (invalidPath(path)) return false

            let { newPath, storeToUseOne } = parse_path(path)
            storeToUseOne = storeToUseOne.toLowerCase()

            if (store.state[storeToUseOne]) {
                return await store.dispatch(`${storeToUseOne}/remove`, newPath)
            }
            return false
        },
        async update(path, data) {
            if (invalidPath(path)) return false
            if (!data) return false

            let { newPath, storeToUseAll, storeToUseOne, pathId } = parse_path(path)
            storeToUseOne = storeToUseOne.toLowerCase()

            if (store.state[storeToUseOne]) {
                if (!store.state[storeToUseAll]) {
                    if (!data.id) data.id = pathId
                }
                const mergedData = Object.assign({path:newPath}, {...data})
                return await store.dispatch(`${storeToUseOne}/updateField`, mergedData)
            }
            return false
        },
        async group(path, data= {}) {
            if (invalidPath(path)) return false

            let { storeToUse, storeToUseAll } = parse_path(path)

            if (store.state[storeToUse]) {
                if (!store.state[storeToUseAll]) {
                    data.id = storeToUseAll
                }
                return await store.dispatch(`${storeToUse}/group`, data)
            }
            return false
        }
    })
}
