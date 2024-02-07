<template>
  <div>
    <v-list-item :key="`info-message-${message.id}`" @click="triggerInfoSheet">
      <v-list-item-avatar class="my-0">
        <v-icon small>mdi-information-variant-box-outline</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="text-caption">
        {{ $t('chat.info' )}}
      </v-list-item-title>
    </v-list-item>

    <v-bottom-sheet v-model="messageInfoSheet" :scrollable="true" max-width="700">
      <v-sheet height="93vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

          History

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {
  defineComponent,
  ref, 
  useStore,
  computed,
} from '@nuxtjs/composition-api'

import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'MessageHistorysheet',
  directives: { Touch },
  props: {
    message: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup() {
    const { state } = useStore()
    const user = computed(() => state.user);
    
    const messageInfoSheet = ref(false)

    const swipe = (direction) => {
      if (direction === 'Down') {
        messageInfoSheet.value = false
      }
    }

    const triggerInfoSheet = () => {
      console.log("let's see")
      messageInfoSheet.value = !messageInfoSheet.value
    }

    return {
      messageInfoSheet, triggerInfoSheet,
      user,
      swipe,
    }
  }
})
</script>
<style>

.v-list-item {
 min-height:25px;
 padding:0 20px 0 0;
}

</style>