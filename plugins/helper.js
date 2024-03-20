import FirestoreHelpers from '~/classes/FirestoreHelpers'
import moment from 'moment'

export default ({
  app,
  store,
  $vuetify
}, inject) => {
  inject('helper', {
     fromNow(date) {
         try {
             return moment(date.toDate()).fromNow()
         } catch {
             return date
         }
     },
     downloadFile(path, filename) {
         // Create a new link
         const anchor = document.createElement('a');
         anchor.href = path;
         anchor.download = filename;

         // Append to the DOM
         document.body.appendChild(anchor);

         // Trigger `click` event
         anchor.click();

         // Remove element from DOM
         document.body.removeChild(anchor);
    },
    sleep (ms, log=null) {
      console.log('💤', ms, log)
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    sort (property) {
      let sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a, b) {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result * sortOrder
      }
    },
    slugify (value, separator = '-') {
      return new FirestoreHelpers().slugify(value, separator)
    },
    async validSlug (path, term, field = 'slug') {
      if (term && term.length > 1) {
        const result = await store.dispatch(path, {
          term: app.$helper.slugify(term),
          field,
          operator: '=='
        })
        if (result && result.length !== 0) {
          app.$notify.show({ text: app.i18n.t('notify.error_try_again'), color: 'red' })
          return false
        }
        return true
      }
      return false
    },
    strToInt (value) {
      value = value.replace('$', '')
      value = value.replace(',', '')
      return parseFloat(value)
    },
    formatDollars (dollars) {
      return dollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    dollarsToCents (amount) {
      if (typeof amount !== 'string' && typeof amount !== 'number') {
        return null
      }
      if (amount === 'FREE') {
        return 0
      }
      return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount))
    },
    centsToDollars (amount) {
      const dollars = amount / 100
      return dollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    objMap (obj, func) {
      if (Object.keys(obj).length > 0) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]))
      }
      return null
    },
    formatPhone (val, format = 'read') {
        let cleaned = ('' + val).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            if (format === 'read') {
                return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
            }
            intlCode = (match[1] ? '+1' : '+1')
            return [intlCode, '', match[2], '', match[3], '', match[4]].join('')
        }
        return null
    },
    getImageSize (url, size) {
      // TODO: Make this dynamic
      const storagePath = 'https://firebasestorage.googleapis.com/v0/b/myshout.appspot.com/o/'
      const sizes = {
        'original': '',
        'thumbnail': '_200x200'
      }
      if (!size || size === 'original') {
        return url
      }
      // eslint-disable-next-line no-unused-vars
      const [_, path] = url.split(storagePath)
      const [urlPath, params] = decodeURIComponent(path).split('?')
      const [filename] = urlPath.split('/').pop().split('.')
      const re = /^(.*\/)?[^/]+\.(png|gif|webp|jpe?g)$/i
      const rep_str = `$1${filename}${sizes[size]}.$2`
      const newUrl = urlPath.replace(re, rep_str)

      return `${storagePath}${encodeURIComponent(newUrl)}?${params}`
    },
    greeting (name = null) {
      const day = new Date()
      const hr = day.getHours()
      let includeName = ''
      let response = 'Hello'

      if (name) {
        includeName = `, ${name}`
      }

      if (hr >= 1 && hr <= 11) {
        response = `Good Morning${includeName}!`
      } else if (hr > 11 && hr <= 16) {
        response = `Good Afternoon${includeName}!`
      } else if (hr > 16 && hr <= 23) {
        response = `Good Evening${includeName}!`
      }
      return response
    },
    cardWidth (isSlider = false) {
      if ($vuetify.breakpoint.xsOnly) {
        if (isSlider) {
          return '40vw'
        }
        return '50vw'
      } else if ($vuetify.breakpoint.smAndUp) {
        if (isSlider) {
          return '165'
        }
      }
      return '165'
    },
    hasDisplayNotch () {
      let proceed = false
      const div = document.createElement('div')
      if (CSS.supports('padding-bottom: env(safe-area-inset-bottom)')) {
        div.style.paddingBottom = 'env(safe-area-inset-bottom)'
        proceed = true
      } else if (CSS.supports('padding-bottom: constant(safe-area-inset-bottom)')) {
        div.style.paddingBottom = 'constant(safe-area-inset-bottom)'
        proceed = true
      }
      if (proceed) {
        document.body.appendChild(div)
        let calculatedPadding = parseInt(window.getComputedStyle(div).paddingBottom)
        document.body.removeChild(div)
        if (calculatedPadding > 0) {
          return true
        }
      }
      return false
    },
    timeAgo (timestamp) {
        return new FirestoreHelpers().timeAgo(timestamp)
    },
    arrToggle(collection, item) {
        const idx = collection.indexOf(item)
        if (idx !== -1) {
            collection.splice(idx, 1)
        } else {
            collection.push(item)
        }
        return collection
    },
    generateNumericPin() {
        return Math.floor(1000 + Math.random() * 9000)
    },
    generateStringPin(length= 6) {
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let result             = ''
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    },
    hasOnlyDigits(value) {
        return /^[0-9]+$/.test(value);
    },
    normalizeDeviceContacts(contacts) {
      if (contacts) {
        // Fix for Android to get the main property of the contact array
        if (contacts.contacts) {
            contacts = contacts.contacts
        }
        let formattedContacts = [];

        contacts.forEach(c => {
            let nc = {};

            // console.log('NORMALIZED NAME', c.name.display, c.name.given, c.name.family)
            if (c.name?.display && c.name?.display.length > 1) {
                nc.name = c.name.display;
            }
            if (!nc.name) {
                if (c.name?.given && c.name?.given.length > 1) {
                    nc.name = c.name.given +' '+ c.name?.family
                }
            }
            if (c?.emails && c?.emails[0] && c?.emails[0]?.address) {
                nc.email = c.emails[0].address
            }
            if (c?.phones && c?.phones[0] && c?.phones[0]?.number) {
                nc.phone = c.phones[0].number.replace(/[^0-9]/g, '')
            }

            // Only push contacts that have a phone number / email
            if (nc?.email || nc?.phone) {
                formattedContacts.push(nc)
            }
        }); // forEach

        // Return formatted contacts
        return formattedContacts
      }
    },
    linkifyText(text) {
      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]|www\.[\S]+|\b[\w.-]+\.[a-zA-Z]{2,}\b)/gi;
      return text.replace(urlRegex, function(url) {
        const httpUrl = url.match(/^https?:\/\//) ? url : `http://${url}`;
        return `<a href="${httpUrl}" style="color:#fff !important;text-decoration:underline;" target="_blank">${url}</a>`;
      });
    }
  })
}
