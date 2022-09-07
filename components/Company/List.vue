<template>
  <v-hover v-slot="{ hover }">
    <v-list-item
        :elevation="hover ? 4 : 0"
        :to="`/companies/${company.id}`"
        class="mx-auto company-list-card"
        nuxt
    >
      <v-list-item-avatar
          v-if="company.logo_url"
          class="avatar-elevation rounded-lg elevation-3"
          rounded
      >
        <v-img
            :src="company.logo_url"
            contain
            lazy-src="/placeholder.png"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <ElementH4 :text="company.name" align="left"/>
          <v-list-item-subtitle v-if="getClosestLocation()">
            <ElementTraveltime :destination="getClosestLocation()"/>
          </v-list-item-subtitle>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-hover>
</template>
<script>

import lodash from 'lodash'

import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyList',
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { state } = useStore()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    // METHODS
    const getClosestLocation = () => {
      if (props.company.locations && props.company.locations.length > 0 && profile.location.city) {
        const res = lodash.find(props.company.locations, { city: profile.location.city })
        if (res) {
          return `${res.address_1} ${res.city} ${res.province}`
        }
      }
      return false
    }

    return {
      user,
      profile,
      getClosestLocation
    }
  }
})
</script>
