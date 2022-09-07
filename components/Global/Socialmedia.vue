<template>
  <div v-if="socialLinks && socialLinks.length > 0">
    <a
        v-for="item in socialLinks"
        :key="item.title"
        :href="item.to"
        class="mr-1"
    >
      <v-icon :aria-label="item.title" left role="img">
        {{ item.icon }}
      </v-icon>
    </a>
  </div>
</template>
<script>

import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalSocialMedia',
  setup () {
    const { $remoteConfig } = useContext()
    const socialLinks = ref([])

    onMounted(() => {
      try {
        socialLinks.value = $remoteConfig.get('social_links', true)
      } catch {
        socialLinks.value = $remoteConfig.get('social_links')
      }
    })

    return {
      socialLinks
    }
  }
})
</script>
