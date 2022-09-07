<template>
  <v-img
      class="rounded-lg"
      :style="(styling ? 'background-color:var(--v-myshoutBlue-base); border:solid 0.5rem var(--v-myshoutBlue-base); margin:0 auto;': '')"
      :height="width"
      :width="width"
      position="center"
      contain
      src="/icons/Shout.svg"
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
  name: 'IconsShout',
  props: {
    styling: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: () => {
        return '6rem'
      }
    }
  },
  setup () {

  }
})
</script>
