<template>
  <div>
    <v-badge v-if="participantCount > 1" bordered inline :content="`+${participantCount}`" color="myshoutOrange">
      <v-avatar :class="`white--text rounded-lg ${(url) ? 'mt-2' : '' }`" size="40" color="primary" rounded>
        <v-img v-if="url" :src="url" />
        <span v-else class="white--text headline">{{ initial }}</span>
      </v-avatar>
    </v-badge>
    <v-avatar v-else class="white--text rounded-lg" size="40" color="primary" rounded>
      <v-img v-if="url" :src="url" />
      <span v-else class="white--text headline">{{ initial }}</span>
    </v-avatar>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref, useStore, onMounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatTopavatar',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { state, dispatch } = useStore()
    // const user = computed(() => state.user)
    const profile = computed(() => state.user.profile)
    const avatar = ref()
    const url = ref()
    const initial = ref()
    let participantCount = 0

    if(props.chat.participants) {
      participantCount = props.chat.participants.length - 1
    }

    // METHODS
    onMounted(async () => {
      if (participantCount >= 1) {
        for (const uid of props.chat.participants) {
          if (profile.value.id !== uid) {
            const u = await dispatch('user/getOne', uid)
            if (u) {
              initial.value = u.initial
              url.value = u.photoUrl
            }
          }
        }
      }
    })

    return {
      avatar,
      participantCount,
      profile,
      url,
      initial
    }
  }
})
</script>
