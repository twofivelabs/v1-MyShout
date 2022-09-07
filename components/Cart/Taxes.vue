<template>
  <div v-if="cart && cart.taxes">
    <v-row class="pt-3 align-center">
      <v-col class="overline text-right pa-0" cols="8">
        <v-icon slot="append" x-small @click="taxDetails = true">
          mdi-help-circle
        </v-icon>
        Tax
      </v-col>
      <v-col class="text-right pa-0 pr-6">
        {{ cart.taxes || 0 | centsToDollars }}
      </v-col>
    </v-row>
    <v-bottom-sheet
        v-model="taxDetails"
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
        <ElementH3 align="left" text="Tax Break Down"/>
        <v-row v-for="(type, groupKey) in grouped.taxes" :key="groupKey">
          <v-col>
            <ElementH6 align="left" text="Company"/>
            {{ groupKey }}
          </v-col>
          <v-col>
            <ElementH6 align="left" text="Shipping"/>
            <div v-for="(sTax, index) in type.shipping" :key="index">
              <small>{{ index }}</small> {{ sTax | centsToDollars }}
            </div>
          </v-col>
          <v-col>
            <ElementH6 align="left" text="Other"/>
            <div v-for="(sTax, index) in type.other" :key="index">
              <small>{{ index }}</small> {{ sTax | centsToDollars }}
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

/* http://www.calculconversion.com/sales-tax-calculator-british-columbia-gst-pst.html */
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
  watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartTaxes',
  setup () {
    const { state } = useStore()
    const { $system } = useContext()
    const cart = computed(() => state.cart.current)
    const grouped = computed(() => state.cart.current.grouped)
    const taxDetails = ref(false)

    // METHODS
    const getTaxesAvailable = () => {
      $system.log({
        comp: 'CartTaxes',
        msg: 'getTaxesAvailable',
        val: ''
      })
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        taxDetails.value = false
      }
    }

    // WATCH
    watchEffect(() => {
      getTaxesAvailable()
    })

    return {
      cart,
      grouped,
      taxDetails,
      swipe
    }
  }
})
</script>
