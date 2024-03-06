<template>
  <v-row style="margin:65px 0 0;padding:0;">
    <v-col cols="12" v-for="(reply,index) in thread" :key="`reply-${index}`">
      <ChatMessage :thread="true" :message="reply" :chat="chat" :owner="participants[reply.owner]" :participants="participants" class="chat-message" :id="`message-${reply.id}`" />
    </v-col>
  </v-row>
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
import { Touch } from 'vuetify/lib/directives'
export default defineComponent({
  name: 'MessageThread',
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
    const thread = ref([])

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
        thread.value = [];

        if (!props.message.replyTo) return;

        const replyToRef = $fire.firestore.collection(`Chats/${props.chat.id}/Messages`).doc(props.message.replyTo);
        const replyTo = await replyToRef.get();

        if (!replyTo.exists) {
          console.log("Original message does not exist.");
          return;
        }

        thread.value.push({
          id: replyTo.id,
          ownerData: props.participants[replyTo.data().owner],
          ...replyTo.data(),
          message: replyTo.data().message ? $encryption.decrypt(replyTo.data().message) : ''
        });

        console.log("Thread", thread.value)

        const repliesPromises = replyTo.data().replies.map(docId => $fire.firestore.collection(`Chats/${props.chat.id}/Messages`).doc(docId).get());
        const repliesDocs = await Promise.all(repliesPromises);
        console.log("repliesDocs", repliesDocs)

        repliesDocs.forEach(response => {
          if (!response.exists) return; // Skip if the document doesn't exist

          thread.value.push({
            id: response.id,
            ownerData: props.participants[response.data().owner],
            ...response.data(), // having this afterwards was overriding the encryption
            message: response.data().message ? $encryption.decrypt(response.data().message) : ''
          });
        });

        console.log("Thread", thread.value);

      } catch (e) {
        console.log("Error loading replies", e);
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
      thread,
      showBottomSheet,
      getReadStatusIcon
    }
  }
})
</script>
