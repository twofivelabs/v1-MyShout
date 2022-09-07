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
            <ElementH1 align="left" text="Emergency Alerts" />
          </div>
          <ElementP align="left" text="By pressing any of the following alerts, you'll be notifying all your emergency contacts your last known location." />
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
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomePage',
  middleware: 'authenticated',
  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $config,
      $capacitor,
    } = useContext()
    const loading = ref(false)
    const user = computed(() => state.user)

    // DEFINE CONTENT
    const location = computed(() => state.user.location)
    const posts = ref([])

    // GET CONTENT

    // GPS PERMISSIONS
    $capacitor.gpsCheckPermissions().then(async (has) => {
      if (has) {
        console.log('STICKY: GPS > HAS PERMISSIONS')
        await $capacitor.gpsGetCurrentPosition(l => {
          console.log('STICKY: GPS > ', l)
        })
      }
    })

    // MOUNTED
    onMounted(() => {
      // Check user if they have profile pieces
      setTimeout(() => {
        dispatch('user/checkUserData')
      }, 2500)
    })

    // MICROPHONE PERMISSIONS
    $capacitor.microphonePermissions()
    // NOTIFICATION PERMISSIONS
    if ($capacitor.pushNotificationsRequestAndRegisterPermissions()) {
      console.log('STICKY: Notifications > Granted')
    }

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
      posts
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
