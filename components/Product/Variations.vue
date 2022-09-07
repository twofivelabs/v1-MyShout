<template>
  <div v-if="product.variations && product.variations.length > 0">
    <v-item-group class="ma-0 px-2 mt-4" mandatory @change="select">
      <v-row>
        <v-col
            v-for="(v, n) in product.variations"
            :key="n"
            :cols="12/product.variations.length"
            class="pa-1"
        >
          <v-item v-slot="{ active, toggle }">
            <v-card
                :color="active ? 'primary' : 'grey darken-1'"
                class="d-flex align-center text--grey"
                dark
                elevation="0"
                height="60"
                @click="toggle"
            >
              <v-scroll-y-transition>
                <div class="flex-grow-1 text-center">
                  <ElementH5 :text="`${v.label}`" class="text--grey"/>
                  <ProductPrice :price="`${v.price}`" :salePrice="`${v.sale_price}`"/>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>
<script>

import { defineComponent, useContext, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductVariations',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { commit } = useStore()
    const { $system } = useContext()

    // METHODS
    const select = (e) => {
      try {
        // console.log('SELECT', e)
        const p = Object.assign({}, props.product)
        const variation = Object.assign({}, p.variations[e])
        const variationProduct = Object.assign(p, variation)
        commit('products/SET_SELECTED', variationProduct)
      } catch (e) {
        $system.log({
          comp: 'ProductVariations',
          msg: 'select',
          val: e
        })
      }
    }

    return {
      select
    }
  }
})
</script>
