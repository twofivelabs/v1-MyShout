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
          <v-list-item-title>{{ $t('chats.add_friend') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 :text="$t('chats.add_friend')" />
      <ElementP :text="$t('chats.enter_pin')" />

      <v-text-field
          v-model="pin"
          type="text"
          :label="$t('form.pin')"
          autocomplete="off"
          required
      />

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
            @click="addFriendship"
        >
          {{ $t('chats.add_friend') }}
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
    const { $notify, i18n, $db } = useContext()
    const { state } = useStore()
    const router = useRouter()
    const loading = ref(false)
    const dialog = ref(false)
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const pin = ref()

    // METHODS
    const userPinExist = async () => {
      if (pin.value) {
        const hasUsers = await $db.simpleSearch('Users', 'securityPin', pin.value)
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
        $notify.show({ text: i18n.t('notify.pin_no_match'), color: 'error' })
        return
      }
      // Does user be found match the props' user?
      if (props.user.id !== foundUser[0].id) {
        return
      }

      // Add user with status of pending
      const res = await $db.save(`Users/${user.value.uid}/Friends`, {
        id: props.user.id,
        status: 'pending'
      })
      /* const res = await dispatch('user/friends/add', {
        id: props.user.id,
        status: 'pending'
      }) */
      if(res) {
        // Create notification for friended user
        console.log('Add notification to: ', props.user.id)

        await $db.save(`Users/${props.user.id}/Notifications`, {
          uid: props.user.id,
          title: i18n.t('new_friend_request'),
          body: `@${profile.value.username} ${i18n.t('requested_to_be_your_friend')}`,
          seen: false,
          archived: false,
          created_at: new Date(),
          type: 'friendRequest',
          meta: {
            requestedBy: profile.value.id
          }
        })
        /* await dispatch('user/notifications/add', {
          uid: props.user.id,
          title: i18n.t('new_friend_request'),
          body: `@${profile.value.username} ${i18n.t('requested_to_be_your_friend')}`,
          seen: false,
          archived: false,
          created_at: new Date(),
          type: 'friendRequest',
          meta: {
            requestedBy: profile.value.id
          }
        }) */

        // Finish up`
        dialog.value = false
        await router.push('/profile')
        $notify.show({ text: i18n.t('notify.success'), color: 'success' })
        emit('isFriend', true)

      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
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
