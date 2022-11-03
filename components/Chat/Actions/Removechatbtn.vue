<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon color="myshoutRed">mdi-delete</v-icon>
        </v-list-item-icon>
        <v-list-item-content style="color: var(--v-myshoutRed-base);">
          <v-list-item-title>{{ $t('chats.remove_chat') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 text="Are you sure?" />
      <v-card-actions class="justify-center">
        <v-btn
            text
            @click="dialog = false"
        >
          {{ $t('btn.cancel') }}
        </v-btn>
        <v-btn
            color="error"
            class="elevation-0"
            @click="removeChat"
        >
          {{ $t('btn.yes_remove') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  defineComponent,
  ref, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatActionsRemovechatbtn',
  props: {
    chatId: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  setup(props) {
    const { dispatch } = useStore()
    const loading = ref(false)
    const dialog = ref(false)
    const router = useRouter()

    // METHODS
    const removeChat = async () => {
      await dispatch('chats/remove', props.chatId)
      dialog.value = false
      await router.push(`/chats`)
    }

    return {
      loading,
      removeChat,
      dialog,
    }
  }
})
</script>
