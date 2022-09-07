<template>
  <v-btn v-if="city" class="pl-1 pr-2 grey--text darken-1" small text to="/profile">
    <v-icon>
      mdi-google-maps
    </v-icon>
    <span v-if="!$helper.hasDisplayNotch()" class="hideWithinNotch">{{ city }}</span>
  </v-btn>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useStore,
  watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserLocationBtn',
  setup () {
    const { state } = useStore()
    const city = ref(null)
    const profile = computed(() => state.user.profile)
    const gps = computed(() => state.user.gps)

    if (profile.value.location && profile.value.location.city) {
      city.value = profile.value.location.city
    }

    watchEffect(() => {
      if (gps.value.city) {
        city.value = gps.value.city
      } else if (profile.value.location.city) {
        city.value = profile.value.location.city
      }
    })

    return {
      city
    }
  }
})
</script>
<style scoped>
.hideWithinNotch {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
</style>
