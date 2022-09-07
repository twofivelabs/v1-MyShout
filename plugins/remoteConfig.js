export default ({ app }, inject) => {
  inject('remoteConfig', {
    async load () {
      await app.$fire.remoteConfig.fetchAndActivate()
    },
    get (param, parse = false) {
      try {
        const value = app.$fire.remoteConfig.getValue(param)
        let returnVal = value._value
        if (parse && value._value) {
            try {
                returnVal = JSON.parse(value._value)
            } catch {
                // ... THIS ELEMENT DIDNT NEED TO PARSE JSON
            }
        }
        return returnVal
      } catch (e) {
        console.log('Error trying to load remote config get()')
      }
    }
  })
}
