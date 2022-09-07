<template>
  <div v-if="locations && locations.length > 0">
    <ElementH5 text="Locations" align="left" class="mt-8" />
    <v-sheet
      v-for="(location, locKey) in locations"
      :key="locKey"
      elevation="0"
      outlined
      rounded
      class="mt-1 pa-2 locations-list body-2"
      style="background-color:transparent"
    >
      <v-row class="align-center" @click="openMap(location)">
        <v-col cols="1">
          <v-icon @click="openMap(location)">
            mdi-google-maps
          </v-icon>
        </v-col>
        <v-col>
          <div>{{ location.address_1 }}</div>
          <div>{{ location.city }} {{ location.province }}</div>
          <ElementTraveltime :destination="`${location.address_1} ${location.city} ${location.province}`" />
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  defineComponent, ssrRef, useRoute, useStore, useFetch, useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyLocations',
  props: {
    company: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup () {
    const { dispatch } = useStore()
    const { $system } = useContext()
    const route = useRoute()
    const loading = ssrRef(true)

    // DEFINE CONTENT
    const locations = ssrRef([])

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        await dispatch('companies/getLocations', route.value.params.id).then((res) => {
          if (res !== false) {
            locations.value = lodash.cloneDeep(res)
          }
        })
      } catch(e) {
        $system.log({
          comp: 'CompanyLocations',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    const openMap = (location) => {
      const params = encodeURIComponent(`${location.address_1} ${location.city} ${location.province}`)
      window.open(`https://www.google.com/maps/place/${params}`, '_blank')
    }

    return {
      locations,
      openMap
    }
  }
})
</script>
