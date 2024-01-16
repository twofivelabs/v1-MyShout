<template>
  <div>
    <v-icon class="pa-3 rounded-lg" color="myshoutDarkGrey" @click="showBottomSheet = true">
      mdi-dots-vertical
    </v-icon>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="95vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

          <v-row no-gutters class="text-center mb-10">
            <v-col cols="12">
              <ChatTopavatar v-if="chat" :chat="chat" :size="80"/>
            </v-col>
            <v-col cols="12" class="text-h2 pt-5 pb-2">
              {{ chat.title ? chat.title : 'Add title' }}
            </v-col>
            <v-col cols="12" class="caption">
              {{ chat.description ? chat.description : 'Add group description...' }}
            </v-col>
          </v-row>
            

          <v-list-item-group v-if="participants">
            Members
            <v-list-item key="add-member">
              <v-list-item-avatar>
                <v-icon small>mdi-account-plus</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                Add Members
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(participant, index) in participants"
              :key="index"
            >
              <v-list-item-avatar>
                <ChatAvatar :user="participant" />
              </v-list-item-avatar>
              <v-list-item-title>
                {{ participant.username }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group class="mt-10" v-if="chat && participants">
            <v-list-item key="mute-chat" @click="setChatMuteState()">
              <v-list-item-avatar>
                <v-icon small>mdi-volume-off</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ !chat.muted.includes(user.data.uid) ? 'Mute Notifications' : 'Unmute Notification'}}
              </v-list-item-title>
            </v-list-item>
            <v-list-item key="leave-group">
              <v-list-item-avatar>
                <v-icon small color="red">mdi-exit-to-app</v-icon>
              </v-list-item-avatar>
              <v-list-item-title class="red--text">
                {{ participants.size > 1 ? 'Leave Group' : 'Leave Chat' }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
            <!--
              <ChatActionsViewmembersbtn :chat="chat" :participants="participants" />
              <ChatActionsRenamebtn :chatId="chat.id" />
              <ChatActionsRemovechatbtn :chatId="chat.id" />
            -->
          

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, 
  useStore,
  computed,
} from '@nuxtjs/composition-api'

import { Touch } from 'vuetify/lib/directives'
import firebase from 'firebase';
import 'firebase/functions';

export default defineComponent({
  name: 'ChatActionsbtn',
  directives: { Touch },
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
    const user = computed(() => state.user);
    
    const showBottomSheet = ref(false)

    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    const setChatMuteState = async () => {
      console.log(`Mute Button Selected For User ${user.value.data.uid}`, props.chat.muted)
      return await dispatch('chats/updateField', {
        id: props.chat.id,
        muted: !props.chat.muted.includes(user.value.data.uid) ? firebase.firestore.FieldValue.arrayUnion(user.value.data.uid) : firebase.firestore.FieldValue.arrayRemove(user.value.data.uid)
      })
    }

    return {
      showBottomSheet,
      user,
      swipe, setChatMuteState
    }
  }
})
</script>
