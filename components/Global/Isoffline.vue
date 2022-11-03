<template>
  <div>
    <div v-if="$nuxt.isOffline" class="text-center isOffline">
      {{ $t('you_are_currently_offline') }}
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
