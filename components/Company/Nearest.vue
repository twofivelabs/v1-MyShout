<template>
  <v-row
      v-if="nearestCompanies && nearestCompanies.length > 0"
      class="align-center rounded-lg ma-4"
      style="border:1px solid #BDBDBD;"
  >
    <v-col cols="6">
      <ElementH4 align="left" class="grey--text lighten-1" text="Breweries Nearby"/>
    </v-col>
    <v-col class="text-right" cols="6">
      <nuxt-link v-for="(company, index) in nearestCompanies" :key="index"
                 :to="`/companies/${company.id}`" class="nearest-company"
      >
        <v-img
            v-if="company.logo_url"
            :src="`${company.logo_url}`"
            contain
            max-height="40"
            style="display:inline-block;"
        />
      </nuxt-link>
    </v-col>
  </v-row>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useStore,
  watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyLogo',
  transition: 'fade',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    /*const {
      $capacitor
    } = useContext()*/
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const nearestCompanies = computed(() => state.companies.nearest)
    const gps = computed(() => state.user.gps)

    // MOUNT
    onMounted(() => {
      // $capacitor.watchPosition()
    })

    watchEffect(async () => {
      if (gps.value.lat) {
        await dispatch('companies/getNearest', [gps.value.lat, gps.value.lng])
      } else if (profile.value.location.lat) {
        await dispatch('companies/getNearest', [profile.value.location.lat, profile.value.location.lng])
      }
    })

    return {
      loading,
      nearestCompanies
    }
  }
})
</script>
<style scoped>
.nearest-company {
  display: inline-block;
  max-width: 30%;
  margin-left: 5px;
}
</style>
