<template>
  <div>
    <v-app-bar color="white" class="mobileNotch appBarHeight" app fixed top>
      <v-app-bar-nav-icon>
        <v-btn to="/profile" text color="transparent">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('settings')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-container class="px-0 pt-4 mt-8 mb-12 pb-12 mobileNotch">
      <v-row v-if="loading">
        <v-col>
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
        </v-col>
      </v-row>

      <div class="d-flex justify-center">
        <UserDarkmode class="mx-2" />
      </div>

      <v-list three-line rounded color="transparent" class="myshout">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon style="background-color:var(--v-myshoutOrange-base);">
              <v-icon>mdi-google-maps</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('btn.location_permissions') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('sharing_your_location_sub') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <MapLocationtoggle label="" class="mx-2" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon style="background-color:var(--v-myshoutGreen-base);">
              <v-icon>mdi-message-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('btn.notification_permissions') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('receive_notifications_sub') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <NotificationsToggle label="" class="mx-2" />
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list rounded color="transparent" class="myshout">
          <v-list-item-group>
            <v-list-item @click="$router.push('/page/account-settings')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.account_settings') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/about-us')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.about_us') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/language')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.language') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/help-center')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.help_center') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/faq')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.frequent_questions') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/contact')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.feedback') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/page/privacy')">
              <v-list-item-content>
                <v-list-item-title>{{ $t('btn.privacy_terms') }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-container>
  </div>
</template>
<script>

import {
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SettingsPage',
  middleware: 'authenticated',
  setup () {
    const loading = ref(false)

    // DEFINE CONTENT
    const users = ref([])

    // METHODS

    return {
      loading,
      users,
    }
  }
})
</script>
