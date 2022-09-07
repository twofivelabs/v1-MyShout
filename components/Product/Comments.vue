<template>
  <div>
    <div v-if="loading">
      <v-skeleton-loader
          type="list-item-avatar-two-line"
      />
      <v-skeleton-loader
          type="list-item-avatar-two-line"
      />
    </div>
    <div v-else-if="loadedComments && loadedComments.length > 0">
      <ElementH3 :class="`mb-6 ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`" align="left"
                 text="Feedback"
      />
      <v-row v-for="(comment, index) in loadedComments" :key="index">
        <v-col
            class="align-self-center text-center"
            cols="2"
            sm="1"
        >
          <div v-if="comment.like === true">
            <v-icon>
              mdi-thumb-up
            </v-icon>
          </div>
          <div v-else>
            <v-icon>
              mdi-thumb-down
            </v-icon>
          </div>
        </v-col>
        <v-col>
          <div>
            <UserName :u="comment.user"/>
            <span class="text-caption grey--text">{{ comment.created_at }}</span>
          </div>
          <div class="text-body-2 pt-1">
            {{ comment.comment }}
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>

// import lodash from 'lodash'

import {
  computed,
  defineComponent,
  ref,
  useFetch,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductComments',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const {
      state,
      dispatch
    } = useStore()
    const loading = ref(true)

    // DEFINE CONTENT
    const loadedComments = computed(() => state.feedback.loaded[props.product.slug])

    // GET CONTENT
    useFetch(async () => {
      if (props.product.slug) {
        await dispatch('feedback/getAll', {
          field: 'product.id',
          op: '==',
          value: props.product.slug
        })
      }
      loading.value = false
    })

    return {
      loading,
      loadedComments
    }
  }
})
</script>
