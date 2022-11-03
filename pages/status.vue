<template>
  <v-container class="pa-8 mt-12">
    <div v-if="user.role.isActive === true">
      <ElementH1 :text="$t('yes_status')" align="left" />
    </div>
    <div v-else>
      <ElementH2 :text="$t('permission.no_status')" align="left" />
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  ref, computed, useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'StatusPage',
  setup () {
    const { $config } = useContext()
    const {
      state,
    } = useStore()
    const loading = ref(false)

    // DEFINE CONTENT
    const profile = computed(() => state.user.profile)
    const user = computed(() => state.user.data)

    // METHODS

    // PAGE META
    useMeta({
      title: `Status to ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Status`
      }]
    })

    return {
      loading,
      profile,
      user
    }
  },
  // REQUIRED FOR NUXT 2
  head: {}
})
</script>
