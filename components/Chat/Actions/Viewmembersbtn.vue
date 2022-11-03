<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" @click="getChat" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon >mdi-account-supervisor</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('chats.view_members') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl py-4">
      <ElementH1 text="Members" />
      <div class="text-center">
        <ChatAddmemberstochatbtn :chat="chat" />
      </div>

      <v-card-text class="mt-5">
        <template v-for="(participant, index) in participants">
          <UserListitem :key="index" :user="participant" :class="`member-${participant.id} mt-2`">
            <template v-slot:action>
              <v-btn v-if="isOwnerOfChat" text color="red" @click="removeChatMember(participant)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </UserListitem>
        </template>

      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
            text
            @click="dialog = false"
        >
          {{ $t('btn.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext, useStore, useRouter
} from '@nuxtjs/composition-api'
import firebase from 'firebase'

export default defineComponent({
  name: 'ChatActionsViewmembersbtn',
  props: {
    chatId: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  setup(props) {
    const { $system, $fire } = useContext()
    const { dispatch, state } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const chat = ref()
    const dialog = ref(false)
    const participants = ref([])
    const isOwnerOfChat = ref(false)
    const loggedInUser = computed(() => state.user.data)

    // METHODS
    const getChat = async () => {
      loading.value = true
      try {
        await dispatch('chats/getOne', props.chatId).then(async (res) => {
          if (res !== false) {
            chat.value = res

            if(chat.value.owner === loggedInUser.value.uid) {
              console.log('Yes, is owner')
              isOwnerOfChat.value = true
            }

            participants.value = []
            for (const uid of chat.value.participants) {
              if (uid === loggedInUser.value.uid) {
                // Do nothing
              } else {
                const u = await dispatch('user/getOne', uid)
                participants.value.push({...u})
              }
            }
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatActions',
          msg: 'getChat',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const removeChatMember = async (participant) => {
      if(chat.value.id && participant.id) {
        try {
          await $fire.firestore.doc(`Chats/${chat.value.id}`).update({
            "participants": firebase.firestore.FieldValue.arrayRemove(participant.id)
          })
          await $fire.firestore.doc(`Chats/${chat.value.id}`).get().then((doc) => {
            // if only 1 member of the chat, it will delete the chat
            if(doc.data().participants.length === 1) {
              dispatch('chats/remove', chat.value.id)
              dialog.value = false
              router.push(`/chats`)
            }
          })
          dialog.value = false
        } catch (e) {
          console.log(e)
        }
      }
    }

    return {
      loading,
      chat,
      dialog,
      participants,
      isOwnerOfChat,
      getChat,
      removeChatMember,
    }
  }
})
</script>
