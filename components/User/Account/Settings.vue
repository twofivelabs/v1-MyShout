<template>
  <div>
    <v-list color="transparent" rounded class="myshout">
      <v-list-item-group>
        <v-list-item
            v-if="state.user.profile.role.isAdmin || state.user.profile.role.isVendor || state.user.profile.role.isDriver"
            to="/admin"
        >
          <v-list-item-icon style="background-color:var(--v-myshoutRed-base);">
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('btn.admin') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('btn.admin_sub') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showBottomSheet('profile')">
          <v-list-item-icon style="background-color:var(--v-myshoutBlue-base);">
            <v-icon color="white">mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('btn.edit_profile') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('btn.edit_profile_sub') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/settings')">
          <v-list-item-icon style="background-color:var(--v-myshoutOrange-base);">
            <v-icon color="white">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('btn.settings_privacy') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('btn.settings_privacy_sub') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- <NotificationsButton /> -->
      </v-list-item-group>

      <v-list-item-group class="mt-8">
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('btn.log_out') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('btn.log_out_sub') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-bottom-sheet
        v-model="showSheet"
        :scrollable="true"
        class="bottom-sheet"
        inset
        max-width="700"
    >
      <v-sheet
          class="pa-5 overflow-y-auto rounded-t-xl"
          height="75vh"
          style="bottom:0; padding-bottom:180px;"
      >
        <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

        <UserProfile v-if="whichComponent === 'profile'" @swipe="swipe('Down')"/>
        <UserNotifications v-if="whichComponent === 'notifications'"/>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useStore,
  watchEffect,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'UserAccountSettings',
  middleware: 'authenticated',
  directives: { Touch },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const route = useRoute()
    const hasNotifications = computed(() => state.user.profile.has.notifications || false)

    // DEFINE CONTENT
    const sheet = ref(false)
    const showSheet = ref(false)
    const whichComponent = ref(null)
    const activeTab = ref('Settings')

    // METHODS
    const logout = () => {
      dispatch('user/signOut')
    }
    const showBottomSheet = (which) => {
      showSheet.value = true
      whichComponent.value = which
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showSheet.value = false
      }
    }

    // WATCH
    // Show the sheet if we are coming from a hash url
    watchEffect(() => {
      if (route.value && route.value.hash) {
        try {
          showBottomSheet(route.value.hash.substring(1))
        } catch {
          // ... no proper hash
        }
      }
    })

    return {
      state,
      sheet,
      showSheet,
      activeTab,
      whichComponent,
      hasNotifications,
      swipe,
      logout,
      showBottomSheet
    }
  }
})
</script>
