<template>
  <div>
    <v-row class="pa-4 mobileNotch">
      <v-col class="text-right">
        <UserFriendsbtn style="display:inline-block;" />
        <!--<NotificationsButton style="display:inline-block;">
          <v-icon v-if="hasNotifications" color="myshoutRed" class="grey lighten-2 pa-3 rounded-lg">mdi-bell-ring</v-icon>
          <v-icon v-else color="myshoutDarkGrey" class="grey lighten-2 pa-3 rounded-lg">mdi-bell</v-icon>
        </NotificationsButton>-->
      </v-col>
    </v-row>
    <div v-if="profile">
      <div class="text-center">
        <UserProfileavatar :user="profile" :size="120" />
        <ElementH1 v-if="profile.username" :text="`@${profile.username}`" />
        <ElementH4 v-if="profile.location.country" :text="`${profile.location.city} ${profile.location.country}`" class="gray--text" />
      </div>
      <v-tabs
          v-model="activeTab"
          show-arrows
          center-active
          grow
          background-color="transparent"
          class="mb-15"
          style="max-width:800px; margin:0 auto;"
      >
        <v-tab>
          {{ $t('alerts') }}
        </v-tab>
        <v-tab>
          {{ $t('emergency') }}
        </v-tab>
        <v-tab>
          {{ $t('friends') }}
        </v-tab>
        <v-tab>
          {{ $t('settings') }}
        </v-tab>
        <v-tabs-items v-model="activeTab" class="">
          <v-tab-item>
            <UserAccountAlerts  v-if="activeTab === 0" :user="profile" />
          </v-tab-item>
          <v-tab-item>
            <UserAccountEmergency  v-if="activeTab === 1" />
          </v-tab-item>
          <v-tab-item>
            <UserAccountFriends  v-if="activeTab === 2" />
          </v-tab-item>
          <v-tab-item>
            <UserAccountSettings  v-if="activeTab === 3"  />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProfilePage',
  middleware: 'authenticated',
  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  setup () {
    const {
      state,
      getters,
    } = useStore()
    const {
      $config
    } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const profile = computed(() => state.user.profile)
    const user = computed(() => state.user.data)
    const hasNotifications = computed(() => state.user.notifications.hasNotifications)

    // DEFINE CONTENT
    const activeTab = ref()

    // META
    useMeta({
      title: `${$config.appTitle} Account`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `${$config.appTitle}`
      }]
    })

    return {
      state,
      activeTab,
      isLoggedIn,
      profile,
      user,
      hasNotifications,
    }
  },
  // REQUIRED FOR NUXT 2
  head: {}
})
</script>
<style scoped>
.v-slide-group__content {
  border-bottom:1px solid #ccc;
}
>>> .bottom-sheet {
  align-self: flex-end;
}
</style>
