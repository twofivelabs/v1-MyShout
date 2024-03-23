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
          <v-list-item-title>{{ $t('request_safe_check_in') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 :text="$t('request_safe_check_in')" />
      <ElementP :text="$t('confirm_they_are_safe')" />
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
            @click="save"
        >
          {{ $t('btn.confirm_request') }}
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
    const { $system, $notify, $db, i18n } = useContext()
    const { state } = useStore()
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
      loading.value = true
      try {
        // Add A Checkin
        await $db.save(`Users/${props.user.id}/CheckIns`, {
          userId: props.user.id,
          requestedBy: loggedInUser.value.uid
        }).then((res) => {
          if (res !== false) {
            dialog.value = false
            checkAddId.value = res.id || null
            $notify.show({ text: i18n.t('notify.success'), color: 'green' })
          }
        })


        // Add A Notification
        // TODO: include body to be translated
        await $db.save(`Users/${props.user.id}/Notifications`, {
          uid: props.user.id,
          title: 'Check-In',
          body: `You have been requested to check-in by @${loggedInProfile.value.username}. Contact them by phone or text message.`,
          goTo: '/',
          type: 'checkIn',
          seen: false,
          archived: false,
          // created_at: new Date(),
          meta: {
            checkInId: checkAddId.value,
            requestedBy: loggedInUser.value.uid
          }
        })
      } catch(e) {
        $system.log({ comp: 'UserActionsRequestsafecheckinbtn', msg: 'save', val: e })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
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
