// import { defineNuxtPlugin } from '@nuxtjs/composition-api'
const listeners = []

export default ({ app }, inject) => {
  inject('db', {
    set_doc (path) {
      return app.$fire.firestore.doc(path)
    },
    async create_relationship (currentPath, relationshipCollectionPath) {
      const ref = await app.$fire.firestore.doc(currentPath)
      await app.$fire.firestore.doc(relationshipCollectionPath).set({ ref }, { merge: true })
    },
    async search_collection ({
      path,
      term,
      field = 'title',
      operator = '>',
      limit = null
    }, dataConverter = null) {
      // If the TERM is a number, search for a number not a string
      if(app.$helper.hasOnlyDigits(term)) {
          term = parseInt(term)
      }
      console.log('SEARCH', path, field, operator, term)
      let searchRef = app.$fire.firestore
        .collection(path)
        .where(field, operator, term)
      if (operator !== '==') {
        searchRef.orderBy(field, 'asc')
      }
      if (limit) {
        searchRef = searchRef.limit(limit)
      }
      if (dataConverter) {
        searchRef = searchRef.withConverter(dataConverter)
      }
      return await searchRef.get()
        .then((docs) => {
          const data = []
          docs.forEach((doc) => {
              const d = doc.data()
              d.id = doc.id
              data.push(d)
          })

          return data
        }).catch((e) => {
          app.$system.log({
              comp: 'Firebase',
              msg: `SEARCH_COLLECTION: ${path}`,
              val: e
          })
          return false
        })
    },
    async unsubscribeToAllListeners () {
      if (listeners.length > 0) {
        listeners.forEach((listener) => {
          listener()
        })
      }
    },
    async listen (what, where = {}, dataConverter) {
      let response = []
      try {
          let listenTo = await app.$fire.firestore.collection(what).withConverter(dataConverter)
          if (where && where.field && where.op && where.value) {
            listenTo = listenTo.where(where.field, where.op, where.value)
          }
          let unsubscribe = await listenTo.onSnapshot((docs) => {
            response = [] // reset
            docs.forEach((doc) => {
              const data = doc.data()
              data.id = doc.id
              response.push(data)
            })
          })
          listeners.push(unsubscribe)
          return response
      } catch {
            return false
      } finally {
        console.log('FINALLY', response)
      }
    },
    async get_all (what, where = {}, dataConverter, order = {}, limit = null) {
      let getAll = await app.$fire.firestore.collection(what).withConverter(dataConverter)
      if (Array.isArray(where)) {
        where.forEach((w) => {
          getAll = getAll.where(w.field, w.op, w.value)
        })
      } else if (where && where.field && where.op && where.value) {
        getAll = getAll.where(where.field, where.op, where.value)
      }
      if (order && order.by && order.direction) {
        getAll = getAll.orderBy(order.by, order.direction)
      }
      if (limit) {
        getAll = getAll.limit(limit)
      }

      return await getAll.get()
        .then((docs) => {
          const allData = []
          // This could be better by using OBJECT and not an array for working within the store
          // obj[ID]... vs/looping
          docs.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            allData.push(data)
          })
          return allData
        }).catch((e) => {
          app.$system.log({
              comp: 'Firebase',
              msg: `GET_ALL: ${what}, ${where}`,
              val: e
          })
          return false
        })
    },
    async get_one (path, dataConverter) {
      try {
        return await app.$fire.firestore
          .doc(path)
          .withConverter(dataConverter)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data()
              data.id = doc.id
              return { ...data }
            }
            return false
          }).catch((e) => {
            app.$system.log({
                comp: 'Firebase',
                msg: `GET_ONE: ${path}`,
                val: e
            })
            return false
          })
      } catch(e) {
        app.$system.log({
          comp: 'Firebase',
          msg: `GET_ONE 2: ${path}`,
          val: e
        })
        return false
      }
    },
    async update (path, dataConverter = null, data, merge = true) {
      try {
        let updateThis = await app.$fire.firestore.doc(path)
        if (dataConverter) {
          updateThis = updateThis.withConverter(dataConverter)
        }
        // console.log('UPDATE DATA', data)
        return await updateThis.set(data, { merge })
          .then(() => {
            return true
          })
          .catch((e) => {
            app.$system.log({
              comp: 'Firebase',
              msg: `UPDATE: ${path}`,
              val: { error: e, data: data }
            })
            return false
          })
      } catch (e) {
        app.$system.log({
          comp: 'Firebase',
          msg: `UPDATE 2: ${path}`,
          val: { error: e, data: data }
        })
        return false
      }
    },
    async add (path, dataConverter = null, data) {
      try {
        let addThis = await app.$fire.firestore.collection(path)
        if (dataConverter) {
          addThis = addThis.withConverter(dataConverter)
        }
        return await addThis.add(data)
          .then((response) => {
            data.id = response.id
            return data
          })
          .catch((e) => {
            app.$system.log({
              comp: 'Firebase',
              msg: `ADD: ${path}`,
              val: { error: e, data: data }
            })
            return false
          })
      } catch (e) {
          app.$system.log({
              comp: 'Firebase',
              msg: `ADD 2: ${path}`,
              val: { error: e, data: data }
          })
        return false
      }
    },
    async group (what, where = {}, dataConverter, order = {}, limit = null) {
          let getAll = await app.$fire.firestore.collectionGroup(what).withConverter(dataConverter)
          console.log('WHERE', where)
          if (Array.isArray(where)) {
              where.forEach((w) => {
                  getAll = getAll.where(w.field, w.op, w.value)
              })
          } else if (where && where.field && where.op && where.value) {
              getAll = getAll.where(where.field, where.op, where.value)
          }
          if (order && order.by && order.direction) {
              getAll = getAll.orderBy(order.by, order.direction)
          }
          if (limit) {
              getAll = getAll.limit(limit)
          }

          return await getAll.get()
              .then((docs) => {
                  const allData = []
                  // This could be better by using OBJECT and not an array for working within the store
                  // obj[ID]... vs/looping
                  docs.forEach((doc) => {
                      const data = doc.data()
                      data.id = doc.id
                      allData.push(data)
                  })
                  return allData
              }).catch((e) => {
                  app.$system.log({
                      comp: 'Firebase',
                      msg: 'group',
                      val: e
                  })
                  return false
              })
      },
    async delete_doc (path) {
      try {
        return await app.$fire.firestore
          .doc(path)
          .delete()
          .then(() => {
            return true
          })
          .catch((e) => {
            app.$system.log({
              comp: 'Firebase',
              msg: `DELETE_DOC: ${path}`,
              val: e
            })
            return false
          })
      } catch(e) {
        app.$system.log({
          comp: 'Firebase',
          msg: `DELETE_DOC 2: ${path}`,
          val: e
        })
        return false
      }
    },
    async upload({
        path = null,
        data = null,
        base64 = false
    }) {
        if (!path) {
            return false
        }
        let uploadResponse
        if (base64) {
            uploadResponse = await app.$fire.storage.ref(path).putString(data, 'base64')
        } else if (data) {
            uploadResponse = await app.$fire.storage.ref(path).put(data)
        }
        if ('success' === uploadResponse.state) {
            return await uploadResponse.ref.getDownloadURL()
        }
        return false
    }
  })
}
