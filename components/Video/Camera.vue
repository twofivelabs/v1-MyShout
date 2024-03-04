<template>
  <div class="camera-wrapper">
    <v-app-bar color="transparent" class="justify-end camera-controls d-flex" flat top fixed>
      <v-btn @click="closeCamera" :disabled="cameraRecordingStatus" icon>
        <v-icon color="primary">mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
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
import { defineComponent, onMounted, onUnmounted, ref, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { CameraPreview } from '@capacitor-community/camera-preview'
import { Filesystem } from '@capacitor/filesystem'

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
  head() {
    return {
      bodyAttrs: {
        class: `${this.bodyClass}`,
      },
    };
  },
  setup (props, { emit }) {
    const {
      $capacitor, $db
    } = useContext()
    const router = useRouter()
    const route = useRoute()
    const cameraOptions = ref({
      parent: 'cameraContent',
      toBack: true,
      width: window.screen.width,
      height: window.screen.height,
      position: 'front' //front/rear
    })
    const bodyClass = ref('transparentBg')
    const cameraRecordingStatus = ref(false)
    const chatId = ref(route?.value?.query?.chatId)

    const isWeb = async () => {
      const device = await $capacitor.device()
      return device.platform === 'web'
    }

    const startCamera = async () => {
      console.log('[camera] Starting');
      console.log('route', chatId.value)
      try {
        await CameraPreview.start(cameraOptions.value);
      } catch (error) {
        console.error('[camera] start Error: ', error);
      }
    };

    const stopCamera = async () => {
      console.log('[camera] Stoping');
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
      console.log('[camera] Start Record')
      if (await isWeb()) {
        console.log('[camera] Record > N/A')
        // TESTING PURPOSE
        //console.log('chatid', chatId.value)
        //await router.push(`/chats/chat/${chatId.value}?videoUrl=${encodeURIComponent('/this/is/a/fake/url.mp4')}`)
        return
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
        return
      }
      cameraRecordingStatus.value = false;
      try {
        const result = await CameraPreview.stopRecordVideo();
        // console.log('[camera] Result: ', result, JSON.stringify(result));
        // await router.push(`/chats/chat/${chatId.value}?videoUrl=${encodeURIComponent(result.videoFilePath)}`)
        return result?.videoFilePath
      } catch (error) {
        console.error('[camera] stopRecordVideo Error: ', error);
        return false;
      }
    };

    const convertFileUrlToBase64 = async (fileUrl) => {
      console.log('[camera] Read and convert file: ', fileUrl)
      if (!fileUrl) return

      return await Filesystem.readFile({
        path: `file://${fileUrl}`,
        //encoding: 'utf8'
      }).then((r) => {
        return r.data
      }).catch((e) => {
        console.log('[camera] Read File Error: ', e, JSON.stringify(e))
      });
    };

    const uploadVideo = async (filePath) => {
      console.log('[camera] Start video upload')
      try {
        const fileConverted = await convertFileUrlToBase64(filePath)
        if (!fileConverted) return

        const url = await $db.upload({
          path: `/CHATS/${chatId.value}/${new Date().getTime()}.mp4`,
          data: fileConverted,
          base64: true,
          metaData: {
            contentType: 'video/mp4'
          }
        });
        console.log('[camera] videoUrl:', url);
        return url;
      } catch (error) {
        console.error('[camera] uploadVideo Error: ', error);
        return null;
      }
    };

    const toggleCameraRecord = async () => {
      if (!cameraRecordingStatus.value) {
        await startCameraRecord()
        return
      }
      const filePath = await stopCameraRecord()
      if (filePath) {
        //console.log('[camera] toggleCameraRecord filePath:', filePath, JSON.stringify(filePath))
        const videoUrl = await uploadVideo(filePath)
        //console.log('[camera] URL === ', videoUrl)
        //console.log('[cameraStepper] URL Encode === ', encodeURIComponent(videoUrl))
        if (videoUrl) {
          await router.push(`/chats/chat/${chatId.value}?videoUrl=${encodeURIComponent(videoUrl)}`)
        }
        // Add message
        emit('url', videoUrl);
      }
    };

    const closeCamera = async () => {
      return emit('close')
    }

    onMounted(async () => {
      await startCamera()
    })
    onUnmounted(async () => {
      await stopCamera()
    })

    return {
      startCamera, stopCamera, flipCamera,
      startCameraRecord, stopCameraRecord, toggleCameraRecord,
      closeCamera,
      cameraRecordingStatus,
      bodyClass
    }
  }
})
</script>

<style>
/*.v-application .mx-5 {
  margin-top:0 !important;
  margin-left:0 !important;
}
.camera-wrapper {
  margin-top:0;
  margin-left:0;
}*/
.transparentBg {
  background:transparent !important;
}
.transparentBg .theme--light.v-application, .transparentBg .theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color:transparent !important;
  background:transparent !important;
}
</style>
