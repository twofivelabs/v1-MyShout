<template>
  <div v-if="chat && chat.participants">
    <v-avatar v-if="chat.participants.length > 1" :class="`white--text rounded-lg ${(chat.photoUrl) ? 'mt-2' : '' }`" :size="size" color="primary" rounded>
      <v-img v-if="url" :src="chat.photoUrl" />
      <span v-else class="white--text headline">{{ `+${chat.participants.length}` }}</span>
    </v-avatar>
    <v-avatar v-else-if="participant" class="white--text rounded-lg" :size="size" color="primary" rounded>
      <v-img v-if="participant.photoUrl" :src="participant.photoUrl" />
      <span v-else class="white--text headline">{{ participant.initial ? participant.initial : (participant.username ? participant.username.charAt(0) : ':)') }}</span>
    </v-avatar>
    <v-skeleton-loader v-else type="avatar" :size="size" />
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useStore,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatTopavatar',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: Number,
      default: () => {
        return 40
      }
    },
  },
  setup(props) {
    const { state, dispatch } = useStore()
    const user = computed(() => state.user.data)

    const participant = ref(null)

    watch(() => props.chat, async (chat) => {
      if(chat && chat.participants.length === 2) {
        const filtedParticipants = chat.participants.filter(uid => uid !== user.value.uid)
        participant.value = await dispatch('user/getOne', filtedParticipants[0]);
      }
    }, { immediate: true });

    return {
      user,
      participant
    }
  }
})
</script>
