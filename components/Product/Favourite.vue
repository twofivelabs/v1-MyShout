<template>
  <div style="display:inline-block;">
    <span v-if="!isFavourite(product.slug)">
      <v-btn
          :loading="loading"
          class="black--text elevation-0 pa-0"
          color="white"
          fab
          right
          top
          x-small
          @click="addToFavourites"
      >
        <v-icon>mdi-bookmark-outline</v-icon>
      </v-btn>
    </span>
    <span v-else>
      <v-btn
          :loading="loading"
          class="black--text elevation-0"
          color="white"
          fab
          right
          top
          x-small
          @click="removeFromFavourites(product.slug)"
      >
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </span>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductFavouriteBtn',
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
      getters,
      state,
      dispatch
    } = useStore()
    const {
      $notify,
      $system
    } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const favourites = computed(() => state.user.favourites.all)

    // METHODS
    const addToFavourites = async () => {
      try {
        loading.value = true
        if (isLoggedIn.value) {
          await dispatch('user/favourites/add', { ...props.product })
        } else {
          $notify.show({
            text: 'Must be logged in to favourite',
            color: 'error'
          })
        }
      } catch(e) {
        $system.log({
          comp: 'ProductFavouriteBtn',
          msg: 'addToFavourites',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const removeFromFavourites = async (slug) => {
      try {
        loading.value = true
        if (isLoggedIn.value) {
          await dispatch('user/favourites/remove', slug)
        } else {
          $notify.show({
            text: 'Must be logged in to favourite',
            color: 'error'
          })
        }
      } catch(e) {
        $system.log({
          comp: 'ProductFavouriteBtn',
          msg: 'removeFromFavourites',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const isFavourite = (slug) => {
      const res = favourites.value.filter(fav => (fav.slug === slug))
      return res && res.length > 0
    }

    return {
      isLoggedIn,
      user,
      profile,
      loading,
      favourites,
      addToFavourites,
      removeFromFavourites,
      isFavourite
    }
  }
})
</script>
