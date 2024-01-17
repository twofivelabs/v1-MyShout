<template>
  <div v-if="!participants"> 
    <v-skeleton-loader v-for="x in 3" :key="x" type="list-item	" />
  </div>
  <v-list-item-group v-else>
    {{ $t('chat.members') }}
    <v-list-item key="add-member">
      <v-list-item-avatar>
        <v-icon small>mdi-account-plus</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        {{ $t('chat.add_member' )}}
      </v-list-item-title>
    </v-list-item>
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
