<template>
  <div>
    <v-icon class="grey lighten-2 pa-3 rounded-lg" color="myshoutDarkGrey" @click="newChat">
      mdi-message-outline
    </v-icon>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="80vh" class="rounded-t-xl pb-14">
        <div class="ma-3">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH1 align="center" :text="$t('chats.new_chat')" />
          <ElementP :text="$t('chats.select_friends')" />

          <ChatViewsearchmembers @friendsSelected="friendsSelected"  />

          <v-app-bar color="rgba(0,0,0,0)" class="mb-16" flat bottom fixed style="top:90%; margin-bottom:20px">
            <div class="text-center" style="width: 100%">
              <v-btn class="primary elevation-0" rounded large @click="startChat">{{ $t('chats.start_chat') }}</v-btn>
            </div>
          </v-app-bar>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  useStore,
  computed, useRouter,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'
export default defineComponent({
  name: 'ChatNewchatbtn',
  directives: { Touch },
  setup() {
    const { $system, $notify, i18n } = useContext()
    const { dispatch, state } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const user = computed(() => state.user.data)

    // DEFINE
    const showBottomSheet = ref(false)
    const newChatFriends = ref([])

    // METHODS
    const friendsSelected = (fs) => {
      newChatFriends.value = fs
    }
    const newChat = async () => {
      try {
        loading.value = true
        showBottomSheet.value = true
      } catch(e) {
        $system.log({
          comp: 'ChatNewchatbtn',
          msg: 'getChats',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const startChat = async () => {
      if (newChatFriends.value.length === 0) {
        $notify.show({ text: i18n.t('chats.select_friend_first'), color: 'error' })
        return
      }
      try {
        loading.value = true
        newChatFriends.value.push(user.value.uid)
        await dispatch('chats/add', {
          owner: user.value.uid,
          participants: newChatFriends.value
      }).then(async (room) => {
          if (room !== false) {
            newChatFriends.value = []
            await router.push(`/chats/chat/${room.id}`)
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatNewchatbtn',
          msg: 'startChat',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    return {
      loading,
      showBottomSheet,
      newChat,
      startChat,
      swipe,
      friendsSelected
    }
  }
})
</script>
