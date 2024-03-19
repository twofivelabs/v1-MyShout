<template>
  <v-skeleton-loader v-if="!chat" type="heading" />
  <span v-else>{{ chat.title ? truncateString(chat.title) : truncateString(users) }}</span>
</template>
<script>

import {
  defineComponent,
  ref, computed,
  useStore,
  watch, useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatUsername',
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const { $db } = useContext()
    const { state } = useStore()
    const user = computed(() => state.user)
    const users = ref('')

    const truncateString = (str, num = 20) => {
      if (str.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    }

    watch(() => props.chat, async (chat) => {
      if(chat && chat.participants) {
        users.value = ''
        for (const participant of chat.participants) {
          if (participant !== user.value.data.uid) {
            const joinedUser = await $db.get(`Users/${participant}`)
            // const joinedUser = await dispatch('user/getOne', participant)
            if (joinedUser && (user.value.data.uid !== joinedUser.id)) {
              users.value = users.value + `@${joinedUser.username} `
            }
          }
        }
      }
    }, { immediate: true });

    return {
      users,
      truncateString
    }
  }
})
</script>
