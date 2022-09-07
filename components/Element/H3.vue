<template>
  <h3 :class="`no-break text-${align} text-h5 text-md-h4 text-lg-h3`" style="letter-spacing:0px !important;">
    <v-icon v-if="prependIcon" :color="iconColor">
      {{ prependIcon }}
    </v-icon>
    {{ text }}
  </h3>
</template>
<script>
export default {
  name: 'ElementH3',
  props: {
    text: {
      type: String,
      default: () => {
        return ''
      }
    },
    align: {
      type: String,
      default: 'center'
    },
    prependIcon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    }
  }
}
</script>
