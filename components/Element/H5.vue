<template>
  <h5 :class="`text-${align} text-h6 text-md-h6 text-lg-h5`" style="letter-spacing:0px !important;">
    <v-icon v-if="prependIcon">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h5>
</template>
<script>
export default {
  name: 'ElementH5',
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
