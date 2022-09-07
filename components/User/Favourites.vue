<template>
  <div>
    <div v-if="loading">
      <v-row class="mt-4">
        <v-col
            v-for="index in 3"
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
    <div v-else>
      <div v-if="allFavourites && allFavourites.length > 0">
        <ElementH3 align="left" class="mb-8" text="Favourites"/>
        <v-row class="mt-4">
          <v-col
              v-for="(product, index) in allFavourites"
              :key="index"
              class="pa-1"
              cols="6"
              md="4"
              sm="4"
              xl="2"
          >
            <ProductCard :product="product"/>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <div style="text-align:center;">
          <ElementH4 align="center" text="No favourites, go try something new!"/>
          <v-btn class="mt-3 mb-3" elevation="0" to="/">
            Start Now
          </v-btn>
          <div>
            <object data="/svg/SnailBeer.svg" style="max-width:200px; height:250px;"
                    type="image/svg+xml"
            >
              <img src="/svg/SnailBeer.svg">
            </object>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useAsync,
  useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserFavourites',
  middleware: 'authenticated',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const { $system } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const allFavourites = computed(() => state.user.favourites.all)

    // GET CONTENT
    useAsync(async () => {
      try {
        loading.value = true
        await dispatch('user/favourites/getAll')
      } catch(e) {
        $system.log({
          comp: 'UserFavourites',
          msg: 'Not able to get',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      user,
      profile,
      allFavourites
    }
  },
  head: {}
})
</script>
