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
      {{ $t('robbery_alert') }}
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="450"
    >
      <v-card class="rounded-xl pa-8">
        <IconsRobbery class="mb-7" />
        <ElementH1 :text="$t('alert_sent')" />
        <ElementP :text="$t('notified_emergency_contacts_robbery')" />
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
              {{ $t('btn.close') }}
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
      state, dispatch, commit
    } = useStore()
    const { $capacitor, $helper, $system, $notify, i18n } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)
    const location = ref({city: 'N/A'})

    // DEFINE CONTENT
    const dialog = ref(false)

    // METHODS
    const openDialog = async () => {
      dialog.value = true
      loading.value = true

      // UPDATE CURRENT LOCATION
      await $capacitor.gpsGetCurrentPosition().catch((e) => {
        $system.log({ comp: 'AlertButton', msg: 'gpsGetCurrentPosition', val: e })
      })

      await $helper.sleep(500)

      // SENDS NOTIFICATIONS
      /*await $services.alertButton('robbery', {
        user: profile.value,
        gps: profile.value.gps
      }).catch((e) => {
        $system.log({ comp: 'AlertButton', msg: 'alertButton', val: e })
      })*/

      // GET LOCATION DETAILS OF USER
      /*location.value = await $services.reverseGeocode(profile.value.gps.lat, profile.value.gps.lng).catch((e) => {
        $system.log({ comp: 'AlertButton', msg: 'reverseGeocode', val: e })
      })*/

      // ADD NOTIFICATION TO USER
      await dispatch('user/alerts/add', {
        type: 'robbery',
        userId: user.value.uid,
        gps: profile.value.gps,
        location: location.value
      }).catch((e) => {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        $system.log({ comp: 'AlertButton', msg: 'Trying to send alert', val: e })
      })

      commit('user/alerts/HAS_NEW_ALERTS', true)
      loading.value = false
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
