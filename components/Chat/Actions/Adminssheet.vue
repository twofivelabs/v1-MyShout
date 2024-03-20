<template>
  <div>
    <v-list-item key="mute-chat" v-if="chat.admins.includes(user.data.uid)" @click="showBottomSheet = true">
      <v-list-item-icon>
        <v-icon small>mdi-account-lock</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('chat.admins') }}
      </v-list-item-title>
    </v-list-item>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="93vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

          <ChatActionsAdminslist :admins="admins" />

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
    admins: {
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
      showBottomSheet,
      user,
      swipe,
    }
  }
})
</script>
