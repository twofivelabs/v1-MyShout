<template>
  <v-card class="elevation-0">
    <v-toolbar v-if="cart && cart.item_count > 0" class="elevation-0 pt-1">
      <v-row>
        <v-col>
          <ElementH3 align="left" text="Cart"/>
        </v-col>
      </v-row>
    </v-toolbar>
    <div v-if="cart && cart.item_count > 0" class="pb-6 pr-3 cart-popup-contents"
         style="overflow: hidden;"
    >
      <CartItems/>
      <CartSubtotals/>
    </div>
    <div v-else class="text-center">
      <ElementH5 align="center" class="pa-4" text="You have no items in your cart!"/>
      <div>
        <object data="/svg/FallenBeer.svg" style="max-width:200px;" type="image/svg+xml">
          <img alt="You have no items in your cart." src="/svg/FallenBeer.svg">
        </object>
      </div>
      <v-btn class="mt-2 mb-6" elevation="0" @click="continueShopping">
        Continue Shopping
      </v-btn>
    </div>
    <v-btn
        v-if="cart && cart.item_count > 0"
        block
        elevation="0"
        large
        style="background-color: #2b72bf; color:#fff;"
        tile
        @click="goToCheckout"
    >
      Checkout
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </v-card>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartDetails',
  emits: [
    'goToCheckout'
  ],
  setup (_, { emit }) {
    const { state } = useStore()
    const router = useRouter()

    // DEFINE CONTENT
    const cart = computed(() => state.cart.current)
    const dialog = ref(false)

    // METHODS
    const goToCheckout = () => {
      dialog.value = false
      router.push('/checkout')
      emit('goToCheckout', false)
    }
    const continueShopping = () => {
      dialog.value = false
      router.push('/')
      emit('goToCheckout', false)
    }

    return {
      cart,
      goToCheckout,
      continueShopping
    }
  }
})
</script>
