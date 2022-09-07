<template>
  <v-sheet class="mx-0 pa-0 mx-auto" elevation="0">
    <v-slide-group
        :show-arrows="$vuetify.breakpoint.mdAndUp"
        active-class="success"
        center-active
        class="pa-0 "
    >
      <v-slide-item
          v-for="(company, index) in companies"
          :key="index"
      >
        <v-card
            :color="'lighten-1 elevation-0'"
            :to="`/companies/${company.id}`"
            class="mt-4 mb-4"
            contain
            nuxt
        >
          <div v-if="company.logo_url" class="d-flex flex-no-wrap align-center">
            <v-avatar class="ma-3" size="125" tile>
              <v-img
                  :src="featuredImage(company)"
                  contain
                  lazy-src="/placeholder.png"
              />
            </v-avatar>
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyLogoSlider',
  props: {
    companies: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const featuredImage = (company) => {
      if (company.logo_url) {
        return company.logo_url
      }
      if (company.featured_image_url) {
        return company.featured_image_url
      }
      return '/placeholder.png'
    }

    return {
      featuredImage
    }
  }
})
</script>
