<template>
  <div>
    <main class="mb-3">
      <div style="" :class="!(message.owner === userId) ? 'd-flex' : 'd-flex flex-row-reverse'">
        <ChatAvatar class="mx-2" v-if="message.ownerData" :user="message.ownerData" :color="`${ (message.owner === userId) ? 'primary' : 'gray' }`" />
        <div style="max-width:350px;" :class="(message.owner === userId) ? 'primary rounded-tr-0 ml-2' : 'rounded-tl-0 gray mr-2'" class="white--text break-words rounded-lg py-2 px-3">
          <div v-if="message.message" class="mb-3">
            {{ message.message }}
          </div>
          <div v-if="message.audioUrl">
            <audio controls preload="auto" style="min-width:220px">
              <source :src="`${message.audioUrl}`">
            </audio>
          </div>
          <div v-if="message.image">
              <v-img :src="`${message.image}`" />
          </div>
          <div class="caption">{{ message.created_at.toDate().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }) }}</div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatMessage',
  props: {
    color: {
      type: String,
      default: () => {
        return 'primary'
      }
    },
    message: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const { state } = useStore()
    const user = computed(() => state.user)
    const userId = computed(() => state.user.data.uid)

    // DEFINE CONTENT

    return {
      user,
      userId
    }
  }
})
</script>
