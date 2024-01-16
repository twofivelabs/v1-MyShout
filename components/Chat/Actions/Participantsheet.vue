<template>
  <div>
    <v-list-item
      v-for="(participant, index) in participants"
      :key="index"
    >
      <v-list-item-avatar @click="openBottomSheet(participant)">
        <ChatAvatar :user="participant" />
      </v-list-item-avatar>
      <v-list-item-title @click="openBottomSheet(participant)">
          {{ participant.username }}
      </v-list-item-title>
    </v-list-item>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="93vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />
          
          <v-row no-gutters class="text-center mb-10" v-if="participant">
            <v-col cols="12">
              <ChatAvatar :user="participant" :size="80"/>
            </v-col>
            <v-col cols="12" class="text-h2 pt-5 pb-2">
              {{ participant.username ? participant.username : (participant.first_name ? participant.first_name : 'No Username') }}
            </v-col>
          </v-row>  
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
  name: 'ParticipantSheet',
  directives: { Touch },
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
    const { state } = useStore()
    const user = computed(() => state.user);
    
    const showBottomSheet = ref(false)
    const participant = ref({})

    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    const openBottomSheet = (p) => {
      participant.value = p
      showBottomSheet.value = true
    }

    return {
      showBottomSheet,
      user,
      participant,
      swipe,
      openBottomSheet
    }
  }
})
</script>
