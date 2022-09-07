<template>
  <div>
    <v-btn
        :loading="loading"
        @click.stop="openDialog"
        color="myshoutGreen rounded-lg white--text alertBtn"
        elevation="0"
        class="mb-6 py-7"
        block
        x-large
    >
      <v-img
          height="45"
          width="45"
          style="flex:initial; margin-right:10px;"
          contain
          src="/icons/Robbery.svg"
          v-anime="{
        translateY: [100, 0],
        duration: 400
      }"
      />
      Robbery Alert
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="450"
    >
      <v-card class="rounded-xl pa-8">
        <IconsRobbery class="mb-7" />
        <ElementH1 text="Alert sent" />
        <ElementP text="We have notified your emergency contacts of your robbery. Please call them as soon as you have the opportunity." />
        <div v-if="loading">
          <v-skeleton-loader
              type="actions"
          />
        </div>
        <div v-else class="pa-3">
          <v-card-actions class="justify-center">
            <v-btn
                :loading="loading"
                color="grey darken-1"
                text
                @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref, useContext,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AlertRobberybutton',
  setup () {
    const {
      state, dispatch
    } = useStore()
    const { $services, $system, $notify } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const dialog = ref(false)

    // METHODS
    const openDialog = async () => {
      dialog.value = true
      loading.value = true

      // Place alert info here
      await $services.alertButton('robbery', {
        user: profile.value,
        gps: profile.value.gps
      })

      // Add document to user
      try {
        const location = await $services.reverseGeocode(profile.value.gps.lat, profile.value.gps.lng)
        await dispatch('user/alerts/add', {
          type: 'robbery',
          userId: user.value.uid,
          gps: profile.value.gps,
          location: location
        })
      } catch (e) {
        $system.log({
          comp: 'AlertRobberybutton',
          msg: 'Trying to send alert',
          val: e
        })
        $notify.show({ text: 'Error, try again', color: 'error' })
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      user,
      profile,
      dialog,
      openDialog,
    }
  }
})
</script>
