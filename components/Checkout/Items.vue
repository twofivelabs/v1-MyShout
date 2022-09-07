<template>
  <div>
    <v-sheet
        v-for="(group, groupId) in groupedItems"
        :key="groupId"
        class="ml-1 mr-1 mb-2 cart-items grouped-items"
        elevation="0"
    >
      <ElementH5 :text="group[0].company.name" align="left" class="pt-2 pb-2"/>
      <v-row v-for="(item, itemKey) in group" :key="itemKey"
             class="ma-0 mb-1 align-center"
      >
        <v-col class="pa-0" cols="6" md="4" sm="3">
          <nuxt-link :to="`/products/${item.id}`">
            <v-avatar class="avatar-elevation white rounded-lg elevation-3" rounded
                      size="60"
            >
              <v-img
                  :src="item.product_image"
                  contain
              />
            </v-avatar>
            <span
                :class="`grey ${$vuetify.theme.dark ? 'darken-4 white--text' : 'black--text lighten-3'} rounded-lg pa-3 pl-5 mt-6 ml-n3`"
            >
              <span class="subtitle-1">{{ item.quantity }}</span>
              <span class="caption grey--text darken-4">Qty</span>
            </span>
          </nuxt-link>
        </v-col>
        <v-col class="pa-0">
          <nuxt-link
              :class="`text-body-2 ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`"
              :to="`/products/${item.id}`"
          >
            {{ item.name }}
          </nuxt-link>
          <div
              :class="`text-body-2 ${$vuetify.theme.dark ? 'grey--text' : 'grey--text'}`"
          >
            {{ item.price | centsToDollars }}
            <span v-if="item.label" class="text-body-2">
              / {{ item.label }}
            </span>
          </div>
        </v-col>
        <v-row
            v-if="cart.grouped.totals && cart.grouped.totals[groupId] && cart.grouped.totals[groupId].discount"
            class="ma-0"
        >
          <v-col class="text-right justify-end ma-0 pa-0 pr-3 caption">
            Discount {{ cart.grouped.totals[groupId].discount | centsToDollars }}
          </v-col>
        </v-row>
      </v-row>
      <v-radio-group
          :key="groupId"
          :value="selectedShippingOption(groupId)"
          class="shipping-options"
          dense
          hide-details="true"
          max="1"
          required
      >
        <v-radio
            v-for="(shipping, index) in shippingOptions[groupId]"
            :key="`${groupId}-${index}`"
            :label="`${shipping.label} ${formatCost(shipping.cost)}`"
            :value="`${shipping.label.toUpperCase() === 'FREE' ? 'FREE' : $helper.dollarsToCents(shipping.cost)}`"
            @change="shippingChanged(groupId, shipping)"
        >
          <template #label>
            <div style="width:100%;">
              {{ shipping.label }} {{ formatCost(shipping.cost) }}
            </div>
            <div v-if="shipping.description" class="text-right" style="width:100%;">
              {{ shipping.description }}
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </v-sheet>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CheckoutItems',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const { $helper } = useContext()
    const loading = ref(false)

    // DEFINE
    const cart = computed(() => state.cart.current)
    const groupedItems = computed(() => state.cart.current.grouped.items)
    const shippingSelected = computed(() => lodash.cloneDeep(state.cart.current.grouped.shipping))
    const shippingOptions = computed(() => state.cart.current.grouped.shipping_options)

    // METHODS
    const selectedShippingOption = (groupKey) => {
      try {
        console.log('selectedShippingOption', shippingSelected.value[groupKey].cost)
        return shippingSelected.value[groupKey].cost
      } catch {
        return null
      }
    }
    const formatCost = (dollars) => {
      if (typeof dollars === 'string' || dollars instanceof String) {
        if (dollars.toUpperCase() === 'FREE') {
          return 'FREE'
        }
      }
      return dollars
    }
    const shippingChanged = async (groupKey, shipping) => {
      loading.value = true
      const saveShipping = { ...shipping }
      saveShipping.cost = $helper.dollarsToCents(shipping.cost)
      await dispatch('cart/calculateGroupShipping', {
        groupKey,
        data: { ...saveShipping }
      })
      loading.value = false
    }

    return {
      loading,
      cart,
      groupedItems,
      shippingSelected,
      shippingOptions,
      selectedShippingOption,
      formatCost,
      shippingChanged
    }
  }
})
</script>
<style scoped>
.cart-items {
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
}

.cart-items a {
  text-decoration: none;
}

.shipping-options >>> label {
  font-size: 13px;
}

.shipping-options {
  margin-top: 0;
  padding: 4px 5px 0 5px;
}

>>> .v-messages {
  min-height: 0;
}
</style>
