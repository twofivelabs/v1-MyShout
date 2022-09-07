<template>
  <div>
    <v-list
        v-if="posts && posts.length > 0"
        rounded
    >
      <v-list-item
          v-for="(post, key) in posts"
          :key="key"
          :to="`/post/${post.id}`"
          class="rounded-xl"
          nuxt
      >
        <v-list-item-avatar size="80">
          <v-img
              :aspect-ratio="16/9"
              :src="`${post.featured_image_url || '/placeholder.png'}`"
              cover
              lazy-src="/placeholder.png"
              max-height="150"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ post.title }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="post.content" style="line-height:1.6em;">
            {{ post.content.substr(0, 200) }}...
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else>
      <v-row class="mt-4">
        <v-col
            v-for="index in howManyPlaceholders"
            :key="index"
            cols="6"
            sm="4"
        >
          <v-skeleton-loader
              max-width="200"
              type="card"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>

import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostSlider',
  props: {
    posts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const { $vuetify } = useContext()
    const model = ref(null)
    const howManyPlaceholders = computed(() => $vuetify.breakpoint.smAndDown ? 2 : 3)

    return {
      howManyPlaceholders,
      model
    }
  }
})
</script>
<style scoped>
.theme--light.v-list {
  background: transparent;
}
</style>