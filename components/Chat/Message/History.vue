<template>
  <div>
    

    
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  computed,
} from '@nuxtjs/composition-api'


export default defineComponent({
  name: 'MessageHistory',
  directives: { Touch },
  props: {
    message: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup() {
    const { state } = useStore()
    const user = computed(() => state.user);
    

    return {
      user,
    }
  }
})
</script>