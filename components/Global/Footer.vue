<template>
  <div>
    <v-row v-if="showFooter" class="pa-8 mb-12 align-center">
      <v-col class="caption" cols="12" sm="7">
        <GlobalFooterlinks/>
        <span class="caption grey--text">Copyright {{ $config.appTitle }}</span>
      </v-col>
      <v-col class="text-right" cols="12" sm="5">
        <GlobalSocialmedia/>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalFooter',
  setup () {
    // const showFooter = computed(() => state.globals.showFooter)
    const showFooter = false

    return {
      showFooter
    }
  }
})
</script>
