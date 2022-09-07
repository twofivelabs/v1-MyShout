<template>
  <div>
    <v-row class="align-center pt-3">
      <v-col class="overline text-right pa-0" cols="8">
        <v-icon slot="append" x-small @click="details = true">
          mdi-help-circle
        </v-icon>
        Fee
      </v-col>
      <v-col class="text-right pa-0 pr-6">
        {{ cart.fee_total || 0 | centsToDollars }}
      </v-col>
    </v-row>
    <v-bottom-sheet
        v-model="details"
        :scrollable="true"
        class="bottom-sheet"
        inset
        max-width="700"
    >
      <v-sheet
          class="pa-5 overflow-y-auto rounded-t-xl"
          height="35vh"
      >
        <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                        @click.native="swipe('Down')"
        />
        <ElementH3 align="left" text="Fee"/>
        <p>This fee supports our platform and helping local vendors. Supporting and
          helping our vendors as much as possible. We want to give you the best deals
          possible.</p>
        <v-btn class="elevation-0" to="/page/contact">Contact us</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartGrandTotal',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)
    const details = ref(false)

    const swipe = (direction) => {
      if (direction === 'Down') {
        details.value = false
      }
    }

    return {
      cart,
      details,
      swipe
    }
  }
})
</script>
