<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add friend</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 text="Add friend" />
      <ElementP text="Enter in your friend's PIN" />

      <v-text-field
          v-model="pin"
          type="text"
          label="PIN"
          autocomplete="off"
          required
      />

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
            @click="addFriendship"
        >
          Add Friend
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  defineComponent,
  ref, useStore,
  useRouter, useContext, computed,
  // computed,
} from '@nuxtjs/composition-api'

/**
 * TODO: We could add middleware to authenticate friendship
 */
export default defineComponent({
  name: 'UserActionsAddasfriendbtn',
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
    const { dispatch, state } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const dialog = ref(false)
    const profile = computed(() => state.user.profile)
    const pin = ref()

    // METHODS
    const userPinExist = async () => {
      if (pin.value) {
        const hasUsers = await dispatch('user/search', {
          field: 'securityPin',
          operator: '==',
          term: pin.value,
          limit: 1
        })
        if (hasUsers.length > 0) {
          return hasUsers
        }
      }
      return false
    }
    const addFriendship = async () => {
      const foundUser = await userPinExist()

      // Error handling
      if (!foundUser) {
        $notify.show({ text: 'This PIN does not match', color: 'error' })
        return
      }
      // Does user be found match the props' user?
      if (props.user.id !== foundUser[0].id) {
        return
      }

      // Add user with status of pending
      const res = await dispatch('user/friends/add', {
        id: props.user.id,
        status: 'pending'
      })
      if(res) {
        // Create notification for friended user
        console.log('Add notification to: ', props.user.id)
        await dispatch('user/notifications/add', {
          uid: props.user.id,
          title: 'New Friend Request',
          body: `@${profile.value.username} requested to be your friend.`,
          type: 'friendRequest',
          meta: {
            requestedBy: profile.value.id
          }
        })

        // Finish up`
        dialog.value = false
        await router.push('/profile')
        $notify.show({ text: 'Success', color: 'success' })
        emit('isFriend', true)

      } else {
        $notify.show({ text: 'Error, try again', color: 'error' })
      }
    }

    return {
      loading,
      dialog,
      pin,
      addFriendship,
    }
  }
})
</script>
