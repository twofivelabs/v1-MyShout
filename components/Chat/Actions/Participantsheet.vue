<template>
  <div>
    <v-list-item
      v-for="(participant, index) in participants"
      :key="index"
      @click="openBottomSheet(participant)"
    >
      <v-list-item-avatar>
        <ChatAvatar :user="participant" />
      </v-list-item-avatar>
      <v-list-item-title>
          {{ participant.username }}
      </v-list-item-title>
    </v-list-item>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="93vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />
          
          <v-row no-gutters class="text-center mb-10" v-if="participant">
            <v-col cols="12">
              <ChatAvatar :user="participant" :size="80"/>
            </v-col>
            <v-col cols="12" class="text-h2 pt-5 pb-2">
              {{ participant.username ? participant.username : (participant.first_name ? participant.first_name : '') }}
            </v-col>
          </v-row>
                    
          <v-list-item-group class="mt-10">
            <v-list-item key="profile" @click="viewParticipantProfile(participant)">
              <v-list-item-avatar>
                <v-icon small>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ $t('chat.view_profile') }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group class="mt-5">
            <v-list-item key="mute-chat"  v-if="chat.admins.includes(user.data.uid)" @click="setParticipantAsAdmin(participant)">
              <v-list-item-avatar>
                <v-icon small :color="chat.admins.includes(participant.id) ? 'red' : ''">mdi-account-lock</v-icon>
              </v-list-item-avatar>
              <v-list-item-title :class="chat.admins.includes(participant.id) ? 'red--text' : ''">
                {{ !chat.admins.includes(participant.id) ? 'Make An Admin' : 'Remove As Admin' }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item key="leave-group" v-if="chat.admins.includes(user.data.uid) || user.data.uid === participant.id" @click="removeParticipant(participant)">
              <v-list-item-avatar>
                <v-icon small color="red">mdi-exit-to-app</v-icon>
              </v-list-item-avatar>
              <v-list-item-title class="red--text">
                {{ participants.size > 1 ? (participant.id === user.data.id ? $t('chat.leave_group') : $t('chat.remove_from_group')) : $t('chat.leave_chat') }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  ref, 
  useStore,
  useRouter,
  computed,
} from '@nuxtjs/composition-api'

import { Touch } from 'vuetify/lib/directives'
import firebase from 'firebase';
import 'firebase/functions';

export default defineComponent({
  name: 'ParticipantSheet',
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
    },
    admins: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $notify, i18n } = useContext()
    const { state, dispatch } = useStore()
    const router = useRouter()
    const user = computed(() => state.user);
    
    const showBottomSheet = ref(false)
    const participant = ref({})

    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    const openBottomSheet = (p) => {
      participant.value = p
      showBottomSheet.value = true
    }

    const viewParticipantProfile = (p) => {
      if (p.id === user.value.data.uid) return router.push('/profile')
      return router.push(`/users/user/${p.id}`)
    }

    const setParticipantAsAdmin = async (p) => {
      const isAdmin = props.chat.admins.includes(p.id)
      if (isAdmin && props.chat.admins.length === 1) return $notify.show({
          text: i18n.t('notify.not_enough_admins'),
          color: 'error'
        })

      await dispatch('chats/updateField', {
        id: props.chat.id,
        admins: !isAdmin ? firebase.firestore.FieldValue.arrayUnion(p.id) : firebase.firestore.FieldValue.arrayRemove(p.id)
      })
    }

    const removeParticipant = async (p) => {
      const res = await dispatch('chats/updateField', {
        id: props.chat.id,
        participants: firebase.firestore.FieldValue.arrayRemove(p.id)
      })
      if (res && p.id === user.value.data.uid) return router.push('/chsts')
    }

    return {
      openBottomSheet, showBottomSheet,
      user,
      participant,
      swipe,
      viewParticipantProfile,
      setParticipantAsAdmin,
      removeParticipant
    }
  }
})
</script>
