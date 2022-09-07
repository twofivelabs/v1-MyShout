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
          <v-list-item-title>Remove as friend</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 text="Remove as friend" />
      <ElementP text="Please confirm you wish to remove as a friend." />

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
            @click="removeFriendship"
        >
          Remove As Friend
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
    const { $notify } = useContext()
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
        $notify.show({ text: 'Success', color: 'success' })
        emit('isFriend', false)
      } else {
        $notify.show({ text: 'Error, try again', color: 'error' })
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
