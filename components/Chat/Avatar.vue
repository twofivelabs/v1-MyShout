<template>
  <v-avatar size="30" elevation="10" :color="`${color} lighten-2`" rounded>
    <v-img v-if="url" :src="url" />
    <span v-else class="white--text headline">{{ initial }}</span>
  </v-avatar>
</template>
<script>

import {
  defineComponent,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatAvatar',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    color: {
      type: String,
      default: () => {
        return 'primary'
      }
    }
  },
  setup(props) {
    const url = ref(props.user.photoURL)
    const initial = ref(props.user.initial)

    return {
      url,
      initial
    }
  }
})
</script>
