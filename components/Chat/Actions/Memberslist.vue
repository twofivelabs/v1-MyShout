<template>
  <div v-if="!participants"> 
    <v-skeleton-loader v-for="x in 3" :key="x" type="list-item	" />
  </div>
  <v-list-item-group v-else>
    {{ $t('chat.members') }}
    <ChatActionsAddmembersheet :chat="chat" :participants="participants" />
    <ChatActionsParticipantsheet :chat="chat" :participants="participants" />
  </v-list-item-group>
</template>
<script>

import {
  defineComponent
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MembersList',
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
   
    
    return { }
  }
})
</script>
