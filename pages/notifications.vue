<template>
  <div>
    <v-row class="pa-4 mobileNotch">
      <v-col class="text-right">
        <NotificationsClearbtn @filtersChanged="updateFilters"/>

      </v-col>
    </v-row>

    <v-row class="pt-10 px-5">
      <v-col cols="12" v-if="loading">
        <v-skeleton-loader v-for="x of 4" :key="`skeleton-${x}`" width="100%" max-height="50" type="text" class="mb-6" />
      </v-col>
      <v-col cols="12" v-else>
        <div v-if="filteredNotifications.length > 0">
          <div v-for="(notification, index) in filteredNotifications" :key="index">
            <UserNotifications :notification="notification" />
          </div>
        </div>
        <div v-else>
          <ElementH4 align="center" :text="$t('notifications.caught_up')"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  useStore,
  ref,
} from '@nuxtjs/composition-api'

import {orderBy, filter} from 'lodash'

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
    const { state } = useStore()
    const user = computed(() => state.user.data)


    const loading = ref(false)
    const allNotifications = computed(() => {
      const loaded = state.user.notifications.all
      return orderBy(loaded, ['seconds'], ['desc'])
    })

    const filters = ref({
      alert: true,
      friendRequest: true,
    })

    const filteredNotifications = computed(() => {
      // Apply filters to notifications
      return filter(allNotifications.value, (notification) => {
        if (notification.type === 'alert' && filters.value.alert) {
          return true
        }
        if (notification.type === 'friendRequest' && filters.value.friendRequest) {
          return true
        }

        return false
      })
    })

    const updateFilters = (f) => filters.value = f;

    return {
      user,
      loading,
      filteredNotifications,
      updateFilters
    }
  },
})
</script>
