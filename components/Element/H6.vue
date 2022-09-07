<template>
  <h6 :class="`text-${align} text-h6`" style="letter-spacing:0px !important;">
    <v-icon v-if="prependIcon">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h6>
</template>
<script>
export default {
  name: 'ElementH6',
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
