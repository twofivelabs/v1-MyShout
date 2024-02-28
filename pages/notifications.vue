<template>
  <div>
    <v-app-bar color="transparent" class="mobileNotch elevation-0 appBarHeight" app fixed top>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('notifications.heading')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <NotificationsClearbtn />
    </v-app-bar>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NotificationsPage',
  middleware: 'authenticated',
  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  setup () {
    const { state, getters } = useStore()

    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const hasNotifications = computed(() => state.user.profile.has.notifications)

    return {
      isLoggedIn,
      user,
      hasNotifications,
    }
  },
})
</script>