<template>
  <v-row
    v-if="notification.title || notification.body"
    :id="notification.id"
    v-intersect="onIntersect"
    class="align-center mt-3"
    style="border-bottom:1px solid #dedede;"
  >
    <v-col>
              <div v-if="notification.title" class="body-1" :style="!notification.seen ? 'font-weight:600' : ''">
                <span v-if="notification.type === 'friendRequest'">
                  <v-icon color="myshoutOrange">mdi-account-check</v-icon>
                </span>
                <span v-else-if="notification.type === 'checkIn'">
                  <v-icon color="myshoutOrange">mdi-checkbox-marked-circle-outline</v-icon>
                </span>
                <span v-else-if="notification.type === 'chat'">
                  <v-icon color="myshoutOrange">mdi-message</v-icon>
                </span>
                <span v-else-if="notification.title === 'kidnapping alert'">
                  <v-icon color="myshoutRed">mdi-alert</v-icon>
                </span>
                <span v-else-if="notification.title === 'accident alert'">
                  <v-icon color="myshoutRed">mdi-alert</v-icon>
                </span>
                <span v-else-if="notification.title === 'robbery alert'">
                  <v-icon color="myshoutRed">mdi-alert</v-icon>
                </span>
                <span v-else-if="notification.title === 'shout alert'">
                  <v-icon color="myshoutRed">mdi-alert</v-icon>
                </span>

                <span v-if="notification.title === 'Check-In'">
                  {{ $t('check_in') }}
                </span>
                <span v-else-if="notification.title === 'Chat Notification'">
                  {{ $t('notifications.chat_notification') }}
                </span>
                <span v-else-if="notification.title === 'New Friend Request'">
                  {{ $t('notifications.new_friend_request') }}
                </span>
                <span v-else-if="notification.title === 'Friend Request Approved'">
                  {{ $t('notifications.friend_request_approved') }}
                </span>
                <span v-else-if="notification.title === 'kidnapping alert'">
                  {{ $t('kidnapping_alert') }}
                </span>
                <span v-else-if="notification.title === 'accident alert'">
                  {{ $t('accident_alert') }}
                </span>
                <span v-else-if="notification.title === 'robbery alert'">
                  {{ $t('robbery_alert') }}
                </span>
                <span v-else-if="notification.title === 'shout alert'">
                  {{ $t('shout_alert') }}
                </span>
                <span v-else-if="notification.title === 'Checked-In'">
                  {{ $t('notifications.checked_in_title') }}
                </span>

                <span v-else>
                  {{ notification.title }}
                </span>
              </div>
              <div class="body-2" :style="!notification.seen ? 'font-weight:600' : ''">
                <span v-if="notification.body && notification.body.includes('requested to be your friend.')">
                  {{ notification.body.replace('requested to be your friend.', $t('notifications.requested_to_be_your_friend')) }}
                </span>
                <span v-else-if="notification.body && notification.body.includes('accepted your friendship.')">
                  {{ notification.body.replace('accepted your friendship.', $t('notifications.accepted_your_friendship')) }}
                </span>
                <span v-else-if="notification.body && notification.body.includes('This is an emergency alarm from')">
                  {{ emergencyBodyNotification(notification.body) }}
                </span>
                <span v-else-if="notification.body && notification.body.includes('You have been requested to check-in by')">
                  {{ notification.body.replace('You have been requested to check-in by', $t('notifications.requested_to_check_in')).replace('Contact them by phone or text message.', $t('notifications.contact_them')) }}
                </span>
                <span v-else-if="notification.body && notification.body.includes(' has checked-in.')">
                  {{ notification.body.replace(' has checked-in.', $t('notifications.has_checked_in')) }}
                </span>

                <span v-else>
                  {{ notification.body }}
                </span>
              </div>
              <div class="caption grey--text mt-2">
                {{ notification.created_at }}
              </div>
    </v-col>
    <v-col class="text-right" cols="3">
      <v-badge
        v-if="!notification.seen"
        bottom
        dot
        left
        overlap
      />
        <v-btn text color="green" v-if="notification.type === 'friendRequest'  && notification.title !== 'Friend Request Approved'" @click="approveFriendRequest(notification)">
          <span v-if="!notification.completed"><v-icon>mdi-check</v-icon></span>
        </v-btn>
        <v-btn text color="red" v-if="notification.type === 'friendRequest' && notification.title !== 'Friend Request Approved'" @click="declineFriendRequest(notification)">
          <span v-if="!notification.completed"><v-icon>mdi-delete</v-icon></span>
        </v-btn>
        <v-btn text v-else-if="notification.goTo" @click="goTo(notification.goTo)">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
    </v-col>
  </v-row>
</template>
<script>

import {
  computed,
  defineComponent,
  useContext,
  useRouter,
  useStore,
  ref,
} from '@nuxtjs/composition-api'
import {Intersect} from 'vuetify/lib/directives'

