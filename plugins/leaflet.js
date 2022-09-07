import Vue from 'vue'
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet'
import 'leaflet.offline'

const VueLeaflet = {
  install (Vue) {
    Vue.component('l-map', LMap)
    Vue.component('l-marker', LMarker)
    Vue.component('l-tile-layer', LTileLayer)
  }
}
Vue.use(VueLeaflet)
export default VueLeaflet
