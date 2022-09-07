import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// Vue.use(VueLodash)
Vue.use(VueLodash, { name: '$_', lodash })
// Object.defineProperty(Vue.prototype, 'lodash', { value: lodash })
