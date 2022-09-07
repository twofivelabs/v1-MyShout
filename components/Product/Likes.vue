<template>
  <div>
    <v-btn :loading="loading" outlined small text @click.stop="openDialog('like')">
      <v-icon dark left>
        mdi-thumb-up
      </v-icon>
      {{ likes }}
    </v-btn>
    <v-btn :loading="loading" outlined small text @click.stop="openDialog('dislike')">
      <v-icon dark left>
        mdi-thumb-down
      </v-icon>
      {{ dislikes }}
    </v-btn>
    <v-dialog
        v-model="feedbackDialog"
        max-width="450"
    >
      <v-card>
        <v-card-title
            :class="`headline ${$vuetify.theme.dark ? 'white--text' : 'black--text'}`"
        >
          Feedback
        </v-card-title>
        <div v-if="loading">
          <v-skeleton-loader
              type="list-item-two-line"
          />
        </div>
        <div v-else class="pa-3">
          <div v-if="isLoggedIn">
            <v-card-text v-if="alreadyGaveFeedback">
              Awesome! You already gave feedback.
            </v-card-text>
            <v-card-text v-else>
              You
              <span v-if="form.like"><v-icon class="pl-2 pr-2"
              >mdi-thumb-up</v-icon></span>
              <span v-else><v-icon class="pl-2 pr-2">mdi-thumb-down</v-icon></span>
              {{ product.name }}
              <v-text-field
                  v-model="form.comment"
                  label="Comments or feedback"
                  type="text"
              />
            </v-card-text>
          </div>
          <div v-else>
            <v-card-text>
              You must be logged in to provide feedback
            </v-card-text>
          </div>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                :loading="loading"
                color="grey darken-1"
                text
                @click="feedbackDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
                v-if="isLoggedIn && !alreadyGaveFeedback"
                :loading="loading"
                class="text-center"
                color="success"
                elevation="0"
                @click="save"
            >
              Save
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductLikes',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    likes: {
      type: Number,
      default: () => {
        return 0
      }
    },
    dislikes: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  setup (props) {
    const {
      getters,
      state,
      dispatch
    } = useStore()
    const {
      $system,
      $notify
    } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    // const product = computed(() => lodash.cloneDeep(state.products.one))
    const form = ref(lodash.cloneDeep(state.feedback.one))
    const feedbackDialog = ref(false)
    const alreadyGaveFeedback = ref(false)

    // SET INIT DATA
    onMounted(() => {
      form.value.company.id = props.product.company.id
      form.value.product.id = props.product.id || props.product.slug
      form.value.user.id = user.value.uid
      form.value.ip = profile.value.ip || null
    })

    // METHODS
    const openDialog = async (direction) => {
      feedbackDialog.value = true
      form.value.like = false
      // Did user already LIKE / DISLIKE?
      await checkUserFeedback()
      if (direction === 'like') {
        form.value.like = true
      }
      if (alreadyGaveFeedback.value === false) {
        tagUser()
      }
    }
    const save = async () => {
      try {
        loading.value = true
        const resp = await dispatch('feedback/add', { ...form.value })
        if (resp) {
          feedbackDialog.value = false
        } else {
          $system.log({
            comp: 'Likes',
            msg: 'Save',
            val: resp
          })
          $notify.show({
            text: 'Sorry, your feedback did not apply',
            color: 'orange'
          })
        }
      } catch(e) {
        $system.log({
          comp: 'Likes',
          msg: 'Save',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const checkUserFeedback = async () => {
      try {
        loading.value = true
        const userFeedback = await dispatch('feedback/getAll', {
          field: 'product.id',
          op: '==',
          value: props.product.id || props.product.slug
        })
        alreadyGaveFeedback.value = userFeedback.some((feedback) => {
          return feedback.user.id === user.value.uid
        })
      } catch(e) {
        $system.log({
          comp: 'Likes',
          msg: 'checkUserFeedback',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const tagUser = () => {
      try {
        loading.value = true
        let tags = [
          form.value.company.id,
          form.value.product.id || props.product.slug
        ]
        if (props.product.tags) {
          tags = tags.concat(props.product.tags)
        }
        tags = tags.filter(a => a)

        if (!lodash.isEmpty(tags)) {
          tags.forEach((tag) => {
            dispatch('user/tagging/add', {
              tag,
              like: form.value.like
            })
          })
        }
      } catch(e) {
        $system.log({
          comp: 'Likes',
          msg: 'tagUser',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      isLoggedIn,
      user,
      profile,
      form,
      feedbackDialog,
      alreadyGaveFeedback,
      openDialog,
      save
    }
  }
})
</script>
