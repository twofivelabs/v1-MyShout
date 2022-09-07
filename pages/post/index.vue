<template>
  <v-container class="mt-12">
    <v-row>
      <v-col
          v-for="(post, index) in posts"
          :key="index"
          cols="12"
          lg="3"
          md="4"
          sm="6"
          xl="2"
      >
        <v-card
            :color="'lighten-1 elevation-0'"
            :to="`/post/${post.id}`"
            class="mt-1 mb-1"
            cover
            nuxt
        >
          <v-img
              v-if="post.x_featured_media_medium"
              :aspect-ratio="16/9"
              :src="post.x_featured_media_medium"
              cover
              lazy-src="/placeholder.png"
          />
          <v-card-title class="title">
            <ElementH5 :text="`${post.title.rendered}`" align="left" class=""/>
          </v-card-title>
          <v-card-text>
            <span v-html="post.excerpt.rendered"></span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostArchive',
  middleware: 'authenticated',
  setup () {
    const { dispatch } = useStore()
    const {
      $config,
      $system
    } = useContext()

    // DEFINE CONTENT
    const loading = ref(false)
    const posts = ref([])

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        await dispatch('posts/getAll', {
          limit: 25
        }).then((res) => {
          if (res !== false) {
            posts.value = res
          }
        })
      } catch(e) {
        $system.log({
          comp: 'Posts',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    // PAGE META
    useMeta({
      title: `${$config.appTitle} News`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `${$config.appTitle} News`
      }]
    })

    return {
      posts
    }
  },
  head: {}
})
</script>
