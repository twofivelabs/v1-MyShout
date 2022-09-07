// import { defineNuxtPlugin } from '@nuxtjs/composition-api'
export default ({ app }, inject) => {
  inject('wp', {
    async get_all (what, limit = 25) {
      const url = `/wp/wp-json/wp/v2/${what}?per_page=${limit}`
      return app.$axios.$get(url)
        .then((res) => {
          return res
        })
        .catch((e) => {
          app.$system.log({
            comp: 'wp',
            msg: 'get_all',
            val: e
          })
          return false
        })
    },
    async get_one (what, id) {
      try {
        const url = `/wp/wp-json/wp/v2/${what}/${id}`
        return app.$axios.$get(url)
          .then((res) => {
            return res
          })
          .catch((e) => {
            app.$system.log({
              comp: 'wp',
              msg: 'get_one',
              val: e
            })
            return false
          })
      } catch(e) {
        app.$system.log({
          comp: 'wp',
          msg: 'get_one 2',
          val: e
        })
        return false
      }
    },
    async update (path, dataConverter = null, data, merge = true) {
      try {
        // console.log('PATH', path, 'DATA', data)
        let updateThis = await app.$fire.firestore.doc(path)
        if (dataConverter) {
          updateThis = updateThis.withConverter(dataConverter)
        }
        return await updateThis.set(data, { merge })
          .then(() => {
            return true
          })
          .catch((e) => {
            app.$system.log({
              comp: 'wp',
              msg: 'update',
              val: e
            })
            return false
          })
      } catch(e) {
        app.$system.log({
          comp: 'wp',
          msg: 'update 2',
          val: e
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
            // data.created_at = new Date() // This is purely for responsive dates
            return data
          })
          .catch((e) => {
            app.$system.log({
              comp: 'wp',
              msg: 'add',
              val: e
            })
            return false
          })
      } catch (e) {
        app.$system.log({
          comp: 'wp',
          msg: 'add 2',
          val: e
        })
        return false
      }
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
              comp: 'wp',
              msg: 'delete_doc',
              val: e
            })
            return false
          })
      } catch(e) {
        app.$system.log({
          comp: 'wp',
          msg: 'delete_doc 2',
          val: e
        })
        return false
      }
    }
  })
}
