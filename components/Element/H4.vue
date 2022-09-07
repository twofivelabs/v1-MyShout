<template>
  <h4 :class="`no-break text-${align} text-h6 text-md-h5 text-lg-h4`" style="letter-spacing:0px !important;">
    <v-icon v-if="prependIcon">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h4>
</template>
<script>
export default {
  name: 'ElementH4',
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
