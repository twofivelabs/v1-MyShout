<template>
    <div v-if="chat && typingMessage" class="typing-indicator">
      {{ typingMessage }}
    </div>
  </template>
  
  <script>
  import { computed, defineComponent } from '@nuxtjs/composition-api';
  
  export default defineComponent({
    name: 'ChatTyping',
    props: {
      chat: {
        type: Object,
        default: () => ({}),
      },
      participants: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, { root }) {
      const user = computed(() => root.$store.state.user);
      
      const typingMessage = computed(() => {
        if (!props.chat.typing || props.chat.typing.length === 0) {
          return '';
        }
  
        const otherTypingUsers = props.chat.typing.filter(userId => userId !== user.value.data.uid);
  
        const userNames = otherTypingUsers
          .map(userId => props.participants[userId]?.username || null)
          .filter(Boolean);
  
        switch (userNames.length) {
          case 0:
            return '';
          case 1:
            return `${userNames[0]} is typing...`;
          default:
            return `${userNames.join(', ')} are typing...`;
        }
      });
  
      return {
        typingMessage,
      };
    },
  });
  </script>
  
  <style>
  .typing-indicator {
    padding: 10px;
    text-align: center;
    color: #666;
    font-size: 11px;
  }
  </style>
  