<template>
  <div class="camera-wrapper">
    <div id="cameraContent" class="content-camera-preview"></div>
    <v-app-bar color="transparent" class="align-center justify-center text-center camera-controls d-flex" flat bottom fixed style="top:calc(100% - 145px)">
      <v-btn @click="flipCamera" icon x-large class="ma-2">
        <v-icon x-large color="primary">
          mdi-camera-flip
        </v-icon>
      </v-btn>
      <v-btn @click="toggleCameraRecord" icon x-large class="ma-2">
        <v-icon v-if="!cameraRecordingStatus" x-large color="primary">
          mdi-record-circle-outline
        </v-icon>
        <v-icon v-else x-large color="red">
          mdi-stop-circle
        </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api'
import { CameraPreview } from '@capacitor-community/camera-preview'

export default defineComponent({
  name: 'VideoCamera',
  props: {
    chat: {
      type: Object,
      default: () => { return {} }
    }
  },
  emits: [
    'url'
  ],
  setup (props, { emit }) {
    const {
      $capacitor, $db
    } = useContext()

    const cameraOptions = ref({
      parent: 'cameraContent',
      toBack: true,
      width: window.screen.width,
      height: window.screen.height,
      position: 'front' //front/rear
    })
    const cameraRecordingStatus = ref(false)

    const isWeb = async () => {
      const device = await $capacitor.device()
      return device.platform === 'web'
    }

    const startCamera = async () => {
      console.log('[camera] Start');
      try {
        await CameraPreview.start(cameraOptions.value);
      } catch (error) {
        console.error('[camera] start Error: ', error);
      }
    };

    const stopCamera = async () => {
      console.log('[camera] Stop');
      try {
        await CameraPreview.stop();
      } catch (error) {
        console.error('[camera] stop Error: ', error);
      }
    };

    const flipCamera = async () => {
      console.log('[camera] Flip');
      if (await isWeb()) {
        console.log('[camera] Flip > N/A');
        return;
      }
      try {
        await CameraPreview.flip();
      } catch (error) {
        console.error('[camera] flip Error: ', error);
      }
    };

    const startCameraRecord = async () => {
      console.log('[camera] Start Record');
      if (await isWeb()) {
        console.log('[camera] Record > N/A');
        return;
      }
      cameraRecordingStatus.value = true;
      try {
        await CameraPreview.startRecordVideo(cameraOptions.value);
      } catch (error) {
        console.error('[camera] startRecordVideo Error: ', error);
      }
    };

    const stopCameraRecord = async () => {
      console.log('[camera] Stop Record');
      if (await isWeb()) {
        console.log('[camera] Record > N/A');
        return;
      }
      cameraRecordingStatus.value = false;
      try {
        const result = await CameraPreview.stopRecordVideo();
        console.log('[camera] Result: ', result, JSON.stringify(result));
        return result?.videoFilePath || false;
      } catch (error) {
        console.error('[camera] stopRecordVideo Error: ', error);
        return false;
      }
    };

    const uploadVideo = async (filePath) => {
      try {
        const url = await $db.upload({
          path: `/CHATS/${props.chat.id}/${new Date().getTime()}.mp4`,
          data: filePath,
          base64: false,
        });
        console.log('[camera] videoUrl:', url, JSON.stringify(url));
        return url;
      } catch (error) {
        console.error('[camera] uploadVideo Error: ', error);
        return null;
      }
    };

    const toggleCameraRecord = async () => {
      if (!cameraRecordingStatus.value) {
        await startCameraRecord();
        return;
      }
      const filePath = await stopCameraRecord();
      if (filePath) {
        const videoUrl = await uploadVideo(filePath);
        // Add message
        emit('url', videoUrl);
      }
    };


    onMounted(async () => {
      await startCamera()
    })
    onUnmounted(async () => {
      await stopCamera()
    })

    return {
      startCamera, stopCamera, flipCamera,
      startCameraRecord, stopCameraRecord, toggleCameraRecord,
      cameraRecordingStatus
    }
  }
})
</script>

<style scoped>
/*.v-application .mx-5 {
  margin-top:0 !important;
  margin-left:0 !important;
}
.camera-wrapper {
  margin-top:0;
  margin-left:0;
}*/
.camera-controls .v-toolbar__content {

}
.theme--light.v-application, .theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color:transparent !important;
  background:transparent !important;
}
</style>
