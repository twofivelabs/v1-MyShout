<template>
  <div v-if="lat && lng">
    <a target="_blank" :href="`https://www.google.com/maps/@${lat},${lng},14z`"><v-img width="600" class="mx-auto" :src="`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&scale=1&size=600x500&maptype=hybrid&key=${$config.google.mapsApiKey}&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${lat},${lng}`" :alt="`Google Map of ${lat},${lng}`" /></a>
  </div>
  <div v-else>
    <ElementH4 align="center" class="my-5" text="User has not updated their location yet."/>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MapGmbasic',
  props: {
    lat: {
      type: Number,
      default: () => {
        return null
      }
    },
    lng: {
      type: Number,
      default: () => {
        return null
      }
    },
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const loading = ref(false)

    return {
      loading,
    }
  }
})
</script>
