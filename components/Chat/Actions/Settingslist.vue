<template>
  <div v-if="!chat && !participants"> 
    <v-skeleton-loader v-for="x in 3" :key="x" type="list-item	" />
  </div>
  <v-list-item-group class="mt-10" v-else>
    <v-list-item key="mute-chat" @click="setChatMuteState()">
      <v-list-item-avatar>
        <v-icon small>mdi-volume-off</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{ !chat.muted.includes(user.data.uid) ? 'Mute Notifications' : 'Unmute Notification'}}
      </v-list-item-title>
    </v-list-item>
    <ChatActionsAdminssheet :chat="chat" :admins="admins" />
    <v-list-item key="leave-group" @click="leaveChat()">
      <v-list-item-avatar>
        <v-icon small color="red">mdi-exit-to-app</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="red--text">
        {{ participants.size > 1 ? 'Leave Group' : 'Leave Chat' }}
      </v-list-item-title>
    </v-list-item>
  </v-list-item-group>
</template>

<script> 
  import {
    defineComponent,
    ref,
    useStore,
    useRoute,
    computed,
    watch
  } from '@nuxtjs/composition-api'

  import firebase from 'firebase';
  import 'firebase/functions';
  
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
      }
    },
    setup(props) {
      const { state, dispatch } = useStore()
      const route = useRoute()
      const user = computed(() => state.user); 

      const admins = ref({})
          
      const setChatMuteState = async () => {
        return await dispatch('chats/updateField', {
            id: props.chat.id,
            muted: !props.chat.muted.includes(user.value.data.uid) ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
        })
      }
      
      const leaveChat = async () => {
        const res = await dispatch('chats/updateField', {
          id: props.chat.id,
          participants: firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
        })
        if (res) return route.push('/chsts')
      }

      watch(() => props.chat, (newChat) => {
        if (newChat && newChat.admins && props.participants) {
          newChat.admins.forEach((adminUid) => {
            if (props.participants[adminUid]) {
                admins.value[adminUid] = props.participants[adminUid];
            }
          });
        }
      }, { immediate: true, deep: true })
      
      return {
        user,
        admins,
        setChatMuteState,
        leaveChat
      }
    }
  })
  </script>
  