import path from 'path'
import fs from 'fs'
import webpack from 'webpack'

// HELPER REPO: https://github.com/lupas/nuxt-firebase-demo
// https://nuxt-fire-demo.herokuapp.com/
// const baseHref = process.env.BASE_HREF || '/'
const baseHref = '/'
// const isDev = process.env.NODE_ENV === 'development'
const isDev = false
const useSSL = false
const useEmulators = false // manually change if emulators needed
const testMessaging = false
// firebase emulators:start

const config = {
  dev: isDev,
  // target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'MyShout',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sen&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap'
      }
    ],
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]/*,
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAD2Twrykrl6E3PmuTRMFkIuDc_hWaBFc&libraries=places' }
    ] */
  },

  // Customize the progress-bar color
  loading: { color: '#6fa7e0' },

  // Send usage data to nuxt
  telemetry: false,

  // Public Config
  publicRuntimeConfig: {
    appTitle: 'MyShout',
    websiteUrl: 'https://myshout.net',
    contact: {
      email: 'contact@myshout.net',
      name: 'MyShout',
      subject: 'Contact Form Filled'
    },
    publicWebsiteDomains: ['admin.myshout.net', 'my-shout-app.web.app', 'my-shout-app.firebaseapp.com', 'admin.my-shout.us'],
    perVendorFee: 150, // In cents (100 = $1)
    deepLink: '',
    appAndroid: '',
    appIos: '',
    logAnalytics: false,
    useAnonymousSignUp: false,
    useSocialLogin: false,
    useDarkMode: false,
    getVisitorIP: false,
    reverseGeocode: false, // If enabled ensure you use it properly
    wordpress: {
      usePosts: false
    },
    google: {
      mapsApiKey: 'AIzaSyCdk1YDkjNrxjmojCyJhBB-6cEedG0nTt4'
    },
    firebase: {
        fcmPublicVapidKey: isDev ? 'BAJjXZ0Yn1FI1sJexv41IjHTJCYXNUK_KGjct3N5bVvxGE3m6olax8OlenN4MZfhwMOLn6Ei1L7h-EFnaG0owrU' : 'BKsrBHZNIq3MJyV6edKDaagk-ugKt9ZVhwOty3EtP0gR_sX_6hgvk9WIa3jaFiGtYVo6NanxH01GsBmi4jbBIco'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Loaded below in Vuetify
  css: [
    // '@/assets/css/general.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/registered.js' },
    {
      src: '~/plugins/capacitor.js',
      mode: 'client'
    },
    {
      src: '~/plugins/remoteConfig.js',
      mode: 'client'
    },
    { src: '~/plugins/system.js' },
    // { src: '~/plugins/vue-stripe.js', ssr: false },
    {
      src: '~/plugins/notify',
      mode: 'client'
    },
    {
      src: '~/plugins/vuetify',
      mode: 'client'
    },
    {
      src: '~/plugins/dompurify',
      mode: 'client'
    },
/*    {
      src: '~/plugins/leaflet',
      mode: 'client'
    },*/
    '~/plugins/vue',
    '~/plugins/axios',
    '~/plugins/ttlStorage',
    '~/plugins/helper',
    '~/plugins/fb',
    '~/plugins/wp',
    '~/plugins/filters',
    '~/plugins/lodash',
    '~/plugins/services',
    '~/plugins/encryption',
    '~/plugins/language',
    '~/plugins/longpress',
     {
       src: '~/plugins/animation',
       mode: 'client'
     }
  ],

  serverMiddleware: [
    // Won't work anymore with SPA mode
    // '~/middleware/redirects'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [{
    path: '~/components', // will get any components nested in let's say /components/test too
    pathPrefix: true
  }],

  // Change the root of the static reference, "/{media}/img.jpg"
  static: {
    prefix: false
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/auth',
    '@nuxtjs/universal-storage',
    'vuejs-google-maps/nuxt',
    '@nuxtjs/markdownit',
    '@nuxtjs/i18n'
    //'@nuxt/image',
    // 'nuxt-stripejs',
    // 'nuxt-leaflet'
  ],

  /*env: {
    stripePublishableKey: ''
  },*/

  stripe: {
    publishableKey: ''
  },

    // http://www.lingoes.net/en/translator/langcode.htm
    i18n: {
        lazy: true,
        langDir: 'langDir',
        skipSettingLocaleOnNavigate: true,
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr', name: 'English', local: 'English' },
            //{ code: 'es', iso: 'es-ES', file: 'es.js', name: 'Spanish', local: 'Español' },
            //{ code: 'fr', iso: 'fr', file: 'fr.js', name: 'French', local: 'Français' }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        },
        vueI18n: {
            fallbackLocale: 'en'
        }
    },

  markdownit: {
    runtime: true
  },

  /*image: {
    domains: ['https://firebasestorage.googleapis.com/v0/b/pint-app-dev.appspot.com']
  },*/

  /*
  https://console.cloud.google.com/google/maps-apis/welcome?entry=devsite&step=api_key
  // No restrictions
   */
  googleMaps: {
    apiKey: 'AIzaSyCdk1YDkjNrxjmojCyJhBB-6cEedG0nTt4',
    libraries: ['places']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // What's the BASE URL for the api you are using?
  axios: {
    baseURL: '',
    proxy: true
  },
  // Simple proxy, helps to deal with anything related to CORS
  proxy: {
    /*'/geolocation/': {
      target: 'https://ipgeolocation.abstractapi.com/v1/',
      pathRewrite: { '^/geolocation/': '' }
    },*/
    /*'/wp/': {
      target: 'https://www.myshout.com',
      pathRewrite: { '^/wp/': '' }
    }*/
     /* '/firestore/': {
          target: 'https://firestore.googleapis.com/v1/projects/my-shout-app/databases/(default)/documents/',
          pathRewrite: { '^/firestore/': '' }
      }*/
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: false,
    icon: false,
    manifest: {
      lang: 'en'
    },
    workbox: {
      // Dev needs to be true for AUTH
      // Dev needs to be false for MESSAGING? (Maybe due to SSL on the domain)
      // https://github.com/nuxt-community/firebase-module/issues/314
      dev: !testMessaging,
      importScripts: ['/firebase-auth-sw.js']
    }
  },

  firebase: {
    lazy: false,
    config: {
        apiKey: isDev ? "AIzaSyChwP2vZ1Q4E_6wFIr0Pb_mfDFq_ThSas4" : "AIzaSyDzL5T3aUM7GGvTR_dh84Tm_D01T8pAGYM",
        authDomain: isDev ? "my-shout-staging.firebaseapp.com" : "my-shout-app.firebaseapp.com",
        projectId: isDev ? "my-shout-staging" : "my-shout-app",
        storageBucket: isDev ? "my-shout-staging.appspot.com" : "my-shout-app.appspot.com",
        messagingSenderId: isDev ? "777569508563" : "137661141174",
        appId: isDev ? "1:777569508563:web:f205aa7aea3820e0230826" : "1:137661141174:web:c00c73c494443d7e449617",
        measurementId: isDev ? "" : "G-6D1EY1D843"
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          // onAuthStateChangedMutation: 'user/ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'user/onAuthStateChanged'
        },
        ssr: true,
        emulatorPort: isDev && useEmulators ? 9099 : undefined,
        disableEmulatorWarnings: false
      },
      firestore: {
        memoryOnly: false,
        enablePersistence: true,
        emulatorPort: isDev && useEmulators ? 8080 : undefined
      },
      functions: {
        emulatorPort: isDev && useEmulators ? 12345 : undefined
      },
      storage: true,
      performance: false,
      analytics: {
        collectionEnabled: true // default
      },
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: isDev ? 30000 : 43200000, // 60000 // 1min
          minimumFetchIntervalMillis: isDev ? 30000 : 43200000 // 43200000 12 hrs
        },
        defaultConfig: {
          navigation: [
            {
              icon: 'mdi-domain',
              order: 3,
              title: 'News',
              to: '/post'
            },
            {
              icon: 'mdi-magnify',
              order: 6,
              title: 'Map',
              to: '/map'
            }
          ],
          social_links: [
            {
              icon: 'mdi-facebook',
              order: 1,
              title: 'Facebook',
              to: 'https://facebook.com'
            },
            {
              icon: 'mdi-instagram',
              order: 2,
              title: 'Instagram',
              to: 'https://instagram.com'
            }
          ],
          banners: [],
          home: {
            message: 'Welcome to MyShout'
          },
          countries: [
            {
              name: 'Canada',
              code: 'CA'
            }
          ],
          ship_to_cities: [
            {
              name: 'Kelowna',
              code: 'kelowna'
            },
            {
              name: 'West Kelowna',
              code: 'west kelowna'
            },
            {
              name: 'Lake Country',
              code: 'lake country'
            }
          ],
          ship_to: [
            {
              name: 'British Columbia',
              code: 'BC'
            }
          ],
          bill_to: [
            {
              name: 'Alberta',
              code: 'AB'
            },
            {
              name: 'British Columbia',
              code: 'BC'
            },
            {
              name: 'Manitoba',
              code: 'MB'
            },
            {
              name: 'New Brunswick',
              code: 'NB'
            },
            {
              name: 'Newfoundland and Labrador',
              code: 'NL'
            },
            {
              name: 'Northwest Territories',
              code: 'NT'
            },
            {
              name: 'Nova Scotia',
              code: 'NS'
            },
            {
              name: 'Nunavut',
              code: 'NU'
            },
            {
              name: 'Ontario',
              code: 'ON'
            },
            {
              name: 'Prince Edward Island',
              code: 'PE'
            },
            {
              name: 'Quebec',
              code: 'QC'
            },
            {
              name: 'Saskatchewan',
              code: 'SK'
            },
            {
              name: 'Yukon',
              code: 'YT'
            }
          ],
          product_types: [
            {
              name: 'Alcohol',
              code: 'alcohol'
            },
            {
              name: 'General',
              code: 'general'
            },
            {
              name: 'Food',
              code: 'food'
            }
          ]
        }
      },
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'goToHome',
            url: '/'
          },
          {
            action: 'goToProfile',
            url: '/profile'
          }
        ],
        fcmPublicVapidKey: isDev ? "BAJjXZ0Yn1FI1sJexv41IjHTJCYXNUK_KGjct3N5bVvxGE3m6olax8OlenN4MZfhwMOLn6Ei1L7h-EFnaG0owrU" : "BKsrBHZNIq3MJyV6edKDaagk-ugKt9ZVhwOty3EtP0gR_sX_6hgvk9WIa3jaFiGtYVo6NanxH01GsBmi4jbBIco"
      }
    }
  },

  storage: {
    initialState: {
      user_token: null,
      uid: null
    },
    vuex: {
      namespace: 'storage'
    },
    cookie: {
      prefix: '',
      options: {
        path: '/'
      }
    },
    localStorage: {
      prefix: ''
    },
    ignoreExceptions: false
  },

  vuetify: {
    treeShake: true, // Had to turn this off, wasn't importing the features
    light: true,
    defaultAssets: false,
    customVariables: ['~/assets/css/general.scss']
  },

  generate: {
    interval: 2000,
    fallback: true,
    routes: [
      '/'
    ]
  },

  vue: {
    config: {
      productionTip: isDev,
      devtools: isDev
    }
  },

  // router with correct public path
  router: {
    base: baseHref,
    mode: 'history',
    middleware: 'routes',
    prefetchLinks: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
    devtools: isDev,
    publicPath: '/nuxt/',
    // You can extend webpack config here
    /* extend (config, { isDev, isClient }) {
      if (isClient) {
        console.log('ENTRY', config.entry) // { app: [ "path/to/client.js", "eventsource-polyfill", "etc..." ] } (currently undefined)
      } else {
        console.log('ENTRY', config.entry) // { app: [ "path/to/server.js" ] } (currently undefined)
      }
    }, */
    vendor: ['lodash', 'axios'],
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ]
  }
}

// IS DEVELOPMENT
console.log('IS DEVELOPMENT? ', isDev)

if (useSSL) {
  config.server = {
    port: 8000, // default: 3000
    host: '192.168.1.83', // default: localhost, 192.168.1.64
    timing: false,
    https: {
      key: fs.readFileSync(path.resolve('certs/192.168.1.83-key.pem')),
      cert: fs.readFileSync(path.resolve('certs/192.168.1.83.pem'))
    }
  }
}

export default config
