<template>
  <div>
    <div v-if="loading">
      <v-skeleton-loader
          type="list-item-avatar-three-line"
      />
      <v-skeleton-loader
          type="list-item-avatar-three-line"
      />
      <v-skeleton-loader
          type="list-item-avatar-three-line"
      />
    </div>
    <div v-else>
      <div v-if="orders && orders.length > 0">
        <ElementH3 align="left" class="mb-8 ml-2" text="Orders"/>
        <v-row v-for="(order, id) in orders" :key="id" @click="showDetails(order)">
          <v-col cols="4">
            <v-item-group class="company-list-card float-left pa-1">
            <span v-for="(product, productKey) in order.order.items" :key="productKey"
                  :class="`company-product-${productKey}`"
            >
              <v-avatar class="avatar-elevation white rounded-lg elevation-3" rounded>
                <v-img
                    :src="product.images[0]"
                    contain
                    lazy-src="/placeholder.png"
                />
              </v-avatar>
            </span>
            </v-item-group>
            <div
                :class="`${$vuetify.theme.dark ? 'black' : 'grey'} lighten-4 rounded-lg text-center float-left px-4 py-2 ml-n3`"
            >
              <div class="font-weight-black">
                {{ order.order.item_count }}
              </div>
              <div class="text-caption">
                Qty
              </div>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="text-capitalize mr-3">
              {{ order.order.status }}
            </div>
            <div class="text-caption">
              {{ order.created_at }}
            </div>
          </v-col>
          <v-col class="text-right">
            {{ order.order.total_after_tip }}
          </v-col>
          <v-col class="text-right">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-col>
        </v-row>
        <v-bottom-sheet
            v-model="showDetailsSheet"
            :scrollable="true"
            class="bottom-sheet"
            inset
            max-width="700"
        >
          <v-sheet
              class="pa-5 overflow-y-auto rounded-t-xl"
              height="75vh"
          >
            <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                            @click.native="swipe('Down')"
            />
            <ElementH3 align="left" text="Order Details"/>
            <OrderDetails :order="orderDetails"/>
          </v-sheet>
        </v-bottom-sheet>
      </div>
      <div v-else>
        <div style="text-align:center;">
          <ElementH4 align="center" text="You have no orders. Let's get started."/>
          <v-btn class="mt-3 mb-3" elevation="0" to="/">
            Start Now
          </v-btn>
          <div>
            <object data="/svg/BeerSurfer.svg"
                    style="max-width:200px; height:200px;"
                    type="image/svg+xml"
            >
              <img src="/svg/BeerSurfer.svg">
            </object>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useAsync,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserOrders',
  middleware: 'authenticated',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const { $system } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    // DEFINE CONTENT
    const loading = ref(false)
    const showDetailsSheet = ref(false)
    const orderDetails = ref(false)
    const orders = ref([])

    // GET CONTENT
    useAsync(async () => {
      try {
        loading.value = true
        orders.value = await dispatch('orders/getAll', {
          where: {},
          order: {
            by: 'created_at',
            direction: 'desc'
          }
        })
      } catch(e) {
        $system.log({
          comp: 'UserOrders',
          msg: 'Not able to get orders',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    // METHODS
    const showDetails = (item) => {
      orderDetails.value = Object.assign({}, item)
      showDetailsSheet.value = true
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showDetailsSheet.value = false
      }
    }

    return {
      loading,
      user,
      profile,
      showDetailsSheet,
      orderDetails,
      orders,
      showDetails,
      swipe
    }
  },
  head: {}
})
</script>
<style>
.company-list-card {
  overflow: hidden;
}

.company-product-0 {
  z-index: 2;
}

.company-product-1 {
  opacity: 0.25;
  position: absolute;
  padding-left: 5px;
}
</style>
