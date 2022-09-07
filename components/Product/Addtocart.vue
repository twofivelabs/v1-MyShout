<template>
  <div v-if="product">
    <v-alert
        v-if="product.out_of_stock"
        class="my-3"
        icon="mdi-numeric-0-box-multiple-outline"
        type="warning"
    >Out of stock
    </v-alert>
    <v-row v-else class="add-to-cart align-center">
      <v-col cols="5">
        <v-text-field
            v-model="quantity"
            class="quantity"
            min="1"
            type="text"
        >
          <v-icon slot="append" @click="addQuantity">
            mdi-plus
          </v-icon>
          <v-icon slot="prepend" @click="minusQuantity">
            mdi-minus
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="7">
        <v-btn
            :loading="loading"
            block
            class="rounded-xl"
            color="primary"
            elevation="0"
            @click="addToCart"
        >
          {{ text }}
        </v-btn>
        <ElementPreviouslyliked :product="product" class="text-center"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductAddToCartBtn',
  props: {
    text: {
      type: String,
      default: () => {
        return 'Add to cart'
      }
    },
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: [
    'quantity'
  ],
  setup (props, { emit }) {
    const {
      state,
      dispatch,
      commit
    } = useStore()
    const {
      $notify,
      $system,
      $fire
    } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const selectedProduct = computed(() => state.products.selected)

    // DEFINE CONTENT
    const loading = ref(false)
    const quantity = ref(1)

    // METHODS
    const addQuantity = () => {
      quantity.value = quantity.value + 1 === quantity.value
          ? 0
          : quantity.value + 1
    }
    const minusQuantity = () => {
      quantity.value = quantity.value - 1 < 1
          ? 1
          : quantity.value - 1
    }
    const addToCart = async () => {
      try {
        loading.value = true
        if (user.value.uid) {
          const payload = {
            product: selectedProduct.value || props.product,
            quantity: quantity.value
          }
          await dispatch('cart/item/add', payload)
          displayShippingConditionToUser()
          commit('products/SET_SELECTED', null)
          $notify.show({
            text: 'Added To Cart',
            color: 'success'
          })

          // Log Analytics
          const analyticsItem = await dispatch('cart/item/analytics_item', payload.product)
          $fire.analytics.logEvent('add_to_cart', {
            currency: analyticsItem.currency,
            items: [analyticsItem],
            value: analyticsItem.total
          })
        } else {
          $notify.show({
            text: 'Must be logged in to add items to the cart',
            color: 'error'
          })
        }
      } catch (e) {
        $notify.show({
          text: 'There was an error adding item to your cart.',
          color: 'error'
        })
        $system.log({
          comp: 'ProductAddToCartBtn',
          msg: 'addToCart',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const displayShippingConditionToUser = () => {
      try {
        const groupKey = props.product.company.id
        const conditions = state.cart.current.valid_shipping_conditions[groupKey]
        const items = state.cart.current.grouped.items[groupKey]
        let text

        if (!conditions) {
          return
        }
        const conditionItemCount = lodash.find(conditions, { type: 'Item Count' })
        const conditionItemPrice = lodash.find(conditions, { type: 'Price' })

        if (conditionItemCount) {
          const totalQuantity = lodash.sumBy(items, 'quantity')

          if (totalQuantity < parseInt(conditionItemCount.minimum)) {
            text = 'Add more for a better shipping rate'
          }
          if (totalQuantity > parseInt(conditionItemCount.maximum)) {
            text = 'You have gone over the maximum for shipping rate'
          }
          if (totalQuantity > parseInt(conditionItemCount.minimum) && totalQuantity < parseInt(conditionItemCount.maximum)) {
            // text = 'You will receive the best shipping rates'
            text = null
          }
        }

        if (conditionItemPrice) {
          const totalPrice = lodash.sumBy(items, 'total')

          if (totalPrice < parseInt(conditionItemPrice.minimum)) {
            text = 'Add more for a better shipping rate'
          }
          if (totalPrice > parseInt(conditionItemPrice.maximum)) {
            text = 'You have gone over the maximum for shipping rate'
          }
          if (totalPrice > parseInt(conditionItemPrice.minimum) && totalPrice < parseInt(conditionItemPrice.maximum)) {
            // text = 'You will receive the best shipping rates'
            text = null
          }
        }

        if (text) {
          $notify.show({
            text,
            color: 'blue'
          })
        }
      } catch {
        // ... most likely took to long for valid shipping conditions.
      }
    }

    // WATCH
    watch(quantity, (value) => {
      if (value) {
        emit('quantity', value)
      }
    })

    return {
      loading,
      user,
      profile,
      quantity,
      selectedProduct,
      addQuantity,
      minusQuantity,
      addToCart
    }
  }
})
</script>
<style scoped>
.quantity >>> input {
  text-align: center
}
</style>
