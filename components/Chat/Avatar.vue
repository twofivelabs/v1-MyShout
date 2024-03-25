<template>s
  <v-avatar :size="size" elevation="10" :color="`${color} lighten-2`" rounded>
    <v-img v-if="user.photoURL" :src="user.photoURL" />
    <span v-else class="white--text headline">{{ user.initial ? user.initial : (user.username ? user.username.charAt(0) : ':)') }}</span>
  </v-avatar>
</template>
<script>

import {
  defineComponent
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
    },
    size: {
      type: Number,
      default: () => {
        return 30
      }
    }
  }
})
</script>
