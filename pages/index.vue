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

        <v-btn @click="sendGPSChanges">Update GPS</v-btn>
        <v-btn @click="sendGPSChangesRest">Update GPS REST</v-btn>
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
      $capacitor, $services
    } = useContext()
    const loading = ref(false)
    const user = computed(() => state.user)

    // DEFINE CONTENT
    const location = computed(() => state.user.location)
    const posts = ref([])

    // GET CONTENT

    // MOUNTED
    onMounted(async () => {
      // GPS PERMISSIONS
      $capacitor.gpsCheckPermissions().then(async (has) => {
        if (has) {
          console.log('STICKY: GPS > HAS PERMISSIONS')
          await $capacitor.gpsGetCurrentPosition(l => {
            console.log('STICKY: GPS > ', l)
          })
        }
      })

      // MICROPHONE PERMISSIONS
      $capacitor.microphonePermissions()

      // NOTIFICATION PERMISSIONS
      if ($capacitor.pushNotificationsRequestAndRegisterPermissions()) {
        console.log('STICKY: Notifications > Granted')
      }

      // BACKGROUND TASKS (Maybe move to layout)
      await $capacitor.background_tasksInit()

      // Check user if they have profile pieces
      setTimeout(() => {
        dispatch('user/checkUserData')
      }, 2500)
    })

    const sendGPSChanges = () => {
      console.log('STICKY: sendGPS Changes START')
        $capacitor.updateLoggedInUsersGPS({
          lat: 55.555555,
          lng: -111.111111
        })
      console.log('STICKY: sendGPS Changes FINISH')
    }

    const sendGPSChangesRest = async () => {
      console.log('STICKY: sendGPS Changes REST START')
      await $services.restUpdateGPS({
        lat: 55.555555,
        lng: -111.111111
      })
      console.log('STICKY: sendGPS Changes REST FINISH')
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
      sendGPSChanges,
      sendGPSChangesRest,
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
