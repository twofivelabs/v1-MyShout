<template>
  <div style="margin-top:65px;">
    <ChatMessage :message="message" :chat="chat" :owner="participants[message.owner]" :participants="participants" class="chat-message" :id="`message-${message.id}`" />
    <div v-for="(reply,index) in replies" :key="`reply-${index}`">
      {{ reply }}
      <!--<ChatMessage :message="reply" :chat="chat" :owner="participants[reply.owner]" :participants="participants" class="chat-message" :id="`message-${reply.id}`" @reply="null" />-->
    </div>
  </div>  
</template>

<script>
import {
  defineComponent,
  useStore,
  computed,
  ref,
  watch,
  useContext
} from '@nuxtjs/composition-api'

import moment from 'moment'

export default defineComponent({
  name: 'MessageHistory',
  directives: { Touch },
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
    owner: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const {  $fire, $encryption } = useContext();
    const { state } = useStore()
    const user = computed(() => state.user);

    const showBottomSheet = ref(false)
    const replies = ref([])

    const getReadStatusIcon = (chat, message) => {
      const totalParticipantsExcludingSender = chat.participants.length - 1;
      const seenCountExcludingSender = message.seen.filter(uid => uid !== message.owner).length;

      if (seenCountExcludingSender  === 0) {
        return 'mdi-eye-off'; // icon when no one has read
      } else if (seenCountExcludingSender < totalParticipantsExcludingSender) {
        return 'mdi-eye'; // icon when partially read
      } else {
        return 'mdi-eye-check'; // icon when fully read
      }
    };

    const loadReplies = async () => {
      try {
        replies.value = []

        if (!props.message.replyTo) return;

        const response = await $fire.firestore
          .collection(`Chats/${props.chat.id}/Messages`)
          .where('replies', 'array-contains', props.message.replyTo)
          .orderBy('created_at', 'asc')
          .get()

          console.log("response", response)

        response.forEach(doc => {
          replies.value.push({
            id: doc.id,
            ownerData: props.participants.value[doc.owner],
            message: doc.message ? $encryption.decrypt(doc.message) : '',
            ...doc.data()
          })
        })  
      } catch (e) {
        console.log("Error loading replies", e)
      }
    };
    
    watch([() => props.message, () => props.chat], ([newMessage], [oldMessage]) => {
      if (newMessage !== oldMessage) {
        loadReplies()
      }
    }, { immediate: true }) 

    return {
      moment,
      user,
      replies,
      showBottomSheet,
      getReadStatusIcon
    }
  }
})
</script>