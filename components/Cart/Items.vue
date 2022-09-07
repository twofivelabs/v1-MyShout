<template>
  <div>
    <v-row v-for="(item, id) in cart.items" :key="id"
           class="ma-0 mb-3 cart-items align-center"
    >
      <v-col cols="1">
        <v-btn icon rounded text x-small @click="removeCartItem(item.sku)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <v-col class="pa-0" cols="5" sm="3">
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
        <div
            :class="`text-caption text-uppercase`"
        >
          <nuxt-link
              :class="`${$vuetify.theme.dark ? 'grey--text' : 'grey--text'}`"
              :to="`/companies/${item.company.id}`"
          >
            {{ item.company.name }}
          </nuxt-link>
        </div>
        <nuxt-link
            :class="`text-body-2 ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`"
            :to="`/products/${item.id}`"
            style="color:#616161"
        >
          {{ item.name }}
        </nuxt-link>
        <span v-if="item.label" class="text-body-2 font-weight-bold">
          / {{ item.label }}
        </span>
      </v-col>
      <v-col class="pa-0 pr-3 text-right" cols="12" sm="2">
        {{ item.price | centsToDollars }}
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartItems',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const cart = computed(() => state.cart.current)

    const removeCartItem = (id) => {
      console.log('REMOVE ', id)
      dispatch('cart/item/remove', id)
    }

    return {
      cart,
      removeCartItem
    }
  }
})
</script>
<style scoped>
.cart-items a {
  text-decoration: none;
  color: #000;
}
</style>
