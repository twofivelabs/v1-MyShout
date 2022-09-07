<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
          :elevation="hover ? 4 : 0"
          :to="`/post/${post.id}`"
          :width="`${$vuetify.breakpoint.smAndDown ? '165' : '165' }`"
          class="ma-2 rounded-xl post-card recent-news-card"
          nuxt
      >
        <v-img
            v-if="post.featured_image_url"
            :aspect-ratio="16/9"
            :src="post.featured_image_url"
            cover
            lazy-src="/placeholder.png"
            max-height="150"
        />
        <v-card-title class="title">
          <ElementH5 :text="`${post.title}`" align="left"/>
        </v-card-title>
        <v-card-text v-if="post.content">
          {{ post.content.substr(0, 80) }}...
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>
<script>

import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    const { state } = useStore()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    return {
      user,
      profile
    }
  }
})
</script>
