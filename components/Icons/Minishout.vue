<template>
  <v-img
      :height="width"
      :width="width"
      position="center"
      contain
      src="/logo/MyShout-Logo.svg"
      v-anime="{
        translateY: [100, 0],
        duration: 400
      }"
  />
</template>
<script>
import {
  defineComponent,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IconsMinishout',
  props: {
    width: {
      type: String,
      default: () => {
        return '3rem'
      }
    }
  },
  setup () {

  }
})
</script>
