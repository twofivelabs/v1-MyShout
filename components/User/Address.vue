<template>
  <div>
    <div v-if="loading">
      <v-skeleton-loader
          type="list-item-avatar-two-line"
      />
    </div>
    <div v-else>
      <div v-if="billing && Object.keys(billing).length > 0">
        <ElementH3 align="left" class="mb-8" text="Billing Address"/>
        <v-sheet class="mt-4 pa-2 mb-2 text-body-2" outlined rounded>
          <div>{{ billing.first_name }} {{ billing.last_name }}</div>
          {{ billing.address_2 }} {{ billing.address_1 }}
          {{ billing.city }}, {{ billing.province }}
          {{ billing.country }}, {{ billing.postal }}
        </v-sheet>
      </div>
      <div v-if="shipping && Object.keys(shipping).length > 0" class="mt-6">
        <ElementH3 align="left" text="Shipping Addresses"/>
        <v-sheet
            v-for="(ship, index) in shipping"
            :key="index"
            :class="`mt-4 pa-2 mb-2 ${ship.slug} text-body-2`"
            outlined
            rounded
        >
          <v-btn icon rounded text x-small @click="removeAddress(ship.slug)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div>{{ ship.first_name }} {{ ship.last_name }}</div>
          {{ ship.address_2 }} {{ ship.address_1 }}
          {{ ship.city }}, {{ ship.province }}
          {{ ship.country }}, {{ ship.postal }}
        </v-sheet>
      </div>
      <div v-if="(!billing && shipping.length === 0)">
        <div style="text-align:center;">
          <ElementH4 align="center"
                     class="mt-6"
                     text="After you make a purchase you will see addresses here."
          />
          <v-btn class="mt-3 mb-3" elevation="0" to="/">
            Start Now
          </v-btn>
          <div>
            <object data="/svg/DeliverBeer.svg" style="max-width:200px; height:250px;"
                    type="image/svg+xml"
            >
              <img src="/svg/DeliverBeer.svg">
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
  name: 'UserAddress',
  middleware: 'authenticated',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $notify,
      $system
    } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const billing = ref(false)
    const shipping = ref([])

    // GET CONTENT
    useAsync(async () => {
      try {
        loading.value = true
        // Billing address
        const billingAddress = await dispatch('user/address/search', {
          term: 'billing'
        })
        if (billingAddress && billingAddress[0]) {
          billing.value = billingAddress[0]
        }
        // Shipping address
        const shippingAddress = await dispatch('user/address/search', {
          term: 'shipping'
        })
        if (shippingAddress && shippingAddress[0]) {
          shipping.value = shippingAddress
        }
      } catch(e) {
        $system.log({
          comp: 'UserAddress',
          msg: 'Not able to get address',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    // METHODS
    const removeAddress = async (slug) => {
      try {
        loading.value = true
        const response = await dispatch('user/address/remove', slug)
        removeOneShipping(slug)
        if (response) {
          removeOneShipping(slug)
          $notify.show({
            text: 'Success',
            color: 'success'
          })
        } else {
          $notify.show({
            text: 'Error, try again',
            color: 'error'
          })
        }
      } catch(e) {
        $system.log({
          comp: 'UserAddress',
          msg: 'Not able to remove',
          val: e
        })
        $notify.show({
          text: 'Error, try again',
          color: 'error'
        })
      } finally {
        loading.value = false
      }
    }
    const removeOneShipping = (slug) => {
      const indexOfMatchingSlug = shipping.value.findIndex(one => one.slug === slug)
      if (indexOfMatchingSlug > -1) {
        shipping.value.splice(indexOfMatchingSlug, 1)
        return true
      }
      return false
    }

    return {
      loading,
      user,
      profile,
      billing,
      shipping,
      removeAddress,
      removeOneShipping
    }
  },
  head: {}
})
</script>
