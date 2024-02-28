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
          small fab
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
    const { dispatch, state } = useStore()

    const defaultButtonText = 'Press to record';
    const buttonText = ref(defaultButtonText);
    const isRecording = ref(false);
    const audioUrl = ref(null);
    const timerCount = ref(120);
    const recordingSessionId = ref(0);

    const startRecording = async () => {
      if (!isRecording.value) {
        isRecording.value = true;
        buttonText.value = `${timerCount.value}`;
        recordingSessionId.value++;
        const currentSessionId = recordingSessionId.value;
        await recordAudio(currentSessionId);
      }
    };
    
    const recordAudio = async (sessionId) => {
      if (sessionId !== recordingSessionId.value) {
        // Ensures that only the latest recording session is active
        return;
      }

      try {
        await $capacitor.microphoneStart();
        timerCount.value = 120; // Reset timer for each chunk
        const intervalId = setInterval(() => {
          if (sessionId !== recordingSessionId.value) {
            clearInterval(intervalId); // Stop timer if session ID has changed
            return;
          }
          timerCount.value--;
          buttonText.value = `${timerCount.value}`;
          if (timerCount.value <= 0) {
            clearInterval(intervalId);
            stopRecording(true, sessionId); // Pass true to indicate auto-restart
          }
        }, 1000);
      } catch (error) {
        console.error('Error starting recording:', error);
        isRecording.value = false; // Ensure recording state is accurately reflected
      }
    };

    const stopRecording = async (autoRestart = false, sessionId) => {
      if (sessionId && sessionId !== recordingSessionId.value) {
        // If the session ID doesn't match the latest, don't proceed
        return;
      }

      try {
        const audio = await $capacitor.microphoneStop();
        if (audio && autoRestart) {
          // Auto-restart recording for the next chunk
          await sendAudio(audio);
          await recordAudio(recordingSessionId.value); // Start a new recording session
        } else if (audio) {
          // Finalize recording without restarting
          await sendAudio(audio);
          isRecording.value = false;
          buttonText.value = defaultButtonText;
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
        isRecording.value = false;
      }
    };

    const sendAudio = async (audio) => {
      const audioPath = `/CHATS/${props.chat.id}/${user.value.data.uid}-${Date.now()}.wav`;
      audioUrl.value = await $db.upload({
        path: audioPath,
        data: audio.recordDataBase64,
        base64: true
      });
      await dispatch('chats/messages/add', {
        chatId: props.chat.id,
        message: {
          message: '',
          owner: user.value.data.uid,
          audioUrl: audioUrl.value
        }
      });
      try {
        await $vuetify.goTo('#bottomOfChat');
      } catch (e) {
        console.log("Error sending audio", e)
      }
    };

    return {
      buttonText, isRecording,
      startRecording, stopRecording
    }
  }
})
</script>
<style>
.isRecording {
  color: red !important;
}
</style>
