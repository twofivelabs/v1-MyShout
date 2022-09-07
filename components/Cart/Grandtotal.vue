<template>
  <v-row class="align-center pt-3">
    <v-col class="overline text-right pa-0" cols="8">
      Total
    </v-col>
    <v-col class="text-right pa-0 pr-6">
      {{ cart.total || 0 | centsToDollars }}
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
  name: 'CartGrandTotal',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)

    return {
      cart
    }
  }
})
</script>
