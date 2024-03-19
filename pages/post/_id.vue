<template>
  <v-container class="pt-4 pt-md-6">
    <div v-if="loading">
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-skeleton-loader type="image"/>
        </v-col>
        <v-col cols="12" md="8" sm="12">
          <v-skeleton-loader type="heading"/>
          <v-skeleton-loader type="list-item-three-line"/>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="post && post.title && post.title.rendered.length > 0">
      <v-row>
        <v-col cols="12">
          <div v-if="post.x_featured_media_large">
            <v-img :aspect-ratio="16/9" :src="post.x_featured_media_large"
                   class="mb-4 rounded-xl"
            />
          </div>
          <v-row>
            <v-col class="pl-8 pr-8">
              <ElementH1 :text="post.title.rendered" align="left"/>
              <ElementH5 :text="post.x_date" align="left" class="grey--text"/>
              <div v-if="post.content" class="mt-6 mb-6 body-1">
                <span v-html="post.content.rendered"></span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <Global404/>
    </div>
  </v-container>
</template>
<script>

import Vue from 'vue'
import lodash from 'lodash'
import VueDOMPurifyHTML from 'vue-dompurify-html'

import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  useStore
} from '@nuxtjs/composition-api'

Vue.use(VueDOMPurifyHTML)

export default defineComponent({
  name: 'PostId',
  middleware: 'authenticated',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      title,
      meta
    } = useMeta()
    const {
      error,
      $system
    } = useContext()
    const route = useRoute()
    const loading = ref(true)

    // DEFINE CONTENT
    const post = ref(state.posts.one)
    const company = ref({})

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        await dispatch('posts/getOne', route.value.params.id).then((res) => {
          if (res !== false) {
            post.value = res
          }
        })

        // PAGE META
        if (post.value) {
          title.value = `${post.value.title.rendered}`
          if (!lodash.isNull(post.value.excerpt.rendered)) {
            meta.value[0] = {
              hid: 'description',
              name: 'description',
              content: post.value.excerpt.rendered.replace(/^(.{155}[^\s]*).*/, '$1')
            }
          }
        }
      } catch(e) {
        $system.log({ comp: 'PostId', msg: 'useFetch', val: e })
        error({ statusCode: 404 })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      post,
      company
    }
  },
  head: {}
})
</script>
<style>
.mdDoc h1 {
  font-size: 1.3rem !important;
  letter-spacing: 0;
}

.mdDoc h2 {
  font-size: 1.1rem !important;
  letter-spacing: 0;
}

.mdDoc h3, .mdDoc h4, .mdDoc h5, .mdDoc h6 {
  font-size: 1rem !important;
  letter-spacing: 0;
}
</style>
