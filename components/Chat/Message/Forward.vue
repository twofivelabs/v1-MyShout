<template>

  <v-row class="pa-0 ma-0 align-center" style="width:100%;">
    <v-col cols="11" style="font-weight:bold;">
      {{ $t('chat.forward_to' )}}
    </v-col>
    <v-col cols="1">
      <v-btn @click="searchFriends" icon v-if="false"> {{ /* Disabled For Now */ }}
        <v-icon color="myshoutDarkGrey">mdi-account-search-outline</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <div class="pb-3">{{ $t('chat.recent_chats')}}</div>
      <v-row v-for="(c, index) in recentChats" :key="c.id || index" class="d-flex">
        <v-col cols="10" class="py-0 d-flex align-center">
          <ChatTopavatar :chat="c" class="mr-2" />
          <ChatUsername :chat="c" />
        </v-col>
        <v-col cols="2" class="py-0 d-flex align-center justify-end">
          <v-checkbox
            class="pa-0"
            v-model="selectedChats"
            :value="c.id"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-if="false">
      <div class="pb-3">{{ $t('friends')}}</div>
      <v-row v-for="(u, index) in friends" :key="u.uid || index" class="d-flex">
        <v-col cols="10" class="py-0 d-flex align-center">
          <ChatAvatar :user="u" class="mr-2" />
          <span class="username myshoutDarkGrey--text">{{ u.username ? `@${u.username}` : u.first_name }}</span>
        </v-col>
        <v-col cols="2" class="py-0 d-flex align-center justify-end">
          <v-checkbox
            class="pa-0"
            v-model="selectedChats"
            :value="u.uid"
          ></v-checkbox>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="12" v-if="selectedChats.length > 0">
      <v-text-field
        v-model="newMessage"
        @keydown.enter="sendMessage"
        :label="$t('form.message')"
        type="text"
        hide-details
        solo
      >

        <template v-slot:append-outer>
          <v-btn @click="sendMessage" fab>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  useStore, useContext,
  computed,
  ref, watch,
  useRouter
} from '@nuxtjs/composition-api'


  export default defineComponent({
    name: 'ChatMessageForward',
    props: {
      chat: {
        type: Object,
        default: () => {
          return {}
        }
      },
      message: {
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
    },
    setup(props) {
      const { $fire, $notify, $encryption, i18n } = useContext();
      const { state, dispatch } = useStore();
      const user = computed(() => state.user);
      const router = useRouter()

      const recentChats = ref([])
      const selectedChats = ref([])

      const friends = ref([])
      const selectedFriends = ref([])

      const newMessage = ref('')

      const searchFriends = () => {
        console.log("Search")
      }

      const getFriends = async () => {
        const result = await $fire.firestore
          .collection('Users').doc(user.value.data.uid).collection("Friends")
          .where('status', '==', "approved")
          .orderBy('updated_at', 'desc')
          .get();

        for (const doc of result.docs) {
          const user = await $fire.firestore
            .collection('Users').doc(doc.id)
            .get()

          friends.value.push({selected: false, ...user.data()})
        }
      };

      const getRecentChats = async () => {        
        const result = await $fire.firestore
          .collection('Chats')
          .where('participants', 'array-contains', user.value.data.uid)
          .orderBy('message.created_at', 'desc')
          .get();

        result.forEach(doc => {
          if (doc.id === props.chat.id) return;
          recentChats.value.push({selected: false, ...doc.data()})
        })
      };

      const sendMessage = async () => {
        try {
          if (!user.value.data.uid) {
            $notify.show({
              text: i18n.t('notify.error_try_again'),
              color: 'error'
            });
            return;
          }

          const payload = {
            owner: user.value.data.uid,
            seen: [user.value.data.uid],
            message: $encryption.encrypt(newMessage.value),
            forward: {
              chat: props.chat.id,
              message: props?.message.id
            }
          }

          for(const c of selectedChats.value) {
            const res = await dispatch('chats/messages/add', {
              chatId: c,
              message: payload
            });

            if (res) {
              await dispatch('chats/updateField', {
                id: c,
                message: {
                  created_at:new Date(),
                  sent_by: user.value.data.uid,
                  snippet: newMessage.value || 'Forwarded a message'
                },
                seen: [user.value.data.uid]
              });

            }
          }

          selectedFriends.value.forEach(f => {
            console.log("Friend tto receive message", f)
          })

          return router.push(`/chats/`)
         } catch(e) {
          console.log("Error Forwarding Message", e)
         }


      }

      watch([() => props.chat, () => props.message], ([newChat, newMessage]) => {
        if (newChat && newMessage) {
          getFriends();
          getRecentChats();
        }
      }, {
        immediate: true,
        deep: true
      });

      return {
        recentChats, selectedChats,
        friends, selectedFriends,
        searchFriends,
        newMessage, sendMessage
      }
    }
  })
  </script>
  <style>


  </style>
