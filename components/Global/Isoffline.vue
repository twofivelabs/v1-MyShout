<template>
  <div>
    <div v-if="$nuxt.isOffline" class="text-center isOffline">
      Uh Oh! It looks like you are offline.
    </div>
  </div>
</template>
<script>

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalIsOffline',
  setup () {

  }
})
</script>
<style scoped>
.isOffline {
  font-size: 11px;
  color: white;
  background-color: #505050;
}
</style>
