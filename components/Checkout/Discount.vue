<template>
  <v-row v-if="discount && discount > 0" class="pa-0 align-center">
    <v-col class="overline text-right pa-0" cols="8">
      Discount
    </v-col>
    <v-col class="text-right pa-0 pr-6">
      {{ discount | centsToDollars }}
    </v-col>
  </v-row>
</template>
<script>

import {
  defineComponent,
  useStore,
  computed,
  ref,
  watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CheckoutDiscount',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)
    const groupedTotals = computed(() => state.cart.current.grouped.totals)

    // DEFINE CONTENT
    const discount = ref(0)

    // METHODS
    const getDiscount = () => {
      let localDiscount = 0
      for (const groupKey in groupedTotals.value) {
        if (groupedTotals.value[groupKey].discount) {
          localDiscount += groupedTotals.value[groupKey].discount
        }
      }
      discount.value = localDiscount
    }

    // WATCH
    watchEffect(() => {
      getDiscount()
    })

    return {
      discount,
      cart
    }
  }
})
</script>
