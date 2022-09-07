export default ({ app }, inject) => {
  inject('ttlStorage', {
    // TTL = Milliseconds (86400000 = 24 hrs)
    set (key, value, ttl = 86400000) {
      const now = new Date()
      const item = {
        value,
        expiry: now.getTime() + ttl
      }
      return app.$storage.setUniversal(key, item)
    },
    get (key) {
      const item = app.$storage.getUniversal(key)

      // if the item doesn't exist, return null
      if (!item) {
        return null
      }

      const now = new Date()

      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        app.$storage.removeUniversal(key)
        return null
      }
      return item.value
    }
  })
}
