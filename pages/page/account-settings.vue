<template>
  <div>
    <v-app-bar color="white" class="mobileNotch" app fixed top>
      <v-app-bar-nav-icon>
        <NuxtLink to="/settings">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">
            mdi-arrow-left
          </v-icon>
        </NuxtLink>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('btn.account_settings')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container class="mt-3 mb-12 pb-12 mobileNotch px-3">
      <v-row>
        <v-col cols="12" class="">
          <ElementH3 :text="$t('security_pin_heading')" align="left" />
          <ElementP :text="$t('security_pin_description')" align="left" />
          <div class="borderInput rounded-lg text-center text-h3 pa-3" style="letter-spacing:5px !important; font-weight:900;">
            {{ profile.securityPin }}
          </div>
        </v-col>
      </v-row>
      <v-list color="transparent" rounded class="myshout px-0 mt-10">
        <v-list-item-group>
          <v-list-item three-line>
            <v-list-item-icon style="background-color:var(--v-myshoutOrange-base);">
              <v-icon color="white">mdi-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('emergency_contacts_heading') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('emergency_contacts_description') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                  input-value="true"
                  disabled
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-icon style="background-color:var(--v-myshoutGreen-base);">
              <v-icon color="white">mdi-account-supervisor</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('all_friends_header') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('all_friends_description') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                  input-value="true"
                  v-model="profile.permissions.shareLocationWithFriends"
                  @click="toggleAllFriends(profile.permissions.shareLocationWithFriends)"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <UserChangephone /> -->
      <div v-if="!profile.email" class="rounded-lg pa-3" style="border:2px solid #ddd;">
        <ElementH4 :text="$t('heading.add_email')" align="left" class="mb-4" />
        <FormsRegisterbyemail goTo="" :required="false" :preAuthWithPhone="true">
          <v-btn
              :loading="loading"
              class="text-center"
              color="primary"
              elevation="0"
              type="submit"
          >
            {{ $t('btn.save') }}
            <v-icon right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </FormsRegisterbyemail>
      </div>
      <UserChangeemail v-if="profile.email" class="mt-6" />
      <UserChangepassword v-if="profile.email" class="mt-6" />
      <v-list color="transparent" rounded class="myshout px-0 mt-10">
        <v-list-item-group>
          <v-list-item three-line @click="dialog=true">
            <v-list-item-content>
              <v-list-item-title style="color:rgb(201, 43, 43)">{{ $t('heading.delete_account') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('heading.delete_account_caption') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon right style="color:rgb(201, 43, 43)">
                mdi-arrow-right
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
    <v-dialog v-model="dialog" max-width="450">
      <v-card class="rounded-xl pa-8">
        <ElementH1 :text="$t('notify.are_you_sure')" />
        <ElementP :text="$t('notify.please_confirm_delete')" />
        <div class="pa-3">
          <v-card-actions class="justify-center">
            <v-btn
                :loading="loading"
                color="myshoutOrange"
                elevation="0"
                text
                @click="deleteAccount()"
            >
              {{ $t('btn.yes_delete') }}
            </v-btn>
            <v-btn
                :loading="loading"
                color="grey darken-1"
                text
                @click="dialog = false"
            >
              {{ $t('btn.cancel') }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  useStore,
  ref,
  computed,
  watchEffect
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'UserAccountSettingspage',
  middleware: 'authenticated',
  setup () {
    const { state, dispatch, getters } = useStore()
    const { $config, $helper } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => lodash.cloneDeep(state.user.profile))
    const loading = ref(false)
    const dialog = ref(false)

    // METHODS
    const userPinExist = async (pin) => {
      const hasUsers = await dispatch('user/search', {
        field: 'securityPin',
        operator: '==',
        term: pin,
        limit: 1
      })
      return hasUsers.length > 0
    }
    const deleteAccount = async () => {
      // Deactive User Accoount
      await dispatch('user/updateField', {
        role: {
          isActive: false,
          deleteMe: true
        }
      })
      // Sign User Out
      await dispatch('user/signOut')
    }
    const toggleAllFriends = async (val) => {
      // Save User
      await dispatch('user/updateField', {
        permissions: {
          shareLocationWithFriends: val
        }
      })
    }

    // WATCH
    watchEffect(async () => {
      // Generate NEW PIN if none-exists
      if (profile.value && profile.value.id && !profile.value.securityPin) {
        let pinExists = true
        do {
          const pin = $helper.generateStringPin()
          pinExists = await userPinExist(pin)
          if (!pinExists) {
            profile.value.securityPin = pin

            // Save User
            await dispatch('user/updateField', {
              securityPin: pin
            })
          }
        } while (pinExists)
      }
    })

    // PAGE META
    useMeta({
      title: `Account Settings ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: ''
      }]
    })

    return {
      loading,
      dialog,
      isLoggedIn,
      user,
      profile,
      toggleAllFriends,
      deleteAccount
    }
  },
  head: {}
})
</script>
