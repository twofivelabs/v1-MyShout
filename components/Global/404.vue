<template>
  <div class="ma-6 text-center">
    <ElementH1 :text="$t('page.not_found_heading')" />
    <ElementH3 :text="$t('page.not_found_text')" />
    <v-btn class="mt-6" @click="$nuxt.refresh()">
      {{ $t('btn.retry') }}
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
