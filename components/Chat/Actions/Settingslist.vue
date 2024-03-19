<template>
  <div v-if="!chat && !participants">
    <v-skeleton-loader v-for="x in 3" :key="x" type="list-item	" />
  </div>
  <v-list-item-group class="mt-10" v-else>
    <v-list-item key="refresh-chat" @click="refreshChat()">
      <v-list-item-avatar>
        <v-icon small>mdi-refresh</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{ $t('chat.refresh_chat') }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item key="mute-chat" @click="setChatMuteState()">
      <v-list-item-avatar>
        <v-icon small>mdi-volume-off</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{ !chat.muted.includes(user.data.uid) ? $t('chat.mute_notifications') : $t('chat.unmute_notifications') }}
      </v-list-item-title>
    </v-list-item>
    <ChatActionsAdminssheet :chat="chat" :admins="admins" />
    <v-list-item key="leave-group" @click="leaveChat()">
      <v-list-item-avatar>
        <v-icon small color="red">mdi-exit-to-app</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="red--text">
        {{ participants.size > 1 ? $t('chat.leave_group') : $t('chat.leave_chat') }}
      </v-list-item-title>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import {
  defineComponent,
  useStore,
  useRouter,
  computed, useContext,
} from '@nuxtjs/composition-api'

/*   import firebase from 'firebase';
  import 'firebase/functions'; */

  export default defineComponent({
    name: 'SettingsList',
    props: {
      chat: {
        type: Object,
        default: () => {
          return {}
        }
      },
      participants: {
        type: Object,
        default: () => {
          return {}
        }
      },
      admins: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    setup(props) {
      const { state } = useStore()
      const { $db } = useContext()
      const router = useRouter()
      const user = computed(() => state.user);

      const refreshChat = () => {
        return window.location.reload();
      }

      const setChatMuteState = async () => {
        return $db.save(`Chats/${props.chat.id}`, {
          id: props.chat.id,
          muted: !props.chat.muted.includes(user.value.data.uid) ? $db.fire().arrayUnion(user.value.data.uid) : $db.fire().arrayRemove(user.value.data.uid)
        })
        /* return await dispatch('chats/updateField', {

        }) */
      }

      const leaveChat = async () => {
        const res = $db.save(`Chats/${props.chat.id}`, {
          id: props.chat.id,
          participants: $db.fire().arrayRemove(user.value.data.uid)
        })
        /* const res = await dispatch('chats/updateField', {
          id: props.chat.id,
          participants: $db.fire().fs.FieldValue.arrayRemove(user.value.data.uid)
        }) */
        if (res) return router.push('/chats')
      }

      return {
        user,
        setChatMuteState,
        leaveChat,
        refreshChat
      }
    }
  })
  </script>
