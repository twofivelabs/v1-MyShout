<template>
  <!-- <GlobalAddress @address="emittedAddress" /> -->
  <v-autocomplete
      v-model="location"
      :items="searchResults"
      :loading="loading"
      :search-input.sync="searchAddress"
      autocomplete="off"
      cache-items
      hide-details="true"
      :label="$t('form.search_for_address')"
      :placeholder="$t('form.search_for_address')"
      outlined
      required
  />
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useStore,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalAddress',
  emits: [
    'address'
  ],
  setup (_, { emit }) {
    const { state } = useStore()
    const { $system } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const searchResults = ref([])
    const searchResultsFull = ref([])
    const searchAddress = ref(null)
    const service = ref(null)
    const location = ref('')
    const address = ref(null)
    const placesService = ref(null)

    // METHODS
    const mapsInit = () => {
      try {
        service.value = new window.google.maps.places.AutocompleteService()
        placesService.value = new window.google.maps.places.PlacesService(
            new window.google.maps.Map(document.createElement('div'))
        )
      } catch (e) {
        $system.log({
          comp: 'GlobalAddress',
          msg: 'mapsInit',
          val: e
        })
      }
    }
    const querySelections = (val) => {
      if (val) {
        service.value.getPlacePredictions({
          input: val,
          // fields: ['place_id'],
          types: ['geocode'],
          componentRestrictions: { country: ['us', 'ca'] }
        }, setSearchResults)
      }
    }
    const setSearchResults = (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        searchResults.value = []
        return
      }
      // prediction.place_id
      searchResults.value = predictions.map(prediction => prediction.description)
      searchResultsFull.value = predictions
    }
    const getPlaceDetails = (placeId) => {
      return new Promise((resolve, reject) => {
        placesService.value.getDetails({
              placeId,
              fields: ['geometry']
            },
            (result, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                return resolve({
                  lat: result.geometry.location.lat(),
                  lng: result.geometry.location.lng()
                }) // lng()
              }
              return reject(result)
            })
      })
    }

    // MOUNTED
    onMounted(() => {
      mapsInit()
    })

    // WATCH
    watch(searchAddress, (val) => {
      val && val !== location.value && querySelections(val)
    })
    watch(location, async (val) => {
      if (val) {
        const a = val.split(',')
        address.value = {
          address_1: a[0].trim(),
          city: a[1].trim(),
          province: a[2].trim(),
          country: a[3].trim()
        }

        const found = lodash.filter(searchResultsFull.value, { description: val })
        try {
          const geo = await getPlaceDetails(found[0].place_id)
          address.value.lat = geo.lat
          address.value.lng = geo.lng
        } catch (e) {
          // ...
        }
        emit('address', address)
      }
    })

    return {
      user,
      profile,
      loading,
      searchResults,
      searchResultsFull,
      searchAddress,
      service,
      location,
      address,
      placesService,
      mapsInit,
      querySelections,
      setSearchResults,
      getPlaceDetails
    }
  }
})
</script>
