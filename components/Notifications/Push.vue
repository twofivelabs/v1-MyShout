<template>
  <div/>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'


// TODO: REMOVE THIS FILE ENTIRELY
export default defineComponent({
  name: 'NotificationsPush',
  setup () {
    const { state } = useStore()
    const {
      $db,
      $fire,
      $system,
      $notify,
      $capacitor,
      $ttlStorage
    } = useContext()
    const user = computed(() => state.user.profile)

    // DEFINE CONTENT
    const listenersStarted = ref(false)
    const permissionGranted = ref(false)
    const notificationWebToken = ref()
    const loading = ref(false)
    const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

    // METHODS
    const requestPermission = async () => {
      try {
        if (Notification) {
          const permission = await Notification.requestPermission()
          permissionGranted.value = permission === 'granted'
        } else {
          if (isMobile) {
            permissionGranted.value = await $capacitor.pushNotificationsRequestAndRegisterPermissions()
          }
        }
      } catch (e) {
        $system.log({ comp: 'NotificationsPush', msg: 'requestPermission', val: e })
      }
    }
    const startListeners = () => {
      startOnMessageListener()
      listenersStarted.value = true
    }
    const startOnMessageListener = () => {
      console.log('STICKY: startOnMessageListener')
      try {
        if ($fire.messaging) {
          console.log('STICKY: Start onMessage')
          $fire.messaging.onBackgroundMessage((payload) => {
            console.log('STICKY: onBackgroundMessage', payload)
          })
          $fire.messaging.onMessage((payload) => {
            console.log('STICKY: We have a message', payload)
            /*
              payload.notification.title
              payload.notification.body
              payload.notification.image
              payload.notification.data.goTo
             */
            const snack = {
              title: payload.notification.title,
              text: payload.notification.body,
              color: payload.notification.body || 'blue'
            }
            if (payload.data && payload.data.goTo) {
              snack.goTo = payload.data.goTo
            }
            $notify.show(snack)
            $system.log({ comp: 'ProductFavouriteBtn', msg: 'Message received', val: payload })
          })
        }
      } catch (e) {
        $system.log({ comp: 'startOnMessageListener', msg: 'onMessage', val: e.message })
      }
    }
    const getIdToken = async () => {
      // TODO: Clean this up to work for WEB too

      loading.value = true
      if(user.value.notificationWebToken) {
        notificationWebToken.value = user.value.notificationWebToken
      } else {
        notificationWebToken.value = $ttlStorage.get('notificationWebToken')
      }

      // Get Refreshed Firebase Token
      try {
        if ($fire.messaging) {
          notificationWebToken.value = await $fire.messaging.getToken()
          $ttlStorage.set('notificationWebToken', notificationWebToken.value)
        }
      } catch (e) {
        $system.log({ comp: 'NotificationPush', msg: 'getIdToken', val: e })
        notificationWebToken.value = null
      } finally {
        loading.value = false
      }

      // If we have a token update user
      if (notificationWebToken.value) {
        await $db.save(`Users/${user.value.uid}`, {
          notificationWebToken: notificationWebToken.value
        })
        /* await dispatch('user/updateField', {
          notificationWebToken: notificationWebToken.value
        }) */
      }
    }

    /*const sendTestMessage = () => {
      try {
        setTimeout(() => {
          // wait 5 seconds, so you have time to switch away from the page to test the service-worker
          $fire.functions.httpsCallable('sendTestPushMessage')({
            token: idToken.value
          })
        }, 5000)
      } catch (e) {
        $system.log('NotificationPush > sendTestMessage')
      }
    }*/

    // MOUNT
    onMounted(() => {
      setTimeout(async () => {
        await startListeners()
        await requestPermission()
        await getIdToken()
      }, 2000)
    })
  }
})
</script>
