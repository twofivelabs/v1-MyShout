<template>
  <v-hover v-slot="{ hover }">
    <v-list
        :rounded="$vuetify.breakpoint.mdAndUp"
        class="transparent-list pa-0"
    >
      <v-list-item
          :elevation="hover ? 4 : 0"
          :style="`${$vuetify.breakpoint.smAndDown ? 'border-bottom:1px solid rgba(222, 222, 222, 0.50);' : ''}`"
          :to="`/companies/${company.id}`"
          class="mx-auto company-list-card"
          nuxt
      >
        <v-list-item-content>
          <v-list-item-title>
            <ElementH3 :text="company.name" align="left"/>
            <v-list-item-subtitle>
              <ElementPreviouslyliked :company="company"/>
              <!--            <ElementTraveltime :destination="closestLocation" />-->
            </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="products && products.length > 0" style="width:25%;">
          <v-item-group>
          <span v-for="(product, productKey) in products" :key="productKey"
                :class="`company-product-${productKey}`"
          >
            <v-avatar class="avatar-elevation rounded-lg elevation-3" rounded size="55"
                      style="background-color:#fff;"
            >
              <v-img
                  :src="product.images[0]"
                  contain
              />
            </v-avatar>
          </span>
          </v-item-group>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-hover>
</template>
<script>

import { defineComponent, onMounted, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyListWithProducts',
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    // const profile = computed(() => state.user.profile)
    const loading = ref(false)
    const products = ref([])
    const closestLocation = ref('')

    // GET CONTENT
    const getProductsForCompany = async (companyId) => {
      try {
        loading.value = true
        products.value = await dispatch('products/search', {
          field: 'company.id',
          operator: '==',
          term: companyId,
          limit: 3
        })
      } catch {
        // Not able to get products for company
      } finally {
        loading.value = false
      }
    }

    // METHODS
    /* const getClosestLocation = () => {
      if (process.client) {
        if (props.company.locations && props.company.locations.length > 0 && profile.value.location.city) {
          const res = lodash.find(props.company.locations, { city: profile.value.location.city })
          if (res) {
            closestLocation.value = `${res.address_1} ${res.city} ${res.province}`
          } else if (props.company.locations && props.company.locations[0]) {
            closestLocation.value = `${props.company.locations[0].address_1} ${props.company.locations[0].city} ${props.company.locations[0].province}`
          }
        }
      }
    } */

    // MOUNTED
    onMounted(() => {
      getProductsForCompany(props.company.id)
      // getClosestLocation()
    })

    return {
      products,
      closestLocation,
      getProductsForCompany
    }
  }
})
</script>
<style scoped>
.transparent-list.theme--light.v-sheet {
  background-color: transparent;
}

.company-list-card {
  overflow: hidden;
}

.company-product-0 {
  z-index: 2;
}

.company-product-1 {
  /*opacity: 0.75;*/
  position: absolute;
  padding-left: 5px;
}

.company-product-2 {
  /*opacity: 0.25;*/
  position: absolute;
  padding-left: 5px;
}
</style>
