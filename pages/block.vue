<template>
  <v-container class="pa-8 mt-12">
    <v-img alt="MyShout Logo" src="/logo/MyShout-Logo.svg"
           class="mx-auto"
           contain
           max-width="200"
           v-anime="{
                        translateY: [100, 0],
                        duration: 1200
                     }"
    />
    <ElementH2 :text="$t('not_supposed_to_be_here')" />
  </v-container>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  ref, computed, useStore, onBeforeMount
} from '@nuxtjs/composition-api'


export default defineComponent({
  name: 'BlockPage',
  setup () {
    const { $config } = useContext()
    const {
      state, commit
    } = useStore()
    const loading = ref(false)

    // DEFINE CONTENT
    const profile = computed(() => state.user.profile)
    const user = computed(() => state.user.data)

    // METHODS

    // MOUNT
    onBeforeMount(() => {
      commit('SHOW_FOOTER', false)
    })

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
<style>
.v-footer { display:none !important; }
</style>
