export default ({ app, store }, inject) => {

  inject('system', {
    log (obj) {
        const timestamp = Date.now()
        let path = 'ADMIN/Log/General'
        if (obj.path || obj.comp) {
            path = `ADMIN/Log/${obj.path ? obj.path : obj.comp}`
        }
        const o = {
            timestamp: timestamp,
            uid: store.state.user.data.uid || null,
            comp: obj.comp || '*',
            msg: obj.msg || null,
        }

        if(obj.val) {
            // o.val = obj.val.toString()
            try {
                o.val = JSON.stringify(obj.val)
            } catch {
                o.val = obj.val
            }
        }
        try {
            console.log('LOGGER: ', o, JSON.stringify(o))
        } catch {
            console.log('LOGGER: ', o)
        }

        // Don't log if the value is empty
        try {
            if (Object.keys(o.val).length === 0 || !o.val) {
                return
            }
        } catch {
            // ...
        }

        if (app.$db) {
            app.$db.add(path, null, o)
        }
    },
    initDarkMode () {
        if(!app.$config.useDarkMode) {
            return
        }
        const darkMode = app.$ttlStorage.get('darkMode')
        if (darkMode === false) {
            // don't change anything
        } else if (darkMode) {
            app.vuetify.framework.theme.isDark = true
            // app.$vuetify.theme.dark = true
        } else {
            const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            darkMediaQuery.addEventListener('change', () => {
                app.vuetify.framework.theme.isDark = !app.vuetify.framework.theme.isDark
                // app.$vuetify.theme.dark = !app.$vuetify.theme.dark
            })
            if (darkMediaQuery.matches) {
                app.vuetify.framework.theme.isDark = true
                // app.$vuetify.theme.dark = true
                app.$ttlStorage.set('darkMode', true)
            }
        }
    },
    async isUserUsingWebsiteVersion () {
        const device = await app.$capacitor.device()
        console.log('DEVICE', device.platform, window.location.hostname)
        if ('web' !== device.platform) {
            return false
        }

        return !!app.$config.publicWebsiteDomains.includes(window.location.hostname)
    }
  })

}
