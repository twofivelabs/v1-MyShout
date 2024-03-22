<template>
  <span>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            @mousedown="startRecording"
            @mouseleave="stopRecording"
            @mouseup="stopRecording"
            @touchstart="startRecording"
            @touchend="stopRecording"
            @touchcancel="stopRecording"

            color="transparent"
            elevation="0"
            class="pa-0"
            small
            fab
        >
          <v-icon :class="{ 'isRecording': isRecording }">mdi-microphone</v-icon>
        </v-btn>
      </template>
      <span>{{ buttonText }}</span>
    </v-tooltip>
  </span>
</template>
<script>

import {
  defineComponent, useContext, ref, computed, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatRecordaudio',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { $capacitor, $db, $vuetify } = useContext()
    const user = computed(() => state.user)
    const { state } = useStore()

    // TODO: translate text
    const defaultButtonText = ref('Press to record')
    const buttonText = ref(defaultButtonText.value)
    const isRecording = ref(false)
    const audioUrl = ref(null)
    const timerCount = ref(120)
    const timerInterval = new Set()

    // METHODS
    const startRecording = async () => {
      if (isRecording.value) return
      isRecording.value = true

      try {
        buttonText.value = '120'

        // count down timer
        timerInterval.add(setInterval(() => {
          timerCount.value--;
          buttonText.value = `${timerCount.value}`
          if (timerCount.value <= 0) {
            stopRecording()
          }
        }, 1000))

        await $capacitor.microphoneStart()

      } catch (e) {
        console.log('Error starting ', e)
      }
    }
    const stopRecording = async () => {
      isRecording.value = false
      buttonText.value = defaultButtonText.value
      timerCount.value = 120

      // Clear timers
      for (const id of timerInterval) {
        timerInterval.delete(id)
        clearInterval(id)
      }

      // Try and stop recorder
      try {
        const audio = await $capacitor.microphoneStop()

        // Upload Audio File
        if (audio) {
          const filePath = `/CHATS/${props.chat.id}/${user.value.data.uid}-${Date.now()}.wav`
          audioUrl.value = await $db.upload(filePath, audio.recordDataBase64, {
            base64: true
          })

          // Send Message
          await $db.save(`Chats/${props.chat.id}/Messages`, {
            message: '',
            owner: user.value.data.uid,
            audioUrl: audioUrl.value
          })

          try {
            setTimeout(async () => {
              await $vuetify.goTo('#bottomOfChat')
            }, 500)
          } catch {
            // ...
          }
        }
      } catch (e) {
        // ...
        console.log('ERROR STOPPING', e)
      }
    }

    return {
      buttonText,
      isRecording,
      timerCount,
      startRecording,
      stopRecording
    }
  }
})
</script>
<style>
.isRecording {
  color: red !important;
}
</style>
