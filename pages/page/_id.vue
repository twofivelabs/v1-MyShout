<template>
  <div>
    <v-app-bar color="white" class="mobileNotch" app fixed top>
      <v-app-bar-nav-icon>
        <NuxtLink to="/settings">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">
            mdi-arrow-left
          </v-icon>
        </NuxtLink>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$lang.get(page, 'title')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container :class="`mobileNotch ${page.slug}`">
      <div v-if="loading">
        <v-row>
          <v-col cols="12">
            <v-skeleton-loader type="list-item-three-line"/>
            <v-skeleton-loader type="list-item-three-line"/>
            <v-skeleton-loader type="list-item-three-line"/>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <div v-if="page">
          <v-row>
            <v-col cols="12">
              <div v-if="page.featured_image_url">
                <v-img :aspect-ratio="16/9" :src="page.featured_image_url" class="mb-4"/>
              </div>
              <div v-if="page.content" class="ma-5 mb-15">
                <div v-if="page.isMarkdown" v-dompurify-html="$lang.get(page, 'content')" class="mdDoc"/>
                <div v-else v-dompurify-html="$lang.get(page, 'content')" class="mdDoc"/>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <Global404/>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>

import {
  defineComponent,
  ssrRef,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageId',
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
      $config,
      $system,
      error
    } = useContext()
    const route = useRoute()
    const loading = ssrRef(true)

    // DEFINE CONTENT
    const page = ssrRef(state.pages.one)

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        await dispatch('pages/getOne', route.value.params.id).then((res) => {
          if (res !== false) {
            page.value = res
          }
        })

        // PAGE META
        if (page.value) {
          title.value = `${page.value.title} by ${$config.appTitle}`
          if (page.value.content) {
            meta.value[0] = {
              hid: 'description',
              name: 'description',
              content: page.value.content.replace(/^(.{155}[^\s]*).*/, '$1')
            }
          }
        }
      } catch(e) {
        $system.log({
          comp: 'PageId',
          msg: 'getOne',
          val: e
        })
        error({ statusCode: 404 })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      page
    }
  },
  head: {}
})
</script>
