<template>
    <span class="">
      <span v-if="titleN">{{ titleN }}</span>
      <span v-else>{{ title }}</span>
    </span>
</template>
<script>

import {
  defineComponent,
  ref, onMounted, useStore, computed,
} from '@nuxtjs/composition-api'
import lodash from 'lodash'

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
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const { state, dispatch } = useStore()
    const title = ref(props.chat.title)
    const titleN = computed(() => {
      const newTitle = lodash.find(state.chats.all, { id: props.chat.id })
      if ( newTitle ) {
        return newTitle.title
      } else {
        return props.chat.title
      }
    })

    // METHODS
    const loggedInUserId = () => {
      if (props.loggedInUser.uid) {
        return props.loggedInUser.uid
      } else if (props.loggedInUser.data.uid) {
        return props.loggedInUser.data.uid
      }
    }
    const getChatTitle = async (chat) => {
      if (chat.title) {
        title.value = chat.title
        return
      }
      title.value = ''
      for (const chatParticipantId of chat.participants) {
        if (chatParticipantId !== props.loggedInUser.uid) {
          // const joinedUser = await joinUser(chatParticipantId)
          const joinedUser = await dispatch('user/getOne', chatParticipantId)
            if (joinedUser && (loggedInUserId() !== joinedUser.id)) {
              title.value = title.value + `@${joinedUser.username} `
            }
        }
      }
    }

    // MOUNT
    onMounted(async () => {
      if (!title.value) {
        await getChatTitle(props.chat)
      }
    })

    return {
      title,
      titleN
    }
  }
})
</script>
