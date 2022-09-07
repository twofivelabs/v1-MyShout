<template>
  <div>
    <v-row>
      <v-col>
        <v-chip-group
            v-model="currentFilter"
            :show-arrows="$vuetify.breakpoint.mdAndUp"
            active-class="primary--text"
            center-active
            class="mt-3"
        >
          <v-chip
              v-for="(filter, index) in filters"
              :key="index"
              class="mr-1"
              filter
              outlined
              small
              style="text-transform: capitalize"
              @click="filterSelected(filter)"
          >
            {{ filter }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row class="pb-8">
      <v-col
          v-for="(product, index) in selectedProducts"
          :key="index"
          class="pa-1"
          cols="6"
          lg="3"
          md="4"
          sm="4"
          xl="2"
      >
        <ProductCard :product="product"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import lodash from 'lodash'

import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyProducts',
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const filters = []
    const selectedProducts = ref(props.products)
    const currentFilter = ref(null)

    // METHODS
    props.products.forEach((p) => {
      p.tags.forEach((t) => {
        if (!filters.includes(t)) {
          filters.push(t)
        }
      })
    })
    const filterSelected = (sel) => {
      currentFilter.value = filters.findIndex(one => one === sel)
      selectedProducts.value = lodash.filter(props.products, (s) => {
        return s.tags.includes(sel)
      })
    }

    // MOUNT
    onMounted(() => {
      filterSelected('beer')
    })

    return {
      filters,
      currentFilter,
      selectedProducts,
      filterSelected
    }
  }
})
</script>
