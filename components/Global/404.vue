<template>
  <div class="ma-6 text-center">
    <ElementH1 text="404" />
    <ElementH3 text="Nothing found" />
    <v-btn class="mt-6" @click="$nuxt.refresh()">
      Retry
    </v-btn>
  </div>
</template>
<script>
import {
  defineComponent,
  useMeta
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalFourOhFour',
  setup () {
    const { title } = useMeta()
    title.value = '404 Not Found'

    return {
      title
    }
  },
  head: {}
})
</script>
