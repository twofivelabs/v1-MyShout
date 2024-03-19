// import firebase from 'firebase'
import {get} from 'lodash'

const SECONDS_IN_TIME = [
    1,         // 1 second
    60,        // 1 minute
    3600,      // 1 hour
    86400,     // 1 day
    604800,    // 1 week
    2419200,   // 1 month
    29030400   // 1 year
]
const en_US = [
    "now",     "s", // s ago
    "1m",  "m",
    "1h",  "h",
    "1d",  "d",
    "1w",  "w",
    "1mo", "m",
    "1y",  "y"
]

export default class FirestoreHelpers {
    fields () {
        return this.fields
    }

    state (path) {
        if (window?.$nuxt?.context) {
            return get(window.$nuxt.context.store.state, path)
        }
    }

    getRoles () {
        // console.log('window.$nuxt', window.$nuxt?.$config?.admin?.roleTypes)
        return window.$nuxt?.$config?.admin?.roleTypes || {}
    }

    prepareMultiLingualProperties () {
        window.$nuxt.context.i18n.locales.forEach((locale) => {
            if (!this.fields.language[locale.code] && locale.code !== 'en') {
                this.fields.language[locale.code] = Object.assign({}, this.multiLingualFields)
            }
        })
        // console.log('locale',this.fields.language)
    }

    joinOne (path, dataConverter=null) {
        return window.$nuxt.context.$db.get_one(path, dataConverter)
    }
    joinAll (path, where = {}, dataConverter = null) {
        return window.$nuxt.context.$db.get_all(path, where, dataConverter).then((res) => {
            if (!res || res.length === 0) {
                return null
            }
            return res
        }).catch(()=> {
            console.log('Error JoinAll')
        })
        /*
        return Promise.all([dataPromise]).then(([ dataPromise]) => {
            console.log('DATA JOIN', dataPromise)
            return dataPromise
        })*/
    }

    objMap (obj, func) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]))
    }

    toObj2 () {
        this.fields = JSON.parse(JSON.stringify(this.fields))
        /* console.log('toObj2_BEFORE', this.fields)
        this.fields = { ...this.fields }
        console.log('toObj2_AFTER', this.fields) */
        return this
    }

    toObj (obj) {
        const thisObject = {}
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            thisObject[prop] = this[prop]
        })
        return thisObject
    }

    slugify (value, separator = '-', toLower = true) {
        if (!value) {
            return null
        }
        /*if (typeof value === 'undefined') {
          return null
        }*/
        let v = value
            .toString()
            .normalize('NFD') // split an accented letter in the base letter and the ascent
            .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
            .trim()
            .replace(/[^a-zA-Z0-9- ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
            .replace(/\s+/g, separator)
        if (toLower) {
            v = v.toLowerCase()
        }
        return v
    }

    stripForNumber(value) {
        return this.slugify(value, '', false)
    }

    dollarsToCents (amount) {
        let res = null
        if (amount) {
            res = Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount))
        }
        return res
    }

    centsToDollars (amount) {
        let res = null
        if (typeof amount === 'number') {
            const dollars = amount / 100
            res = dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
        return res
    }

    strToInt (value = null) {
        if (!value) {
            return null
        }
        if (typeof value === 'number') {
            return value
        }
        value = value.replace('$', '')
        value = value.replace(',', '')
        return parseFloat(value)
    }

    formatPhone (value = null) {
        if (value) {
            value = value.replace(/[^+0-9]/g, '')
            if (value.substring(0, 2) !== '+1') {
                value = `+1${value}`
            }
            if (value.substring(0, 1) !== '+') {
                value = `+${value}`
            }
        }
        return value
    }
    formatPhone2 (val, format = 'read') {
        let cleaned = ('' + val).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})+$/)
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            if (format === 'read') {
                return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
            }
            intlCode = (match[1] ? '+1' : '+1')
            return [intlCode, '', match[2], '', match[3], '', match[4]].join('')
        }
        return val
    }

    timeAgo (timestamp) {
        // if it's firebase, we need to get timestamp.getTime()
        let now = Math.floor(new Date / 1000);
        timestamp = Math.floor(new Date(timestamp).getTime() / 1000)
        let diff = (now - timestamp) || 1; // prevent undefined val when diff == 0
        for (let i = 6; i>=0; i--) {
            if (diff >= SECONDS_IN_TIME[i]) {
                let time_elapsed = Math.floor(diff / SECONDS_IN_TIME[i]);
                let adverbs = en_US;
                let sentence = adverbs.map((el,idx) => idx % 2 === 0 ? el : time_elapsed +""+ el);
                return time_elapsed >= 2 ? sentence[i * 2 + 1] : sentence[i * 2];
            }
        }
    }

    merge () {
        if (this.data) {
            this.fields = Object.assign(this.fields, this.data)
            // console.log('MERGE', this.fields, this.data)
        }
        return this
    }

    format (direction) {
        if (direction === 'write') {
            // this.toObj2().defaultWrite()
            this.defaultWrite()
            return this.fields
        }
        this.defaultRead()
        return this.fields
    }

    /**
     * TODO: we need to fix the DATE, new Date() is a user date, timezones could be different use servertimestamp
     * @returns {FirestoreHelpers}
     */
    defaultWrite () {
        const theDate = new Date()
        if (!this.fields.created_at) {
            this.fields.created_at = theDate
        }
        if (!this.fields.updated_at) {
            this.fields.updated_at = theDate
        }
        return this
    }

    defaultRead () {
        if (this.fields.created_at) {
            try {
                if (typeof this.fields.created_at === 'object') {
                    this.fields.created_at = this.fields.created_at.toDate().toDateString()
                }
            } catch {
                try {
                    if (typeof this.fields.created_at === 'object') {
                        this.fields.created_at = this.fields.created_at.toDateString()
                    }
                } catch {
                    //...
                }
            }
        }
        if (this.fields.updated_at) {
            try {
                if (typeof this.fields.updated_at === 'object') {
                    this.fields.updated_at = this.fields.updated_at.toDate().toDateString()
                }
            } catch {
                try {
                    if (typeof this.fields.updated_at === 'object') {
                        this.fields.updated_at = this.fields.updated_at.toDateString()
                    }
                } catch {
                    //...
                }
            }
        }
        return this
    }
}
