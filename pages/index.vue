<template>
  <v-container class="mobileNotch" style="height:calc(100vh - 75px);">
    <v-row class="pa-6" v-if="loading">
      <v-col>
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
        <v-skeleton-loader width="100%" max-height="90" type="image" class="mb-6" />
      </v-col>
    </v-row>
    <div v-else class="mx-5 pt-2">
      <div class="d-flex flex-column justify-space-between" style="height:75vh;">
        <div>
          <div class="d-flex d-inline-flex align-center">
            <IconsMinishout class="mr-2" />
            <ElementH1 align="left" :text="$t('page.home_h1')" />
          </div>
          <ElementP align="left" :text="$t('page.home_p')" />
        </div>

        <div>
          <AlertAccidentbutton />
          <AlertKidnappingbutton />
          <AlertRobberybutton />
        </div>

        <AlertShoutbutton />

      </div>
    </div>
  </v-container>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useMeta,
  useStore,
  onMounted,
  watchEffect,
} from '@nuxtjs/composition-api'
import {Preferences} from '@capacitor/preferences'
import { LocalNotifications } from '@capacitor/local-notifications'

export default defineComponent({
  name: 'HomePage',
  middleware: 'authenticated',
  setup () {
    const {
      state,
    } = useStore()
    const {
      $config,
      $capacitor,
    } = useContext()
    const loading = ref(false)
    const user = computed(() => state.user)

    // DEFINE CONTENT
    const location = computed(() => state.user.location)
    const hasRequestedNotificationPermissions = ref(false)
    const hasRequestedMicrophonePermissions = ref(false)
    const localNotificationRequestPermission = async () => {
      await LocalNotifications.requestPermissions()
    }

    // WATCH
    watchEffect(async () => {
      // NOTIFICATION PERMISSIONS
      if (hasRequestedNotificationPermissions.value === false) {
        // console.log('STICKY: watchEffect > Request Push Notifications')
        await $capacitor.pushNotificationsRequestAndRegisterPermissions().then(() => {
          hasRequestedNotificationPermissions.value = true
          $capacitor.pushNotificationsListeners()
        })
      }

      // MICROPHONE PERMISSIONS
      if (hasRequestedMicrophonePermissions.value === false) {
        // console.log('STICKY: watchEffect > Request Microphone')
        await $capacitor.microphonePermissions().then(() => {
          hasRequestedMicrophonePermissions.value = true
        })
      }
    })

    // MOUNTED
    onMounted(async () => {
      // Check user if they have profile pieces
      setTimeout(() => {
        // NEW GPS
        $capacitor.gpsInit()

        try {
          Preferences.set({
            key: 'currentUserId',
            value: user.value.data.uid,
          })
        } catch {
          // ...
        }

        try {
          localNotificationRequestPermission()
        } catch {
          // ...
        }
      }, 2500)
    })

    // PAGE META
    useMeta({
      title: `${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: ``
      }]
    })

    return {
      loading,
      user,
      location,
      localNotificationRequestPermission,
    }
  },
  head: {}
})
</script>
<style scoped>
.vue-google-map, .vue-google-map .map-view {
  height: 100vh;
}
</style>
