<template>
  <v-card v-if="!noPreview">
    <v-card-text>
      <v-container v-if="!generatingPreview" fluid>  
        <v-row no-gutters>  
          <v-col cols="3"> 
            <a :href="url.href" target="_blank">
              <v-img
                v-if="metadata.image" 
                :src="metadata.image"
                max-height="100"
                contain
              ></v-img>
            </a>
          </v-col>
          <v-col cols="9"> 
            <a class="text-h6 font-weight-bold py-0" style="line-height:0.3em;" :href="url.href" target="_blank">{{ metadata.title }}</a>
            <p class="py-0">{{ metadata.description }}</p>
          </v-col>
        </v-row>
      </v-container>

      <v-progress-circular
        v-else
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-card-text>
  </v-card>
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
    const generatingPreview = ref(true)
    const noPreview = ref(false)
    const metadata = ref({});

    async function fetchMetadata(url) {
      try {        
        if (!url.href) return;
        console.log("KYLE: Getting URL Preview")
    
        const response = await fetch(`https://us-central1-my-shout-staging.cloudfunctions.net/Chat-fetchUrlMetadata?url=${encodeURIComponent(url.href)}`);
        console.log(`KYLE: URL is ${response.okay}`)
        
        if (!response.ok) {
          noPreview.value = true
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();

        metadata.value = {
          image: results.image,
          title: results.title,
          description: truncateString(results.description)
        }
      } catch (error) {
        noPreview.value = true
        console.error("Failed to fetch URL metadata:", error);
      } finally {
        generatingPreview.value = false
      }
    }

    const truncateString = (string, length = 80) => {
      return string ? (string.length > length ? string.substring(0, length) + '...' : string) : '';
    }

    watch(() => props.url, (n, o) => {
      if (n && n !== o) {
        fetchMetadata(n);
      }
    }, { immediate: true });
    
    return { 
      noPreview,
      generatingPreview,
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
