<template>
  <div v-if="message && reply" :class="!(message.owner === userId) ? 'd-flex' : 'd-flex flex-row-reverse text-right'" class="caption pb-2">
    <div>
      <div>You replied to {{ reply.owner ? reply.owner.username : '' }}</div>
      <div class=" pa-2 rounded-lg message-border">
        <v-icon small>mdi-reply</v-icon>        
        {{ reply.message ? reply.message : '' }}
      </div>        
    </div>
  </div>
</template>
<script>

import {
  defineComponent,
  useStore,
  useContext,
  computed,
  ref,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatMessageReply',
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
    },
    message: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const { state } = useStore()
    const { $encryption, $fire } = useContext()
    const userId = computed(() => state.user.data.uid)

    const reply = ref([])
   
    watch(() => props.message, async (m) => {
      if (m && m.replyTo) {
        const snapshot = await $fire.firestore.collection("Chats").doc(props.chat.id).collection("Messages").doc(m.replyTo).get()
        reply.value = snapshot.data()
      }
    }, { immediate: true });  

    watch(reply, async (r) => {
      if (r && r.message && r.owner) {
        reply.value.message = $encryption.decrypt(reply.value.message)
        reply.value.owner = props.participants[reply.value.owner];
      }
    }, { immediate: true });  
    
    return { 
      userId,
      reply
    }
  }
})
</script>
