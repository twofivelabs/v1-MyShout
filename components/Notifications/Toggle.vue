<template>
  <v-switch
      v-model="notificationPermissionGranted"
      hide-details="true"
      :label="label"
      prepend-icon="mdi-bell"
      @click="toggleNotifications"
  />
</template>
<script>

import {
  computed,
  defineComponent, nextTick,
  onMounted,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'

/**
 * TODO: THIS PAGE COULD GET CLEANED UP AND IMPROVED
 */
export default defineComponent({
  name: 'NotificationsToggle',
  props: {
    label: {
      type: String,
      default: () => {
        return 'Notifications'
      }
    }
  },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $notify,
      $system,
      $capacitor,
      $fire
    } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const token = ref(null)
    const device = ref(null)
    const isWeb = ref(false)
    const notificationPermissionGranted = ref(false)

    // MOUNT
    onMounted(async () => {
      device.value = await $capacitor.device()
      if (device.value && device.value.platform && (device.value.platform === 'web' || typeof device.value.platform === 'undefined' || device.value.platform === null)) {
        isWeb.value = true
      }
      nextTick(() => {
        setTimeout(() => {
          if (profile.value.permissions.notifications) {
            notificationPermissionGranted.value = true
          }
        }, 1000)
      })
    })

    // METHODS
    const removePermissions = async () => {
      await dispatch('user/updateField', {
        permissions: {
          notifications: false
        }
      })
      if (!isWeb.value) {
        await $capacitor.pushNotificationsRemoveListeners()
      }
    }
    const toggleNotifications = async () => {
      console.log('notificationPermissionGranted.value', notificationPermissionGranted.value)
      if (notificationPermissionGranted.value === true) {
        if (isWeb.value) {
          await requestWebPermissions()
          token.value = profile.value.notificationWebToken
        } else {
          await $capacitor.pushNotificationsRequestAndRegisterPermissions()
          token.value = profile.value.notificationDeviceToken
        }
      } else {
        await removePermissions()
      }

      /**
       * TODO: Look at this, if its false, every time you load the page it will
       *       update the db to false. Should look to implement WebNotifications Permissions
       *       DeviceNotifications Permissions
       */
      if (notificationPermissionGranted.value) {
        await dispatch('user/updateField', {
          permissions: {
            notifications: notificationPermissionGranted.value
          }
        })
      }
    }
    const requestWebPermissions = async () => {
      try {
        if (!window.Notification) {
          // notificationPermissionGranted.value = false
          $notify.show({
            text: 'Notifications not supported!',
            color: 'error'
          })
          /*} else if (location.protocol === 'http:') {
            // notificationPermissionGranted.value = false
            $notify.show({
              text: 'You must be using HTTPS to receive notifications',
              color: 'error'
            })*/
        } else {
          const permission = await Notification.requestPermission()
          notificationPermissionGranted.value = permission === 'granted'

          // This will get token and store it
          if ($fire.messaging) {
            await $fire.messaging.getToken()
          }
          // Update user
          await dispatch('user/updateField', {
            permissions: {
              notifications: (permission === 'granted')
            }
          })
        }
      } catch (e) {
        $notify.show({
          text: 'Error with your notifications.',
          color: 'error'
        })

        $system.log({
          comp: 'UserToggleSettings',
          msg: 'requestWebPermissions',
          val: e
        })
      }
    }

    return {
      loading,
      user,
      token,
      profile,
      notificationPermissionGranted,
      toggleNotifications,
    }
  }
})
</script>
