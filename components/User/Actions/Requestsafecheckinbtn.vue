<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon >mdi-account-check</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Request safe check-in</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 text="Request safe check-in" />
      <ElementP text="We will send an alert to confirm they are safe." />
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
          Confirm Request
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserActionsRequestsafecheckinbtn',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $system, $notify } = useContext()
    const { dispatch, state } = useStore()
    const loggedInUser = computed(() => state.user.data)
    const loggedInProfile = computed(() => state.user.profile)
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const chat = ref()
    const dialog = ref(false)
    const form = ref({})
    const checkAddId = ref()

    // METHODS
    const save = async () => {
      try {
        loading.value = true
        // Add A Checkin
        await dispatch('user/checkins/add', {
          userId: props.user.id,
          requestedBy: loggedInUser.value.uid
        }).then((res) => {
          if (res !== false) {
            dialog.value = false
            checkAddId.value = res.id
            $notify.show({ text: 'Successfully sent', color: 'green' })
          }
        })
        // Add A Notification
        await dispatch('user/notifications/add', {
          // userId: props.user.id,
          uid: props.user.id,
          title: 'Check-In',
          body: `You have been requested to check-in by @${loggedInProfile.value.username}`,
          goTo: '/',
          type: 'checkIn',
          meta: {
            checkInId: checkAddId.value,
            requestedBy: loggedInUser.value.uid
          }
        })
      } catch(e) {
        $system.log({
          comp: 'UserActionsRequestsafecheckinbtn',
          msg: 'save',
          val: e
        })
        $notify.show({ text: 'Error sending request', color: 'red' })
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
      save,
    }
  }
})
</script>
