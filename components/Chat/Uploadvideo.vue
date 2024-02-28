<template>
  <div>
    <v-btn
        :loading="isRecording"
        :disabled="currentUrl ? true : false"
        color="transparent"
        elevation="0"
        class="pa-0 ma-0"
        small
        fab
    >
      <v-icon>
        mdi-video-vintage
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ChatUploadvideo',
  props: {
    chat: {
      type: Object,
      default: () => ({}),
    },
    currentUrl: {
      type: String,
      default: null,
    },
  },
  setup() {
    const isRecording = ref(false);

    return {
      isRecording,
    };
  },
});
</script>
