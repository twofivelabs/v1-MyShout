<template #activator="{ isActive, props }">
<div class="reactions-display pa-0 align-center justify-end" style="margin-top:-5px;">
  <div v-if="!message.deleted && reactions.length">
     <template>
      <div v-for="reaction in reactions" :key="reaction.emoji" class="reaction-item">
        <span>{{ reaction.emoji }}</span>
        <span>{{ reaction.count }}</span>
      </div>
    </template>
  </div>
  
  <v-btn icon @click="triggerEmojiMenu">
    <v-icon small>mdi-emoticon-happy-outline</v-icon>
  </v-btn>
            
  <v-menu v-if="!thread" v-model="emojiMenu" bottom right transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <div v-on="on"></div>
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <div class="py-0 d-flex justify-space-around">
          <div v-for="emoji in emojis" :key="emoji.name" @click="selectEmoji(emoji)" class="px-2">
            <span class="emoji-style">{{ emoji.value }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</div>
</template>

<script>
import {
  defineComponent,
  useStore,
  useContext,
  computed,
  ref, watch,
} from '@nuxtjs/composition-api'
   
  import firebase from 'firebase';
  import 'firebase/functions';
  
  export default defineComponent({
    name: 'ChatMessageReactions',
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
      thread: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    setup(props) {
      const { $fire } = useContext()
      const { state, dispatch } = useStore()
      const userId = computed(() => state.user.data.uid)
  
      const reactions = ref([])
      const emojiMenu = ref(false)
      const emojis = ref([
        { name: 'smile', value: '😀' },
        { name: 'laugh', value: '😂' },
        { name: 'love', value: '😍' },
        { name: 'sad', value: '😢' },
        { name: 'angry', value: '😡' }
      ]);
   
      const triggerEmojiMenu = () => {
        if (props.thread) return;
        emojiMenu.value = !emojiMenu.value
      }
  
      const selectEmoji = async (emoji) => {
        if (!userId && userId.value) return;

        const index = reactions.value.findIndex(reaction => reaction.emoji === emoji.value);  
        const messageRef = $fire.firestore.collection('Chats').doc(props.chat.id)
          .collection("Messages").doc(props.message.id)
        
        const reactionDoc = await messageRef.collection("Reactions").doc(userId.value).get()

        if (reactionDoc.exists) {
          if (reactionDoc.data().reaction === emoji.name) {
            await dispatch('chats/messages/updateField', {
              chatId: props.chat.id,
              id: props.message.id,
              data: {
                reactions: { [emoji.name]: firebase.firestore.FieldValue.increment(-1) }
              }
            })

            await messageRef.collection("Reactions").doc(userId.value).delete()

            if (index !== -1) {
              reactions.value[index].count -= 1;
              if (reactions.value[index].count === 0) reactions.value.splice(index, 1)
            }
          }

          return;
        }

        await dispatch('chats/messages/updateField', {
          chatId: props.chat.id,
          id: props.message.id,
          data: {
            reactions: { [emoji.name]: firebase.firestore.FieldValue.increment(1) }
          }
        })
        
        await messageRef.collection("Reactions").doc(userId.value).set({reaction: emoji.name, created_at: new Date()})
  
        if (index !== -1) reactions.value[index].count += 1;
        else reactions.value.push({ emoji: emoji.value, count: 1 });
        
        emojiMenu.value = false;
      }
    
      watch(() => props.message.reactions, (newReactions) => {
        if (newReactions) {
          reactions.value = Object.entries(newReactions)
            .filter(([, count]) => count > 0)
            .map(([name, count]) => {
              const emojiObj = emojis.value.find(emoji => emoji.name === name);
              return {
                emoji: emojiObj ? emojiObj.value : '',
                count: count
              };
            });
        } else {
          reactions.value = [];
        }
      }, { deep: true, immediate: true });
  
      return {
        emojiMenu, triggerEmojiMenu, 
        emojis, selectEmoji, reactions,
      }
    }
  })
  </script>
  <style>
    
  .emoji-style {
    cursor: pointer;
    font-size: 18px;
  }
  
  .reactions-display {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4px; /* Adjust based on your layout */
  }
  
  .reaction-item {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    font-size: 0.75rem; /* Small font size for emoji and count */
    white-space: nowrap;
  }
  
  
  </style>
  