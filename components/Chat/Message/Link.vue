<template>
  <div class="message">
    <p>{{ url.text }}</p>
    <div v-if="metadata.title" class="link-preview">
      <img v-if="metadata.image" :src="metadata.image" alt="Preview" class="preview-image">
      <p class="title">{{ metadata.title }}</p>
      <p class="description">{{ metadata.description }}</p>
    </div>
  </div>
</template>

<script>
import { 
  defineComponent, 
  ref, 
  watch 
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ChatMessageLink',
  props: {
    url: {
      ttype: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const metadata = ref({});

    async function fetchMetadata(url) {
      try {        
        if (!url.href) return;
        
        console.log("KYLE:", url.href)
        //const response = await fetch(`https://your-backend.com/fetchUrlMetadata?url=${encodeURIComponent(url)}`);

      } catch (error) {
        console.error("Failed to fetch URL metadata:", error);
      }
    }

    watch(() => props.url, (n, o) => {
      if (n && n !== o) {
        fetchMetadata(n);
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
