<template>
  <v-expand-transition>
    <div v-if="hover" class="show-details">
      <span v-if="!product.variations || product.variations.length <= 0">
        <v-chip v-if="$vuetify.breakpoint.smAndUp">
          <ProductPrice :price="product.price" :salePrice="product.sale_price"
                        align="left" class="text-p"
          />
        </v-chip>
        <v-btn
            v-if="!product.out_of_stock"
            :loading="loading"
            class="white--text elevation-0"
            color="primary"
            fab
            right
            top
            x-small
            @click="addToCart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </span>
      <ProductFavourite :product="product"/>
      <span v-if="product.likes && product.likes > 0">
        <v-btn
            :loading="loading"
            class="white--text elevation-0"
            color="grey"
            fab
            right
            top
            x-small
        >
          <v-icon>mdi-thumb-up</v-icon>
          {{ product.likes }}
        </v-btn>
      </span>
    </div>
  </v-expand-transition>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HoverExpand',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const {
      state,
      dispatch,
      getters
    } = useStore()
    const {
      $notify,
      $system
    } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)
    const payload = {
      product: { ...props.product },
      quantity: 1
    }

    // METHODS
    const addToCart = async () => {
      try {
        loading.value = true
        if (isLoggedIn.value) {
          await dispatch('cart/item/add', payload)
          $notify.show({
            text: 'Added To Cart',
            color: 'success'
          })
        } else {
          $notify.show({
            text: 'Must be logged in to add items to the cart',
            color: 'error'
          })
        }
      } catch {
        $notify.show({
          text: 'There was an error adding item to your cart.',
          color: 'error'
        })
        $system.log({
          comp: 'HoverExpand',
          msg: 'addToCart',
          val: payload
        })
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      user,
      profile,
      addToCart
    }
  }
})
</script>
<style>
.show-details {
  height: 30%;
  top: 2%;
  right: 2%;
  position: absolute;
}
</style>
