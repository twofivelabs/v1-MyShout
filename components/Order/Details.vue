<template>
  <div>
    <div v-if="order && Object.keys(order).length > 0" class="mt-3">
      <v-row>
        <v-col>
          Ordered on <b>{{ order.created_at }}</b>.
          <div>Your order ID is
            <v-chip small>
              {{ order.orderId.split('-')[0] }}
            </v-chip>
            .
          </div>
          <div>
            <span v-if="order.order.total_after_tip"
            >With a total of <b>{{ order.order.total_after_tip }}</b>.</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5">
          <v-sheet class="pa-2 mb-2 text-body-2" outlined rounded>
            <small>BILL TO</small>
            <div>{{ order.order.bill_to.address_2 }} {{
                order.order.bill_to.address_1
              }}
            </div>
            <div>{{ order.order.bill_to.city }} {{ order.order.bill_to.province }}</div>
            <div>{{ order.order.bill_to.country }} {{ order.order.bill_to.postal }}</div>
          </v-sheet>
          <v-sheet class="pa-2 mb-2 text-body-2" outlined rounded>
            <small>SHIP TO</small>
            <div>{{ order.order.ship_to.address_2 }} {{
                order.order.ship_to.address_1
              }}
            </div>
            <div>{{ order.order.ship_to.city }} {{ order.order.ship_to.province }}</div>
            <div>{{ order.order.ship_to.country }} {{ order.order.ship_to.postal }}</div>
            <v-btn class="elevation-0" small @click="openMap(order.order.ship_to)">View
              Map
            </v-btn>
          </v-sheet>
          <div v-if="order.order.shipping_instructions" class="mt-4">
            Shipping Instructions: {{ order.order.shipping_instructions }}
          </div>
        </v-col>
        <v-col v-if="order.order.grouped.items">
          <v-sheet
              v-for="(group, groupKey) in order.order.grouped.items"
              :key="groupKey"
              class="pa-2 mb-2"
              outlined
              rounded
          >
            <h5 class="pt-2">
              {{ group[0].company.name }}
            </h5>
            <v-row v-for="(item, itemKey) in group" :key="itemKey"
                   class="ma-0 align-center"
            >
              <v-col class="pa-0" cols="5" sm="4">
                <nuxt-link :to="`/products/${item.id}`">
                  <v-avatar class="avatar-elevation white rounded-lg elevation-3" rounded
                            size="60"
                  >
                    <v-img
                        :src="item.product_image"
                        contain
                    />
                  </v-avatar>
                  <span
                      class="black--text grey lighten-2 rounded-lg pa-3 pl-5 mt-6 ml-n3"
                  >
                    <span class="subtitle-1">{{ item.quantity }}</span>
                    <span class="caption grey--text darken-4">Qty</span>
                  </span>
                </nuxt-link>
              </v-col>
              <v-col class="pa-0">
                <div class="text-caption grey--text text--darken-1 text-uppercase">
                  <nuxt-link :to="`/companies/${item.company.id}`">
                    {{ item.company.name }}
                  </nuxt-link>
                </div>
                <nuxt-link :to="`/products/${item.id}`" class="text-body-2"
                           style="color:#616161"
                >
                  {{ item.name }}
                </nuxt-link>
                <span v-if="item.label" class="text-body-2 font-weight-bold">
                  / {{ item.label }}
                </span>
              </v-col>
              <v-col class="pa-0 text-right" cols="2" sm="2">
                {{ item.price | centsToDollars }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-row v-if="order.order.grouped.totals[groupKey].bottle_deposit">
                  <v-col>
                    <h5>Bottle Deposit</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.totals[groupKey].bottle_deposit | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
                <v-row
                    v-if="order.order.grouped.shipping && order.order.grouped.shipping[groupKey]"
                    class="mt-0"
                >
                  <v-col>
                    <h5>{{ order.order.grouped.shipping[groupKey].label }}</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.shipping[groupKey].cost | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
                <v-row
                    v-if="order.order.grouped.totals && order.order.grouped.totals[groupKey].discount"
                    class="mt-0"
                >
                  <v-col>
                    <h5>Discount</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.totals[groupKey].discount | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                  v-if="order.order.grouped.totals && order.order.grouped.totals[groupKey]"
                  cols="12" md="6"
              >
                <v-row>
                  <v-col>
                    <h5>Sub Total</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.totals[groupKey].sub_total | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col>
                    <h5>Tax Total</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.totals[groupKey].tax | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col>
                    <h5>Total</h5>
                  </v-col>
                  <v-col class="text-right">
                    <h5>{{
                        order.order.grouped.totals[groupKey].total | centsToDollars
                      }}</h5>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      No order available.
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailsComp',
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  methods: {
    openMap (location) {
      const params = encodeURIComponent(`${location.address_1} ${location.city} ${location.province}`)
      window.open(`https://www.google.com/maps/place/${params}`, '_blank')
    }
  }
}
</script>
