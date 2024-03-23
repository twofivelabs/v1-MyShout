<template>
  <div>
    {{
      type === 'title'
        ? (chat.title ? chat.title : $t('chat.add_title'))
        : type === 'description'
        ? (chat.description ? chat.description : (chat.admins.includes(user.data.uid) ? `${$t('chat.add_group_description')}...` : ''))
        : ''
    }}
    <v-icon v-if="chat.admins.includes(user.data.uid)" @click="dialog = true" small>mdi-pencil</v-icon>
    <v-dialog v-model="dialog" width="500">
      <v-card class="rounded-xl pa-2">
        <v-card-text class="mt-5">
          <v-text-field v-if="type === 'title'" v-model="form.title" flat outlined/>
          <v-text-field v-else-if="type === 'description'" v-model="form.description" flat outlined/>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="dialog = false" text>
            {{ $t('btn.cancel') }}
          </v-btn>
          <v-btn
              color="primary"
              class="elevation-0"
              @click="saveChatUpdate"
          >
            {{ $t('btn.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext, useStore,
  computed,
  //watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatActionsEditchat',
  props: {
    type: {
      type: String,
      default: () => {
        return null
      }
    },
    chat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $notify, $system, i18n, $db } = useContext()
    const { state } = useStore()
    const user = computed(() => state.user);
    const loading = ref(false)
    const dialog = ref(false)
    const form = ref({
      title: props.chat.title,
      description: props.chat.description
    })

    // METHODS
    const saveChatUpdate = async () => {
      loading.value = true
      try {
        $db.save(`Chats/${props.chat.id}`, {
          title: form.value.title,
          description: form.value.description
        }).then(() => {
          //eslint-disable-next-line vue/no-mutating-props
          props.chat.title = form.value.title,
          //eslint-disable-next-line vue/no-mutating-props
          props.chat.description = form.value.description

          return dialog.value = false
        })

        /* const res = await dispatch('chats/updateField', {
          id: props.chat.id,
          title: form.value.title,
          description: form.value.description
        })
        if (res) return dialog.value = false */
      } catch(e) {
        $system.log({ comp: 'ChatActions', msg: 'Rename > Save', val: e })
        return $notify.show({ text: i18n.t('chat.error_updating'), color: 'error' })
      } finally {
        loading.value = false
      }
    }

   /*  watch(() => props.chat, (c) => {
      if (c) {
        form.value.title = c.title ? c.title : ''
        form.value.description = c.description ? c.description : ''
      }
    }, { immediate: true });
 */
    return {
      user,
      dialog,
      form,
      saveChatUpdate,
    }
  }
})
</script>
