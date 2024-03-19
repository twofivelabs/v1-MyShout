<template>
  <div v-if="duration" class="duration caption">
    Travel: {{ duration }}
  </div>
</template>
<script>

import {
  defineComponent,
  useContext,
  useStore,
  onMounted,
  ref,
  computed
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ElementTravelTime',
  props: {
    origin: {
      type: String,
      default: () => {
        return null
      }
    },
    destination: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  setup (props) {
    const { state, dispatch } = useStore()
    const { $helper, $system } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const duration = ref('')
    const finalOrigin = ref('')

    // MOUNTED
    onMounted(async () => {
      finalOrigin.value = getOrigin()
      if (finalOrigin.value && props.destination) {
        if (await getLocalTime() === false) {
          getTime()
        }
      }
    })

    // METHODS
    const getOrigin = () => {
      let o
      if (origin.value) {
        o = origin.value
      } else {
        o = `${profile.value.location.address_1} ${profile.value.location.city} ${profile.value.location.province} ${profile.value.location.postal}`
      }
      return o
    }
    const getTime = () => {
      try {
        if (finalOrigin.value) {
          const service = new window.google.maps.DistanceMatrixService()
          const request = {
            origins: [finalOrigin.value],
            destinations: [props.destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }
          service.getDistanceMatrix(request).then((response) => {
            duration.value = response.rows[0].elements[0].duration.text
            addLocalTime(duration.value)
          })
        }
      } catch(e) {
        $system.log({ comp: 'ElementTravelTime', msg: 'getTime', val: e })
      }
    }
    const getLocalTime = async () => {
      try {
        const res = await dispatch('admin/getOne', {
          adminPath: 'UI/TravelTime',
          id: $helper.slugify(`${getOrigin()}-${props.destination}`)
        })
        if (res === false) {
          return res
        } else {
          duration.value = res.time
        }
      } catch(e) {
        $system.log({ comp: 'ElementTravelTime', msg: 'getLocalTime', val: e })
      }
    }
    const addLocalTime = async (time) => {
      try {
        return await dispatch('admin/add', {
          adminPath: 'UI/TravelTime',
          data: {
            title: `${getOrigin()}-${props.destination}`,
            time
          }
        })
      } catch(e) {
        $system.log({ comp: 'ElementTravelTime', msg: 'addLocalTime', val: e })
      }
    }

    return {
      user,
      profile,
      loading,
      duration
    }
  }
})
</script>
