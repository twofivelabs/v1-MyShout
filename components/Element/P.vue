<template>
  <p :class="`text-${align} text-xl-body-1`">
    {{ text }}
  </p>
</template>
<script>
export default {
  name: 'ElementP',
  props: {
    text: {
      type: String,
      default: () => { return '' }
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>
