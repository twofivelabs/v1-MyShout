<template>
  <h1 :class="`text-${align} text-h1 text-md-h2 text-lg-h1`" style="letter-spacing:-2px !important;">
    <v-icon v-if="prependIcon">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h1>
</template>
<script>
export default {
  name: 'ElementH1',
  props: {
    text: {
      type: String,
      default: () => { return '' }
    },
    align: {
      type: String,
      default: 'center'
    },
    prependIcon: {
      type: String,
      default: null
    }
  }
}
</script>
