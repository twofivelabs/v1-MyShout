<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="borderButton rounded-lg mb-2">
        <v-list-item-icon>
          <v-icon :color="(friendship && friendship.isEmergency) ? 'myshoutRed' : 'myshoutGreen'">mdi-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-content :style="`color: ${(friendship && friendship.isEmergency) ? 'var(--v-myshoutRed-base)' : 'var(--v-myshoutGreen-base)'};`">
          <v-list-item-title v-if="friendship && friendship.isEmergency">{{ $t('remove_as_emergency_contact') }}</v-list-item-title>
          <v-list-item-title v-else>{{ $t('add_as_emergency_contact') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="rounded-xl pa-8">
      <ElementH1 v-if="friendship && friendship.isEmergency" :text="$t('remove_as_emergency_contact')" />
      <ElementH1 v-else :text="$t('add_as_emergency_contact')" />
      <ElementP v-if="friendship && friendship.isEmergency" :text="$t('no_longer_receive_alerts')" />
      <ElementP v-else :text="$t('yes_longer_receive_alerts')" />

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
            @click="toggleEmergencyContact"
        >
          {{ $t('btn.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  onMounted,
  useStore,
} from '@nuxtjs/composition-api'

/**
 * TODO: We could add middleware to authenticate friendship
 */
export default defineComponent({
  name: 'UserActionsToggleemergencycontactbtn',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $notify, $system, i18n } = useContext()
    const { dispatch } = useStore()
    const loading = ref(false)
    const dialog = ref(false)

    // DEFINE
    const friendship = ref()

    // METHODS
    const getFriendship = async () => {
      try {
        loading.value = true
        await dispatch('user/friends/getOne', {
          id: props.user.id,
        }).then((res) => {
          if (res !== false) {
            friendship.value = res
          }
        })
      } catch(e) {
        $system.log({
          comp: 'UserActionsToggleemergencycontactbtn',
          msg: 'getFriendship',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const toggleEmergencyContact = async () => {
      const res = await dispatch('user/friends/updateField', {
        id: friendship.value.id,
        isEmergency: !friendship.value.isEmergency
      })
      if(res) {
        dialog.value = false
        $notify.show({ text: i18n.t('notify.success'), color: 'success' })
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        $system.log({
          comp: 'UserActionsToggleemergencycontactbtn',
          msg: 'toggleEmergencyContact',
          val: 'bad response'
        })
      }
    }

    // MOUNT
    onMounted(() => {
      getFriendship()
    })

    return {
      loading,
      dialog,
      friendship,
      toggleEmergencyContact,
    }
  }
})
</script>
