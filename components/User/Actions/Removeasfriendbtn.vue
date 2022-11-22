<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon color="myshoutRed">mdi-account-multiple-minus</v-icon>
        </v-list-item-icon>
        <v-list-item-content style="color: var(--v-myshoutRed-base);">
          <v-list-item-title>{{ $t('remove_friend') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 :text="$t('btn.remove_friend')" />
      <ElementP :text="$t('chats.confirm_remove_friend')" />

      <v-card-actions class="justify-center">
        <v-btn
            text
            @click="dialog = false"
        >
          {{ $t('btn.cancel') }}
        </v-btn>
        <v-btn
            color="primary"
            class="elevation-0"
            @click="removeFriendship"
        >
          {{ $t('btn.remove_friend') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  defineComponent,
  ref, useStore,
  useRouter, useContext,
  // computed,
} from '@nuxtjs/composition-api'

/**
 * TODO: We could add middleware to authenticate friendship
 */
export default defineComponent({
  name: 'UserActionsRemoveasfriendbtn',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: [
    'isFriend'
  ],
  setup(props, { emit }) {
    const { $notify, i18n } = useContext()
    const { dispatch } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const dialog = ref(false)

    // METHODS
    const removeFriendship = async () => {
      const res = await dispatch('user/friends/remove', props.user.id)
      if(res) {
        dialog.value = false
        await router.push('/profile')
        $notify.show({ text: i18n.t('notify.success'), color: 'success' })
        emit('isFriend', false)
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }

    return {
      loading,
      dialog,
      removeFriendship,
    }
  }
})
</script>
