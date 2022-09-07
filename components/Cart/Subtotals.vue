<template>
  <v-row class="pa-0 align-center">
    <v-col class="overline text-right pa-0" cols="8">
      Sub Total
    </v-col>
    <v-col class="text-right pa-0 pr-6">
      {{ cart.sub_total || 0 | centsToDollars }}
    </v-col>
  </v-row>
</template>
<script>

import {
  defineComponent,
  useStore,
  computed
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartSubTotals',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)

    return {
      cart
    }
  }
})
</script>
