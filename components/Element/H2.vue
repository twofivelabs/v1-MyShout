<template>
  <h2 :class="`text-${align}  text-h4 text-md-h3 text-lg-h2`" style="letter-spacing:0px !important;">
    <v-icon v-if="prependIcon">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h2>
</template>
<script>
export default {
  name: 'ElementH2',
  props: {
    text: {
      type: String,
      default: ''
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
