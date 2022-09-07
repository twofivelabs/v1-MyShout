<template>
  <div>
    <ProductFavourite :product="product"/>
    <v-btn
        v-if="!product.out_of_stock && (!product.variations || product.variations.length <= 0)"
        :loading="loading"
        class="white--text elevation-0"
        color="primary"
        right
        rounded
        small
        top
        @click="addToCart"
    >
      <v-icon small>mdi-cart</v-icon>
      To Cart
    </v-btn>
    <v-btn
        v-else-if="!product.out_of_stock && (product.variations && product.variations.length > 0)"
        :loading="loading"
        class="white--text elevation-0"
        color="primary"
        right
        rounded
        small
        top
        @click="showVariationsSheet=true"
    >
      <v-icon small>mdi-cart</v-icon>
      To Cart
    </v-btn>
    <v-bottom-sheet
        v-model="showVariationsSheet"
        :scrollable="true"
        class="bottom-sheet"
        inset
        max-width="700"
    >
      <v-sheet
          class="pa-5 overflow-y-auto rounded-t-xl slide-up"
          height="45vh"
      >
        <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                        @click.native="swipe('Down')"
        />

        <v-row>
          <v-col cols="2">
            <v-avatar class="avatar-elevation white rounded-lg elevation-3" rounded
                      size="60"
            >
              <v-img
                  :src="product.images[0]"
                  contain
              />
            </v-avatar>
          </v-col>
          <v-col>
            <ElementH2
                :class="`mt-4 ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`"
                :text="`${product.name}`"
                align="left"
            />
          </v-col>
        </v-row>
        <ProductPrice v-if="!product.variations || product.variations.length <= 0"
                      :price="product.price" :salePrice="product.sale_price"
                      align="left" class="mt-2 text-h5 text--secondary"
        />
        <ProductVariations :product="product"/>
        <ProductAddtocart v-if="!product.out_of_stock" :product="product"
                          @click.native="finishedAddingToCart"
        />
      </v-sheet>
    </v-bottom-sheet>
  </div>
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
    },
    hover: {
      type: Boolean,
      default: () => {
        return false
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
    const showVariationsSheet = ref(false)
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
    const swipe = (direction) => {
      if (direction === 'Down') {
        showVariationsSheet.value = false
      }
    }
    const finishedAddingToCart = () => {
      setTimeout(() => {
        showVariationsSheet.value = false
      }, 1500)
    }

    return {
      loading,
      user,
      profile,
      showVariationsSheet,
      swipe,
      finishedAddingToCart,
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
