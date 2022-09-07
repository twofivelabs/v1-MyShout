<template>
    <v-switch
        v-if="$config.useDarkMode"
        v-model="$vuetify.theme.dark"
        hide-details="true"
        label="Dark Mode"
        prepend-icon="mdi-brightness-4"
        @click="toggleDarkMode"
    />
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
  name: 'UserDarkmode',
  setup () {
    const {
      state,
    } = useStore()
    const {
      $vuetify,
      $ttlStorage,
    } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // METHODS
    const toggleDarkMode = () => {
      setTimeout(() => {
        $vuetify.theme.dark = !!$vuetify.theme.dark
        $ttlStorage.set('darkMode', $vuetify.theme.dark)
      }, 0)
    }

    return {
      loading,
      user,
      profile,
      toggleDarkMode
    }
  }
})
</script>
