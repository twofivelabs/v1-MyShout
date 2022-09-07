<template>
  <div>
    <div v-if="posts && posts.length > 0">
      <v-slide-group
          v-model="model"
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          center-active
          class="pa-0"
      >
        <v-slide-item
            v-for="(post, key) in posts"
            :key="key"
        >
          <PostCard :post="post"/>
        </v-slide-item>
      </v-slide-group>
    </div>
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
