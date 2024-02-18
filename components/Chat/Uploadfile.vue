<template>
  <v-btn
      :loading="isUploading"
      @click="beginUpload"
      color="transparent"
      elevation="0"
      class="pa-0"
      small
      fab
  >
    <input type="file" accept="*" ref="fileInput" style="display: none;" @change="handleUpload" /> 
    <v-badge
        :content="1"
        :value="uploadComplete"
        color="green"
        overlap
    >
      <v-icon>
        mdi-file
      </v-icon>
    </v-badge>
  </v-btn>
</template>
<script>

import {
  defineComponent, useContext, ref, watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatUploadfile',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentUrl: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  emits: [
    'url'
  ],
  setup (props, { emit }) {
    const { $db } = useContext()

    const isUploading = ref(false)
    const uploadComplete = ref(false)
    const uploadUrl = ref(null)
    const fileInput = ref(null);

    const beginUpload = () => {
      fileInput.value.click()
    }

    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
      });
    };

    // Helper Function: fileExtension
    const fileExtension = (mimeType) => {
      const typeParts = mimeType.split('/');
      return typeParts[1]; 
    };

    const handleUpload = async (event) => {
      isUploading.value = true; // Show loading state
      try {
        const file = event.target.files[0]; 

        if (!file) return; // No file selected

        // Optional - basic file type checks 
        if (!file.type.startsWith('image/') && !['application/pdf'].includes(file.type)) {
            // Show an error message for unsupported file types 
            return;
        }

        const fileData = await readFileAsDataURL(file); // See Helper Function below

        const path = `/CHATS/${props.chat.id}/${ new Date().getTime() }.${fileExtension(file.type)}`;

        const uploadResult = await $db.upload({ 
          path, 
          data: fileData, 
          base64: true 
        });

        if (uploadResult) {
          uploadComplete.value = true
          uploadUrl.value = uploadResult
          emit('url', uploadUrl.value)
        }
      } catch (error) {
        // ... handle upload error
      } finally {
        isUploading.value = false; 
        fileInput.value.value = null; // Reset file input
      }
    };

    watchEffect(() => {
      uploadComplete.value = !!props.currentUrl;
    })


    return {
      beginUpload, handleUpload,
      fileInput,
      isUploading,
      uploadComplete,
      uploadUrl
    }
  }
})
</script>
