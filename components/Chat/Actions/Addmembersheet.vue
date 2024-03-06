<template>
  <div>
    <v-list-item key="add-member" @click="showBottomSheet = true">
      <v-list-item-avatar>
        <v-icon small>mdi-account-plus</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{ $t('chat.add_member' )}}
      </v-list-item-title>
    </v-list-item>

    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="80vh" class="rounded-t-xl pb-14">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH1 align="center" :text="$t('chats.add_member')" />
          <ElementP :text="$t('chats.select_friends')" />

          <ChatViewsearchmembers @friendsSelected="friendsSelected"  />

          <v-app-bar color="rgba(0,0,0,0)" class="mb-16" flat bottom fixed style="top:90%; margin-bottom:20px">
            <div class="text-center" style="width: 100%">
              <v-btn class="primary elevation-0" rounded large @click="updateChat">
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
  name: 'ChatActionsAddmembersheet',
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

    const updateChat = async () => {
      if (newChatFriends.value.length === 0) {
        $notify.show({ text: i18n.t('chats.select_friend_first'), color: 'error' })
        return
      }
      try {
        loading.value = true
        
        const updatedChat = lodash.cloneDeep(props.chat) // Needed for VUEX mutation
        updatedChat.participants = [...updatedChat.participants, ...newChatFriends.value]

        await dispatch('chats/update', updatedChat)
        await router.push(`/chats`)
        
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
      updateChat,
      swipe,
      friendsSelected
    }
  }
})
</script>
