<template>
  <div>
    <v-icon class=" pa-3 rounded-lg" color="myshoutDarkGrey" @click="showUserActions">
      mdi-dots-vertical
    </v-icon>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="50vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:150px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH3 align="center" :text="$t('actions')" />

          <v-list-item-group>
            <v-list-item v-if="!$route.fullPath.includes(user.id)" class="borderButton rounded-lg mb-2" :to="`/users/user/${user.id}`">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="myshoutDarkGrey--text">{{ $t('view_profile') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <UserActionsSendamessagebtn v-if="isFriend && (friendStatus === 'approved')" :user="user" />
            <UserActionsRequestsafecheckinbtn v-if="isFriend && (friendStatus === 'approved')" :user="user" />
            <UserActionsToggleemergencycontactbtn v-if="isFriend && (friendStatus === 'approved')" :user="user" />
            <UserActionsRemoveasfriendbtn v-if="isFriend" :user="user" @isFriend="isFriendFunc" />
            <UserActionsAddasfriendbtn v-if="!isFriend" :user="user" @isFriend="isFriendFunc" />
          </v-list-item-group>

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent, onMounted,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'UserActionsbtn',
  directives: { Touch },
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { $system } = useContext()
    const { dispatch } = useStore()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const isFriend = ref(false)
    const friendStatus = ref()

    // METHODS
    const showUserActions = async () => {
      try {
        loading.value = true
        showBottomSheet.value = true
      } catch(e) {
        $system.log({
          comp: 'UserActionsbtn',
          msg: 'showUserActions',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }
    const isFriendFunc = (v) => {
      isFriend.value = v
    }

    // MOUNT
    onMounted(async () => {
      const res = await dispatch('user/friends/getOne', { id: props.user.id })
      if (res && res.id) {
        isFriend.value = true
        friendStatus.value = res.status
      }
    })

    return {
      loading,
      showBottomSheet,
      isFriend,
      friendStatus,
      showUserActions,
      swipe,
      isFriendFunc
    }
  }
})
</script>
