<template>
  <div>
    <v-icon class="pa-3 rounded-lg" color="myshoutDarkGrey" @click="showChatActions()">
      mdi-dots-vertical
    </v-icon>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="50vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:150px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH3 align="center" :text="$t('actions')" />

          <v-list-item-group>
            <ChatActionsRenamebtn :chatId="chatId" />
            <ChatActionsViewmembersbtn :chatId="chatId" />
            <ChatActionsRemovechatbtn :chatId="chatId" />
          </v-list-item-group>

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'ChatActionsbtn',
  directives: { Touch },
  props: {
    chatId: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  setup(props) {
    const { $system } = useContext()
    const { dispatch } = useStore()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const chat = ref()

    // METHODS
    const showChatActions = async () => {
      try {
        loading.value = true

        try {
          loading.value = true
          await dispatch('chats/getOne', props.chatId).then((res) => {
            if (res !== false) {
              chat.value = res
              showBottomSheet.value = true
            }
          })
        } catch(e) {
          $system.log({
            comp: 'ChatActions',
            msg: 'useFetch',
            val: e
          })
        } finally {
          loading.value = false
        }
      } catch(e) {
        $system.log({
          comp: 'ChatsIndex',
          msg: 'showChatActions',
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
      chat,
      showBottomSheet,
      showChatActions,
      swipe,
    }
  }
})
</script>
