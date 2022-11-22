<template>
  <div>
    <v-btn class="justify-center primary elevation-0" @click="newChat">
      {{ $t('chats.add_member') }}
    </v-btn>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="80vh" class="rounded-t-xl pb-14">
        <div class="ma-3" style="padding-bottom:150px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH1 align="center" :text="$t('chats.add_member')" />
          <ElementP :text="$t('chats.select_friends')" />

          <ChatViewsearchmembers @friendsSelected="friendsSelected"  />

          <v-app-bar color="rgba(0,0,0,0)" class="mb-16" flat bottom fixed style="top:90%; margin-bottom:20px">
            <div class="text-center" style="width: 100%">
              <v-btn class="primary elevation-0" rounded large @click="startChat">
                {{ $t('btn.add') }}
              </v-btn>
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
  ref,
  useContext,
  useStore,
  // computed,
  useRouter,
} from '@nuxtjs/composition-api'

import lodash from 'lodash'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'ChatAddmemberstochatbtn',
  directives: { Touch },
  props: {
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $system, $notify, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    // const user = computed(() => state.user.data)

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
          comp: 'ChatsIndex',
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
        const updatedChat = lodash.cloneDeep(props.chat) // Needed for VUEX mutation
        updatedChat.participants = [...updatedChat.participants, ...newChatFriends.value]
        await dispatch('chats/update', updatedChat).then(async (room) => {
          if (room !== false) {
            // await router.push(`/chats/chat/${props.chat.id}`)
            await router.push(`/chats/chat/${props.chat.id}`)
            $notify.show({ text: i18n.t('notify.success'), color: 'success' })
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatAddmemberstochatbtn',
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
