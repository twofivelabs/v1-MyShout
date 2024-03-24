<template>
  <div @click="startChat">
    <slot>
      <v-list-item  class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon >mdi-message-text</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('chats.send_message') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </slot>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserActionsSendamessagebtn',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $system, $db } = useContext()
    const { state, dispatch } = useStore()
    const loading = ref(false)
    const dialog = ref(false)
    const loggedInUser = computed(() => state.user.data)
    const router = useRouter()

    // DEFINE
    const newChatFriends = ref([])

    // METHODS
    const hasExistingChat = async () => {
      const rooms = await $db.simpleSearch('Chats', 'owner', loggedInUser.value.uid)
      if (rooms.length > 0) {
        // All the users chats
        if(rooms) {
          let roomFound = false
          rooms.some((room) => {
            // Only work with rooms with 2 participants
            if(room.participants.length === 2) {
              if(room.participants.includes(loggedInUser.value.uid) && room.participants.includes(props.user.id)) {
                roomFound = room
                return room
              }
            }
          })
          return roomFound
        }
      }
    }
    const startChat = async () => {
      loading.value = true
      try {
        // Search for an exising room first
        const existingChatRoom = await hasExistingChat()
        if(existingChatRoom && existingChatRoom.id) {
          await router.push(`/chats/chat/${existingChatRoom.id}`)
          return
        }

        // Create a new chat room
        newChatFriends.value.push(loggedInUser.value.uid)
        newChatFriends.value.push(props.user.id)

        await dispatch('chats/add', {
          admins: [loggedInUser.value.uid],
          owner: loggedInUser.value.uid,
          participants: newChatFriends.value
        }).then(async (room) => {
          if (room !== false) {
            await router.push(`/chats/chat/${room.id}`)
          }
        })
      } catch(e) {
        $system.log({ comp: 'UserActionsSendamessagebtn', msg: 'startChat', val: e })
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      dialog,
      startChat,
    }
  }
})
</script>
