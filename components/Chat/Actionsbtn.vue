<template>
  <div>
    <v-icon class="pa-3 rounded-lg" color="myshoutDarkGrey" @click="showBottomSheet = true">
      mdi-dots-vertical
    </v-icon>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700" fullscreen>
      <v-sheet>
        <div class="ma-3" style="padding-bottom:180px;">
          <div class="text-right">
            <v-icon class="pa-3 rounded-lg" color="myshoutLightGrey" @click="showBottomSheet = false">
              mdi-close-thick
            </v-icon>
          </div>

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
            

          <ChatActionsMemberslist :chat="chat" :participants="participants" />
          <ChatActionsSettingslist :chat="chat" :participants="participants" />

          
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
  setup() {
    const { state } = useStore()
    const user = computed(() => state.user);
    
    const showBottomSheet = ref(false)

    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    return {
      user,
      showBottomSheet,
      swipe,
    }
  }
})
</script>
