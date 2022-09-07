<template>
  <div>
    <div v-if="loading">
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
    <div v-else-if="posts && posts.length > 0">
      <v-slide-group
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          center-active
          class="pa-0 "
      >
        <v-slide-item v-for="(post, index) in posts" :key="index">
          <v-hover v-slot="{ hover }">
            <v-card
                :elevation="hover ? 4 : 0"
                :to="`/post/${post.id}`"
                :width="`${$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? '200' : '250' }`"
                class="ma-2 rounded-xl post-card recent-news-card"
                nuxt
            >
              <v-card-title class="title">
                <ElementH5 :text="`${post.title}`" align="left" class=""/>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </div>
    <div v-else>
      <p class="pl-4">
        No news found
      </p>
    </div>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostRecent',
  props: {
    companyId: {
      type: String,
      default: () => {
        return null
      }
    },
    limit: {
      type: Number,
      default: () => {
        return 5
      }
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    const {
      $system,
      $vuetify
    } = useContext()
    const loading = ref(false)

    // DEFINE CONTENT
    const howManyPlaceholders = computed(() => $vuetify.breakpoint.smAndDown ? 2 : 3)
    const posts = ref([])

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        if (props.companyId) {
          await dispatch('posts/getAll', {
            where: {
              field: 'company.id',
              op: '==',
              value: props.companyId
            },
            limit: props.limit
          }).then((res) => {
            if (res !== false) {
              posts.value = lodash.cloneDeep(res)
            }
          })
        } else {
          await dispatch('posts/getAll', {
            where: {
              field: 'published',
              op: '==',
              value: true
            },
            limit: props.limit
          }).then((res) => {
            if (res !== false) {
              posts.value = lodash.cloneDeep(res)
            }
          })
        }
      } catch(e) {
        $system.log({
          comp: 'PostRecent',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      howManyPlaceholders,
      posts
    }
  }
})
</script>
