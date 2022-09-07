<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
          :elevation="hover ? 4 : 0"
          :width="$helper.cardWidth()"
          class="rounded-xl company-card"
          @click="goTo"
      >
        <v-img
            v-if="company.logo_url"
            :max-width="$helper.cardWidth()"
            :src="company.logo_url"
            class="rounded card-image"
            contain
            height="150"
            lazy-src="/placeholder.png"
        />
      </v-card>
    </v-hover>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostCard',
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
    const router = useRouter()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    const closestLocation = ref('')

    // METHODS
    const getClosestLocation = () => {
      if (props.company.locations && props.company.locations.length > 0 && profile.value.location.city) {
        const res = lodash.find(props.company.locations, { city: profile.value.location.city })
        if (res) {
          closestLocation.value = `${res.address_1} ${res.city} ${res.province}`
        }
      }
    }
    const goTo = () => {
      if (props.company.address && props.company.address.lat) {
        const panTo = new window.google.maps.LatLng(props.company.address.lat, props.company.address.lng)
        window.currentMap.panTo(panTo)
      } else {
        router.push(`/companies/${props.company.id}`)
      }
    }

    // MOUNTED
    onMounted(() => {
      getClosestLocation()
    })

    return {
      user,
      profile,
      closestLocation,
      goTo
    }
  }
})
</script>
