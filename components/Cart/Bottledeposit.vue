<template>
  <v-row v-if="cart.bottle_deposit_total && (cart.bottle_deposit_total !== 0)" class="pt-3 align-center">
    <v-col class="overline text-right pa-0" cols="8">
      Bottle Deposit
    </v-col>
    <v-col class="text-right pa-0 pr-6">
      {{ cart.bottle_deposit_total || 0 | centsToDollars }}
    </v-col>
  </v-row>
</template>
<script>

/* http://www.calculconversion.com/sales-tax-calculator-british-columbia-gst-pst.html */
import {
  defineComponent,
  useStore,
  computed
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartBottleDeposit',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)

    return {
      cart
    }
  }
})
</script>