export default defineComponent({
  name: 'UserNotifications',
  middleware: 'authenticated',
  directives: { Intersect },
  props: {
    notification: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup () {
    const {
      state,
      dispatch,
    } = useStore()
    const { $system, $capacitor, $notify, i18n } = useContext()
    const router = useRouter()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)

    const loading = ref(false)

    // METHODS
    const approveFriendRequest = async (notification) => {
      // Approve friendship for requested user
      if (notification.completed) {
        return
      }
      try {
        // When YOU approve a friendship, ADD friend to me
        await dispatch('user/friends/add', {
          id: notification.meta.requestedBy,
          status: 'approved'
        }).then(async () => {
          // Update the requested BY user to be approved
          await dispatch('user/friends/update', {
            uid: notification.meta.requestedBy,
            id: notification.uid,
            status: 'approved'
          })
          // Add notification to 'requested user'
          await dispatch('user/notifications/add', {
            uid: notification.meta.requestedBy,
            title: 'Friend Request Approved',
            seen: false,
            archived: false,
            type: 'friendRequest',
            body: `@${profile.value.username} accepted your friendship.`,
          })
        })
      } catch(e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
        $system.log({
          comp: 'UserNotifications',
          msg: 'approveFriendRequest',
          val: e
        })
      } finally {
        $notify.show({ text: i18n.t('notify.success'), color: 'green' })
        // TODO: hide approve button
        await dispatch('user/notifications/update', {
          id: notification.id,
          completed: true,
          seen: true
        })
        loading.value = false
      }
    }
    const declineFriendRequest = async (notification) => {
      // decline friendship for requested user
      if (notification.completed) {
        return
      }
      try {
        await dispatch('user/notifications/update', {
          id: notification.id,
          completed: true,
          seen: true
        })
      } catch(e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
        $system.log({
          comp: 'UserNotifications',
          msg: 'declineFriendRequest',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const checkInResponse = async (notification) => {
      // Say YES I have checkedIn
      if (notification?.completed) return
      loading.value = true

      try {
        await dispatch('user/checkins/update', {
          uid: notification.uid,
          id: notification.meta.checkInId,
          responded: true,
        }).then((res) => {
          if (res !== false) {
            // Respond to user with notification
            // Get username from BODY
            let username = ''
            try {
              username = '@'+notification.body.split('@')[1]
            } catch {
              // ..
            }
            // Send response to requester
            dispatch('user/notifications/add', {
              uid: notification.meta.requestedBy,
              type: 'checkIn',
              title: 'Checked-In',
              created_at: new Date(),
              seen: false,
              archived: false,
              body: `${username} has checked-in.`,
            })

            $notify.show({ text: i18n.t('notify.success'), color: 'green' })
          }
        })
      } catch(e) {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
        $system.log({
          comp: 'UserNotifications',
          msg: 'checkIn',
          val: e
        })
      } finally {
        $notify.show({ text: i18n.t('notify.success'), color: 'green' })
        // TODO: hide approve button
        await dispatch('user/notifications/update', {
          uid: notification.uid,
          id: notification.id,
          completed: true
        })
        loading.value = false
      }
    }
    const goTo = (to) => {
      if (to !== location.pathname) {
        router.push(to)
      }
    }
    const onIntersect = (entries) => {
      const notificationId = entries[0].target.id
      const payload = { ...state.user.notifications.loaded[notificationId] }

      // Bug fix in case the object doesn't have 'seen' in it.
      if (payload['seen'] === undefined) payload.seen = true

      if (payload.seen === false) {
        payload.seen = true
        dispatch('user/notifications/update', payload)
      }
    }
    const emergencyBodyNotification = (body) => {
      let newBody = body.replace('This is an emergency alarm from', i18n.t('notifications.this_is_emergency_alarm_from'))

      if (newBody.includes('**accident alert**')) {
        newBody = newBody.replace('**accident alert**', '**'+ i18n.t('accident_alert') +'**')
      }
      if (body.includes('**kidnapping alert**')) {
        newBody = newBody.replace('**kidnapping alert**', '**'+ i18n.t('kidnapping_alert') +'**')
      }
      if (newBody.includes('**robbery alert**')) {
        newBody = newBody.replace('**robbery alert**', '**'+ i18n.t('robbery_alert') +'**')
      }
      if (newBody.includes('**shout alert**')) {
        newBody = newBody.replace('**shout alert**', '**'+ i18n.t('shout_alert') +'**')
      }

      return newBody
    }
    const deleteAllNotifications = () => {
      const loaded = state.user.notifications.loaded
      for (const i in loaded) {
        dispatch('user/notifications/update', loaded[i], {seen: true})
      }
      
      $capacitor.pushNotificationsClearBadge()
    }

    return {
      loading,
      user,
      profile,
      deleteAllNotifications,
      goTo,
      emergencyBodyNotification,
      onIntersect,
      checkInResponse,
      approveFriendRequest,
      declineFriendRequest
    }
  },
  head: {}
})
</script>
<style>
.company-list-card {
  overflow: hidden;
}

.company-product-0 {
  z-index: 2;
}

.company-product-1 {
  opacity: 0.25;
  position: absolute;
  padding-left: 5px;
}
</style>
