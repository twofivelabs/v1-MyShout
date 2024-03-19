<template>
  <v-switch
    v-model="notificationPermissionGranted"
    hide-details="true"
    :label="label"
    prepend-icon="mdi-bell"
    @click="toggleNotifications"
  />
</template>

<script>
import { defineComponent, useContext, useStore } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'NotificationsToggle',
  props: {
    label: {
      type: String,
      default: 'Notifications'
    }
  },
  setup() {
    const { state } = useStore();
    const { $notify, $system, $capacitor, $fire, $db } = useContext();

    const user = state.user.data;
    const profile = state.user.profile;
    const notificationPermissionGranted = profile.permissions.notifications;
    const isWeb = $capacitor.device()?.platform === 'web';

    const toggleNotifications = async () => {
      try {
        if (notificationPermissionGranted) {
          if (isWeb) {
            await requestWebPermissions();
          } else {
            await $capacitor.pushNotificationsRequestAndRegisterPermissions();
          }
        } else {
          await $db.save(`Users/${user.value.uid}`, {
            permissions: { notifications: false }
          })
          // await dispatch('user/updateField', { permissions: { notifications: false } });
          if (!isWeb) await $capacitor.pushNotificationsRemoveListeners();
        }
      } catch (error) {
        handleNotificationError(error);
      }
    };

    const requestWebPermissions = async () => {
      if (!window.Notification) {
        $notify.show({ text: 'Notifications not supported!', color: 'error' });
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted' && $fire.messaging) {
        await $fire.messaging.getToken();
      }

      await $db.save(`Users/${user.value.uid}`, {
        permissions: { notifications: permission === 'granted' }
      })
      //await dispatch('user/updateField', { permissions: { notifications: permission === 'granted' } });
    };

    const handleNotificationError = (error) => {
      $notify.show({ text: 'Error with your notifications.', color: 'error' });
      $system.log({ comp: 'UserToggleSettings', msg: 'requestWebPermissions', val: error });
    };

    return {
      user,
      profile,
      notificationPermissionGranted,
      toggleNotifications
    };
  }
});
</script>
