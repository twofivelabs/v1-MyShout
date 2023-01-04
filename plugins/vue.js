import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

Vue.use(VueCompositionAPI)

defineCustomElements(window)
