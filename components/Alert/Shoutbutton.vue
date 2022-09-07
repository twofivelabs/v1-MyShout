<template>
  <div>
    <v-btn
        :loading="loading"
        @mousedown="startRecording"
        @mouseup="stopRecording"
        @touchstart="startRecording"
        @touchend="stopRecording"
        color="primary rounded-lg white--text alertBtn"
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
          src="/icons/Shout.svg"
          v-anime="{
        translateY: [100, 0],
        duration: 400
      }"
      />
      {{  buttonText }}
    </v-btn>
    <div class="text-center gray--text caption mt-n4">
      Hold To Send A 5 Second Audio Record
    </div>
    <v-dialog
        v-model="dialog"
        max-width="450"
    >
      <v-card class="rounded-xl pa-8">
        <IconsShout class="mb-7" />
        <ElementH1 text="Your Shout alert has been sent" />
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
  name: 'AlertShoutbutton',
  setup () {
    const {
      state, dispatch
    } = useStore()
    const {
      $services,
      $system,
      $notify,
      $db,
      $capacitor } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const dialog = ref(false)
    const buttonText = ref('Shout Alert')
    const audioUrl = ref(null)
    const timerCount = ref(5)
    const timerInterval = ref()

    // METHODS
    const openDialog = async () => {
      dialog.value = true
      loading.value = true

      // Place alert info here
      await $services.alertButton('shout', {
        user: profile.value,
        gps: profile.value.gps
      })

      // Add document to user
      try {
        const location = await $services.reverseGeocode(profile.value.gps.lat, profile.value.gps.lng)
        await dispatch('user/alerts/add', {
          type: 'shout',
          audioUrl: audioUrl.value,
          userId: user.value.uid,
          gps: profile.value.gps,
          location: location
        })
      } catch (e) {
        $system.log({
          comp: 'AlertShoutbutton',
          msg: 'Trying to send alert',
          val: e
        })
        $notify.show({ text: 'Error, try again', color: 'error' })
      } finally {
        loading.value = false
        buttonText.value = 'Shout Alert'
      }
    }
    const startRecording = async () => {
      console.log('STICKY: START RECORDING')
      buttonText.value = 'Recording... 5 sec.'

      await $capacitor.microphoneStart()

      // 5 second count down timer
      timerInterval.value = setInterval(function() {
        timerCount.value--;
        buttonText.value = `Recording... ${timerCount.value} sec.`
        if (timerCount.value === 0) {
          stopRecording()
        }
      }, 1000)
    }
    const stopRecording = async () => {
      console.log('STICKY: STOP RECORDING', timerInterval.value)
      clearInterval(timerInterval.value)
      timerCount.value = 5
      buttonText.value = 'Shout Alert'

      // Try and stop recorder
      try {
        const audio = await $capacitor.microphoneStop()
        // Upload audio file
        if (audio) {
          console.log('STICKY: ADD SHOUT TO', `/USERS/${user.value.uid}/shouts/${Date.now()}.wav`)
          audioUrl.value = await $db.upload({
            path: `/USERS/${user.value.uid}/shouts/${Date.now()}.wav`,
            data: audio.recordDataBase64,
            base64: true
          })
          //  Open dialog
          await openDialog()
        } else {
          $notify.show({ text: 'No audio', color: 'error' })
        }
      } catch (e) {
        // ...
      }
    }

    return {
      loading,
      user,
      profile,
      dialog,
      openDialog,
      startRecording,
      stopRecording,
      buttonText,
      timerCount
    }
  }
})
</script>
