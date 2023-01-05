<template>
  <div>
    <v-btn
        :loading="loading"
        @click.stop="openDialog"
        color="myshoutRed rounded-lg white--text alertBtn"
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
          src="/icons/Kidnapping.svg"
          v-anime="{
        translateY: [100, 0],
        duration: 400
      }"
      />
      {{ $t('kidnapping_alert') }}
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="450"
    >
      <v-card class="rounded-xl pa-8">
        <IconsKidnapping class="mb-7" />
        <ElementH1 :text="$t('alert_sent')" />
        <ElementP :text="$t('notified_emergency_contacts_kidnapping')" />
        <div v-if="loading">
          <v-skeleton-loader
              type="actions"
          />
        </div>
        <div v-else class="pt-4 pa-2">
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
  name: 'AlertKidnappingbutton',
  setup () {
    const {
      state, dispatch
    } = useStore()
    const { $services, $capacitor, $helper, $system, $notify, i18n } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const dialog = ref(false)

    // METHODS
    const openDialog = async () => {
      dialog.value = true
      loading.value = true

      await $capacitor.gpsGetCurrentPosition()
      await $helper.sleep(500)

      // Place alert info here
      await $services.alertButton('kidnapping', {
        user: profile.value,
        gps: profile.value.gps
      })

      // Add document to user
      try {
        const location = await $services.reverseGeocode(profile.value.gps.lat, profile.value.gps.lng)
        await dispatch('user/alerts/add', {
          type: 'kidnapping',
          userId: user.value.uid,
          gps: profile.value.gps,
          location: location
        })
      } catch (e) {
        $system.log({
          comp: 'AlertKidnappingbutton',
          msg: 'Trying to send alert',
          val: e
        })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
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
