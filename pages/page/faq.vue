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
          <ElementH2 align="left" :text="$t('page.faq')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container class="mt-3 mb-12 mobileNotch px-3">
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(post,i) in posts" :key="i">
          <v-expansion-panel-header>{{ $lang.get(post, 'title') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="post.featured_image_url">
              <v-img :aspect-ratio="16/9" :src="post.featured_image_url" class="mb-4"/>
            </div>
            <div v-if="post.content">
              <div v-if="post.isMarkdown" v-dompurify-html="$md.render($lang.get(post, 'content'))" class="mdDoc"/>
              <div v-else v-dompurify-html="$lang.get(post, 'content')" class="mdDoc"/>
            </div>
            <v-btn v-if="post.learn_more" :to="post.learn_more" class="elevation-0" primary>
              {{ post.learn_more_label ? post.learn_more_label : $t('btn.learn_more') }}
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  useStore,
  ref,
  computed,
  useFetch,
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'PageFaq',
  middleware: 'authenticated',
  setup () {
    const { state, dispatch, getters } = useStore()
    const { $config, $system,  } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => lodash.cloneDeep(state.user.profile))
    const loading = ref(false)

    // DEFINE
    const posts = ref([])

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        await dispatch('posts/getAll', {
          where: [{
            field: 'published',
            op: '==',
            value: true
          },{
            field: 'tags',
            op: 'array-contains',
            value: 'faq'
          }]
        }).then((response) => {
          posts.value = response
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

    // METHODS

    // PAGE META
    useMeta({
      title: `Account Settings ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Find out more information by contacting us online.'
      }]
    })

    return {
      loading,
      isLoggedIn,
      user,
      profile,
      posts
    }
  },
  head: {}
})
</script>
