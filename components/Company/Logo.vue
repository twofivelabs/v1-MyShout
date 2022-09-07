<template>
  <v-img
      v-if="logoUrl"
      :alt="company.name"
      :src="logoUrl"
      lazy-src="/placeholder.png"
  />
</template>
<script>

import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyLogo',
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const logoUrl = ref(null)

    if (props.company) {
      logoUrl.value = props.company.logo_url
    }

    return {
      logoUrl
    }
  }
})
</script>
