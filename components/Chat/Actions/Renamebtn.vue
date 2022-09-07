<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" @click="getChat" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon >mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Rename Chat</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 text="Rename Chat" />
      <v-card-text class="mt-5">
        <v-text-field v-model="form.title" label="Chat Name"/>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
            text
            @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
            color="primary"
            class="elevation-0"
            @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'ChatActionsRenamebtn',
  props: {
    chatId: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  setup(props) {
    const { $system } = useContext()
    const { dispatch } = useStore()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const chat = ref()
    const dialog = ref(false)
    const form = ref({})

    // METHODS
    const getChat = async () => {
      try {
        loading.value = true
        await dispatch('chats/getOne', props.chatId).then((res) => {
          if (res !== false) {
            chat.value = res
            form.value = lodash.cloneDeep(res)
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatActions',
          msg: 'getChat',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const save = async () => {
      try {
        loading.value = true
        await dispatch('chats/update', form.value).then((res) => {
          if (res !== false) {
            dialog.value = false
          }
        })
      } catch(e) {
        $system.log({
          comp: 'ChatActions',
          msg: 'Rename > Save',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      chat,
      showBottomSheet,
      dialog,
      form,
      getChat,
      save,
    }
  }
})
</script>
