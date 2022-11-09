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
            <audio v-if="!message.audioExpired" controls preload="metadata" style="min-width:220px">
              <source :src="`${message.audioUrl}`">
            </audio>
            <div v-else class="text-center" style="font-size:11px;font-style:italic;padding:2vh 0">Audio Clip Has Expired</div>
          </div>
          <div v-if="message.image">
            <v-bottom-sheet v-model="showMedia" style="box-shadow:none !important;" :hide-overlay="true" class="elevation-0" :scrollable="false" width="100%" max-width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-img :src="`${message.image}`" v-bind="attrs" v-on="on" />
              </template>

              <div style="margin-bottom:45%;">
                <v-img :src="`${message.image}`" class="elevation-12 rounded-lg mx-1" />
                <div class="text-center">
                  <v-btn @click="showMedia = !showMedia" color="primary" class="mt-n7" fab>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-bottom-sheet>
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
  defineComponent,
  computed,
  useStore,
  ref
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
    const showMedia = ref(false)

    // DEFINE CONTENT

    return {
      user,
      userId,
      showMedia
    }
  }
})
</script>
<style >
.v-dialog {
  box-shadow: none !important;
}
</style>
