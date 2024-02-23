<template>
  <v-switch
      v-model="locationPermissionGranted"
      hide-details="true"
      :label="label"
      prepend-icon="mdi-map-marker-account"
      @click="toggleLocation"
  />
</template>
<script>

import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'

/**
 * TODO: THIS PAGE COULD GET CLEANED UP AND IMPROVED
 */
export default defineComponent({
  name: 'MapLocationtoggle',
  props: {
    label: {
      type: String,
      default: () => {
        return 'Location'
      }
    }
  },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $capacitor,
    } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const locationPermissionGranted = ref(false)

    // MOUNT
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
         locationPermissionGranted.value = profile.value.permissions.location
        }, 1000)
      })
    })

    // METHODS
    const removePermissions = async () => {
      await dispatch('user/updateField', {
        permissions: {
          location: false
        }
      })
      // await $capacitor.clearWatchPosition()
    }
    const toggleLocation = async () => {
      if (locationPermissionGranted.value === true) {
        await $capacitor.positionPermissions()
      } else {
        await removePermissions()
      }

      /**
       * TODO: Look at this, if its false, every time you load the page it will
       *       update the db to false. Should look to implement WebNotifications Permissions
       *       DeviceNotifications Permissions
       */
      if (locationPermissionGranted.value) {
        await dispatch('user/updateField', {
          permissions: {
            location: locationPermissionGranted.value
          }
        })
      }
    }

    return {
      loading,
      user,
      profile,
      locationPermissionGranted,
      toggleLocation,
    }
  }
})
</script>
