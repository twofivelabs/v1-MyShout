<template>
  <div @click="openNotifications">
    <slot>
      <v-list-item>
        <v-list-item-icon style="background-color:var(--v-myshoutGreen-base);">
          <v-icon v-if="hasNotifications" color="myshoutRed">mdi-bell-ring</v-icon>
          <v-icon v-else color="white">mdi-bell</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('notifications.heading') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('notifications.sub_heading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </slot>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="75vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:150px">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH3 align="center" :text="$t('notifications.heading')" />

          <UserNotifications @action="emittedNotificationAction" />

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'NotificationsButton',
  directives: { Touch },
  setup() {
    const {
      state, dispatch
    } = useStore()
    const { $system, $capacitor } = useContext()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const hasNotifications = computed(() => state.user.notifications.hasNotifications)

    // METHODS
    const getNotifications = async () => {
      try {
        loading.value = true
        await dispatch('user/notifications/getAll')
      } catch(e) {
        $system.log({
          comp: 'NotificationsButton',
          msg: 'Not able to get notifications',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const openNotifications = async () => {
      showBottomSheet.value = true
      await getNotifications()
      await $capacitor.pushNotificationsRemoveAllNotifications()
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }
    const emittedNotificationAction = (n) => {
      if('close' === n) {
        showBottomSheet.value = false
      }
    }

    return {
      loading,
      showBottomSheet,
      hasNotifications,
      openNotifications,
      swipe,
      emittedNotificationAction
    }
  }
})
</script>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  border: 2px solid #f0f0ef;
  background: #f9f9f9;
  margin-bottom: 15px;
}
.v-list-item__title {
  font-size: 1.1rem;
  font-weight: 600;
}
.v-list-item__subtitle {
  font-size:0.9rem;
}
.v-list-item__icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  text-align: center;
}
.v-list-item__icon .v-icon {
  font-size:33px;
  width:100%;
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right:10px;
}
</style>
