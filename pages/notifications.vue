<template>
  <div>
    <v-app-bar color="transparent" class="mobileNotch elevation-0 appBarHeight" app fixed top>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('notifications.heading')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <NotificationsClearbtn :filters="filters" @filtersChanged="updateFilters"/>
    </v-app-bar>

    <v-row class="pt-10 px-5">
      <v-col cols="12" v-if="loading">
        <v-skeleton-loader v-for="x of 4" :key="`skeleton-${x}`" width="100%" max-height="50" type="text" class="mb-6" />
      </v-col>
      <v-col cols="12" v-else>
        <div v-if="filteredNotifications.length > 0">
          <div v-for="(notification, index) in filteredNotifications" :key="index">
            <UserNotifications :notification="notification" />
          </div>
          <div class="mt-5 text-center">
            <v-btn 
              text
              @click="archiveNotifications" 
            >
            {{ $t('notifications.archive_all') }}
            </v-btn>
          </div>
        </div>
        <div v-else class="mt-10">
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
    const { state, dispatch } = useStore()
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

    const archiveNotifications = () => {
      console.log("Archiving", filteredNotifications.value)
      filteredNotifications.value.map(async (notification) => {
        await dispatch('user/notifications/update', {
          id: notification.id,
          archived: true
        })
      })
    }

    return {
      user,
      loading,
      filters,
      filteredNotifications,
      updateFilters, archiveNotifications
    }
  },
})
</script>
