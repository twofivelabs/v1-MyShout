<template>
  <v-skeleton-loader v-if="!chat" type="heading" />
  <span v-else>{{ chat.title ? truncateString(chat.title) : truncateString(users) }}</span>
</template>
<script>

import {
  defineComponent,
  ref,
  useStore,
  watch
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
    loggedInUser: {
      type: String,
      default: () => {
        return null
      }
    },
  },
  setup(props) {
    const { dispatch } = useStore()
    
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
        console.log("Chat", chat)
        users.value = ''
        for (const participant of chat.participants) {
          if (participant !== props.loggedInUser) {
            console.log("participant", participant)
            const joinedUser = await dispatch('user/getOne', participant)
              if (joinedUser && (props.loggedInUser !== joinedUser.id)) {
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
