<template>
  <div>
    <div v-if="products && products.length > 0">
      <v-slide-group
          v-model="model"
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          center-active
      >
        <v-slide-item
            v-for="(product, key) in products"
            :key="key"
            class="ma-2 pb-1"
        >
          <ProductCard :isSlider="true" :product="product"/>
        </v-slide-item>
      </v-slide-group>
    </div>
    <div v-else>
      <v-row class="mt-4">
        <v-col
            v-for="index in howManyPlaceholders"
            :key="index"
            cols="6"
            sm="4"
        >
          <v-skeleton-loader
              max-width="200"
              type="card"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>

import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductSlider',
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const { $vuetify } = useContext()
    const model = ref(null)
    const howManyPlaceholders = computed(() => $vuetify.breakpoint.smAndDown ? 2 : 3)

    return {
      howManyPlaceholders,
      model
    }
  }
})
</script>
<style scoped>
.product-card .name {
  word-break: break-word;
  line-height: 1.33em;
}

.card-image {
  height: 130px;
  width: 100%;
}

.missing-image {
  opacity: .25;
}
</style>
