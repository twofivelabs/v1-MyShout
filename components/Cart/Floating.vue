<template>
  <v-dialog
      v-model="dialog"
      :max-width="`${$vuetify.breakpoint.mdAndDown ? '90vw' : '800px' }`"
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
          bottom
          color="black"
          dark
          elevation="0"
          fab
          fixed
          right
          v-bind="attrs"
          v-on="on"
      >
        <v-badge
            v-if="cart && cart.item_count > 0"
            :content="cart.item_count"
            :value="cart.item_count"
            color="red"
        >
          <v-icon>
            mdi-cart
          </v-icon>
        </v-badge>
        <v-icon v-else>
          mdi-cart
        </v-icon>
      </v-btn>
    </template>
    <CartDetails @goToCheckout="goToCheckout"/>
  </v-dialog>
</template>
<script>

import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CartFloating',
  setup () {
    const { state } = useStore()
    const cart = computed(() => state.cart.current)
    const dialog = ref(false)

    // METHODS
    const goToCheckout = () => {
      dialog.value = false
    }

    return {
      cart,
      dialog,
      goToCheckout
    }
  }
})
</script>
<style scoped>
.v-dialog__content {
  display: flex;
  align-items: flex-end;
}

.v-dialog--active {
  margin: 0 !important;
}
</style>
