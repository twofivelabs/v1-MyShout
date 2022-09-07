<template>
  <div v-if="banners && banners.length > 0" class="banners">
    <v-carousel
        :continuous="true"
        :cycle="true"
        :height="bannerHeight"
        :show-arrows="(banners.length > 1)"
        :show-arrows-on-hover="(banners.length > 1)"
        hide-delimiter-background
        hide-delimiters
        interval="8000"
    >
      <v-carousel-item v-for="(banner, index) in banners" :key="index" class="">
        <v-card
            :to="`${banner.to ? banner.to : '/'}`"
            elevation="0"
            nuxt
            rounded="0"
            width="100%"
        >
          <v-img
              :height="bannerHeight"
              :src="`${$vuetify.breakpoint.xs ? banner.image_url_mobile : banner.image_url }`"
              width="100vw"
          />
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BannerGeneralComp',
  setup () {
    const {
      $remoteConfig,
      $vuetify
    } = useContext()

    // DEFINE CONTENT
    const banners = ref([])
    const bannerHeight = computed(() => {
      if ($vuetify.breakpoint.lgAndUp) {
        return '300px'
      }
      if ($vuetify.breakpoint.mdAndUp) {
        return '270px'
      }
      if ($vuetify.breakpoint.smAndUp) {
        return '190px'
      }
      return '135px'
    })

    // MOUNT
    onMounted(() => {
      try {
        banners.value = $remoteConfig.get('banners', true)
      } catch (e) {
        // ...
      }
    })

    return {
      banners,
      bannerHeight
    }
  }
})
</script>
