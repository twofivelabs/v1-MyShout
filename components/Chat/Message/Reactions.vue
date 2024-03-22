<template #activator="{ isActive, props }">
<div class="reactions-display pa-0 align-center justify-end" style="margin-top:-5px;">
  <div v-if="message.reactions">
     <template>
      <template v-for="[emoji, count] of Object.entries(message.reactions)" >
        <span v-if="count > 0" :key="emoji" class="reaction-item">
          <span>{{ emojisObj[emoji] }}</span>
          <span>{{ count }}</span>
        </span>
      </template>
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
  ref,
  //watch,
} from '@nuxtjs/composition-api'
import Vue from 'vue'
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
      const { $db } = useContext()
      const { state } = useStore()
      const userId = computed(() => state.user.data.uid)
      const reactions = ref([])
      const emojiMenu = ref(false)
      const emojisObj = {
          smile: '😀' ,
          laugh: '😂' ,
          love: '😍' ,
          sad: '😢' ,
          angry: '😡'
      }
      const emojis = ref([
        { name: 'smile', value: '😀' },
        { name: 'laugh', value: '😂' },
        { name: 'love', value: '😍' },
        { name: 'sad', value: '😢' },
        { name: 'angry', value: '😡' }
      ])
      const defaultReactions = {
        smile: 0,
        laugh: 0,
        love: 0,
        sad: 0,
        angry: 0
      }

      const triggerEmojiMenu = () => {
        if (props.thread) return;
        emojiMenu.value = !emojiMenu.value
      }

      const selectEmoji = async (emoji) => {
        if (!userId && userId.value) return
        let previousReactionEmoji
        let newReactionEmoji = emoji.name
        const adjustedReactions = {
          [newReactionEmoji]: $db.fire().increment(1)
        }

        const userReactionToMessagePath = `Chats/${props.chat.id}/Messages/${props.message.id}/Reactions/${userId.value}`
        const messagePath = `Chats/${props.chat.id}/Messages/${props.message.id}`

        // If there was no reactions map on the object add it
        if (!props.message.reactions) {
          //eslint-disable-next-line vue/no-mutating-props
          props.message.reactions = defaultReactions
        }

        // Check Reaction of message
        const userMessageReaction = await $db.get(userReactionToMessagePath)
        try {
          previousReactionEmoji = userMessageReaction.reaction
          if (userMessageReaction && (userMessageReaction.reaction === newReactionEmoji)) {
            // Do nothing, because it's already marked as the same reaction
            console.log('SAME REACTION')
            return
          }
          // New Reaction
          if (userMessageReaction) {
            // Remove previous reaction on UI
            const previousReactionCount = props.message.reactions[previousReactionEmoji] - 1
            Vue.set(props.message.reactions, previousReactionEmoji, previousReactionCount)
            // This is for adjusting the DB query later
            adjustedReactions[previousReactionEmoji] = $db.fire().increment(-1)
          }
        } catch (e) {
          console.log('STICKY: REACTION Error > userMessageReaction: ', e)
        }

        try {
          // Update reaction on UI
          if (props.message.reactions[newReactionEmoji] === 0) {
            Vue.set(props.message.reactions, newReactionEmoji, 1)
          } else {
            const newReactionCount = props.message.reactions[newReactionEmoji] + 1
            Vue.set(props.message.reactions, newReactionEmoji, newReactionCount)
          }

          // Update Database Reactions
          await $db.save(userReactionToMessagePath, {
            reaction: emoji.name,
            created_at: new Date()
          }).then(() => {
            // Update message reaction counter
            $db.save(messagePath, { reactions: adjustedReactions })
          })

          emojiMenu.value = false

          /*   await $db.save(messagePath, {
            reactions: {
              [emoji.name]: $db.fire().increment(-1)
            }
          }).then(async () => {
            await $db.delete(userReactionToMessagePath)
            if (index !== -1) {
              reactions.value[index].count -= 1;
              if (reactions.value[index].count === 0) reactions.value.splice(index, 1)
            }
          })
        } catch (e) {
          console.log('STICKY: Reacting Increment -: ', e)
        } */

          /*  // Add Reaction to message
        try {
          await $db.save(messagePath, {
            reactions: {
              [emoji.name]: $db.fire().increment(1)
            }
          })
          await $db.save(userReactionToMessagePath, {
            reaction: emoji.name
          })
          if (index !== -1) reactions.value[index].count += 1
          else reactions.value.push({ emoji: emoji.value, count: 1 })

          emojiMenu.value = false

        } catch (e) {
          console.log('STICKY: Reacting Increment +: ', e)
        } */


          /* const messageRef = $db.fire().fs.collection('Chats').doc(props.chat.id)
          .collection("Messages").doc(props.message.id)
        const reactionDoc = await messageRef.collection("Reactions").doc(userId.value).get() */
          /* if (reactionDoc.exists) {
          if (reactionDoc.data().reaction === emoji.name) {
            await dispatch('chats/messages/updateField', {
              chatId: props.chat.id,
              id: props.message.id,
              data: {
                reactions: { [emoji.name]: $db.fire().fs.FieldValue.increment(-1) }
              }
            })

            await messageRef.collection("Reactions").doc(userId.value).delete()

            if (index !== -1) {
              reactions.value[index].count -= 1;
              if (reactions.value[index].count === 0) reactions.value.splice(index, 1)
            }
          }

          return;
        } */

          // await messageRef.collection("Reactions").doc(userId.value).set({reaction: emoji.name, created_at: new Date()})
        } catch (e) {
          console.log('STICKY: REACTION Error 2: ', e)
        }
      }

      /* watch(() => props.message.reactions, (newReactions) => {
        if (newReactions) {
          reactions.value = Object.entries(newReactions)
            .filter(([, count]) => count > 0)
            .map(([name, count]) => {
              const emojiObj = emojis.value.find(emoji => emoji.name === name);
              return {
                emoji: emojiObj ? emojiObj.value : '',
                count: count
              }
            })
        } else {
          reactions.value = []
        }
      }, { deep: true, immediate: true }); */

      return {
        emojiMenu, triggerEmojiMenu,
        emojis, emojisObj, selectEmoji, reactions,
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
    margin-right: 7px;
    font-size: 0.75rem; /* Small font size for emoji and count */
    white-space: nowrap;
  }


  </style>
