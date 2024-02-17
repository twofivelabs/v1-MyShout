<template>
  <div class="message">
    <p>{{ link.text }}</p>
    <div v-if="metadata.title" class="link-preview">
      <img v-if="metadata.image" :src="metadata.image" alt="Preview" class="preview-image">
      <p class="title">{{ metadata.title }}</p>
      <p class="description">{{ metadata.description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ChatMessageLink',
  props: {
    link: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const metadata = ref({});

    async function fetchMetadata(url) {
      try {
        // Assuming 'fetchUrlMetadata' is your API endpoint that handles CORS and returns metadata
        const response = await fetch(`https://your-backend.com/fetchUrlMetadata?url=${encodeURIComponent(url)}`);
        if (response.ok) {
          const data = await response.json();
          metadata.value = {
            title: data.title,
            description: data.description,
            image: data.image, // Assuming 'image' is part of the returned metadata
          };
        }
      } catch (error) {
        console.error("Failed to fetch URL metadata:", error);
      }
    }

    watch(() => props.link, (newLink, oldLink) => {
      if (newLink && newLink !== oldLink) {
        fetchMetadata(newLink);
      }
    }, { immediate: true });
    
    return { 
      metadata,
    }
  }
});
</script>

<style scoped>
.link-preview {
  margin-top: 1rem;
}

.preview-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}

.title, .description {
  margin: 0;
}
</style>
