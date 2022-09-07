<template>
  <div style="display:inline-block;">
    <v-btn
      color="grey"
      class="white--text elevation-0"
      fab
      x-small
      right
      top
      @click="share"
    >
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </div>
</template>
<script>

import {
  defineComponent,
  useContext,
  useRoute
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalShare',
  props: {
    payload: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props) {
    const { $capacitor, $config } = useContext()
    const route = useRoute()

    // METHODS
    const share = () => {
      const adjustedPayload = props.payload
      if (props.payload.path) {
        adjustedPayload.url = `${$config.websiteUrl}${props.payload.path}`
      } else {
        adjustedPayload.url = `${$config.websiteUrl}${route.value.fullPath}`
      }
      $capacitor.share(adjustedPayload)
    }

    return {
      share
    }
  }
})
</script>
