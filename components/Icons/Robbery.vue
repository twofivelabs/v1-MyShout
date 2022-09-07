<template>
  <v-img
      class="rounded-lg"
      style="background-color:var(--v-myshoutGreen-base); border:solid 0.5rem var(--v-myshoutGreen-base); margin:0 auto;"
      :height="width"
      :width="width"
      position="center"
      contain
      src="/icons/Robbery.svg"
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
  name: 'IconsRobbery',
  props: {
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
