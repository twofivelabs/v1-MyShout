<template>
  <v-container class="pt-8 pl-0 pr-0">
    <v-btn @click="$router.go(-1)" :title="$t('btn.back')" class="mt-2 mx-3" small fab text>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div v-if="loading || !hasMounted">
      <v-row class="px-3">
        <v-col cols="12" md="4" sm="12">
          <v-skeleton-loader type="image"/>
        </v-col>
        <v-col cols="12" md="8" sm="12">
          <v-skeleton-loader type="heading"/>
          <v-skeleton-loader class="mt-2" type="list-item-three-line"/>
        </v-col>
      </v-row>
    </div>

    <div v-else-if="!loading && publicUser">
      <div class="text-center">
        <UserAvatar :user="publicUser" :size="120" />
        <ElementH1 v-if="publicUser.username" :text="`@${publicUser.username}`" />
        <span v-if="myFriendshipAccess.status === 'approved'" class="d-flex justify-center ">
          <ElementH4 v-if="publicUser.location.country" :text="`${publicUser.location.city} ${publicUser.location.country}`" class="gray--text" />
        </span>
        <NotificationsLastcheckedin :publicUser="publicUser" />
        <div class="d-flex justify-center my-6">
          <UserActionsSendamessagebtn v-if="myFriendshipAccess.status === 'approved'" :user="publicUser">
            <v-btn color="myshoutGreen" class="elevation-0 rounded-lg white--text mr-2" large rounded>
              {{ $t('chats.send_message') }}
            </v-btn>
          </UserActionsSendamessagebtn>
          <UserActionsbtn :user="publicUser" />
        </div>


        <div v-if="myFriendshipAccess.status !== 'approved'" class="mt-6">
          <v-chip
              v-if="myFriendshipAccess.status"
              :title="myFriendshipAccess.status"
              @click="$fetch()"
              color="myshoutOrange"
          ><v-icon class="">mdi-update</v-icon>
            {{ $t('friendship_is') }} {{ myFriendshipAccess.status }}</v-chip>
          <ElementH4 v-else align="center" :text="$t('permission.no_user_profile')"/>
        </div>
      </div>

      <v-tabs
              v-if="myFriendshipAccess.status === 'approved'"
              v-model="activeTab"
              background-color="transparent"
              class="mb-12 pb-12"
              grow
          >
            <v-tab>
              {{ $t('location') }}
            </v-tab>
            <v-tab>
              {{ $t('alerts') }}
            </v-tab>
            <v-tabs-items v-model="activeTab" class="">
              <v-tab-item>
                <div v-if="activeTab === 0">
                  <MapGmbasic v-if="friendshipAccess.isEmergency || publicUser.permissions.shareLocationWithFriends" :lat="publicUser.gps.lat" :lng="publicUser.gps.lng" />
                  <ElementH4 v-else align="center" class="my-5" :text="$t('permission.no_view_location')"/>
                </div>
              </v-tab-item>
              <v-tab-item class="pt-3">
                <UserAccountAlerts v-if="activeTab === 1" :user="publicUser" />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
    </div>
    <div v-else-if="!loading">
      <GlobalFourohfour />
    </div>
  </v-container>
</template>
<script>

import lodash from 'lodash'

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  useStore,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageUsersId',
  middleware: 'authenticated',
  watch: {
    '$route.query': '$fetch'
  },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      title,
      meta
    } = useMeta()
    const {
      $config,
      $db,
      error
    } = useContext()
    const route = useRoute()
    const loading = ref(true)

    // DEFINE CONTENT
    const hasMounted = ref(false)
    const activeTab = ref(0)
    const publicUser = ref(lodash.cloneDeep(state.user.one))
    const friendshipAccess = ref(false)
    const myFriendshipAccess = ref(false)
    const loggedInUser = computed(() => state.user.data)
    const products = ref([])
    const posts = ref([])

    // GET CONTENT
    useFetch(async () => {
      await getPageData()
    })

    // METHODS
    const getPageData = async () => {
      loading.value = true
      try {
        const publicUserRes = await $db.get(`Users/${route.value?.params?.id}`)
        if (publicUserRes) publicUser.value = lodash.cloneDeep(publicUserRes)

        // GET STATUS OF FRIENDSHIP
        const myAccessRes = await dispatch('user/friends/getMyAccess', {
          userId: loggedInUser.value?.uid,
          id: route.value?.params?.id,
        })
        if (myAccessRes) myFriendshipAccess.value = myAccessRes

        const getFriendAccess = await dispatch('user/friends/getAccess', {
          userId: loggedInUser.value?.uid,
          id: route.value?.params?.id,
        })
        if (getFriendAccess) friendshipAccess.value = getFriendAccess


        // PAGE META
        if (publicUser.value) {
          title.value = `${publicUser.value?.username} by ${$config.appTitle}`
          if (publicUser.value?.username) {
            meta.value[0] = {
              hid: 'description',
              name: 'description',
              content: publicUser.value?.username.replace(/^(.{155}[^\s]*).*/, '$1')
            }
          }
        }
      } catch {
        error({ statusCode: 404 })
      } finally {
        loading.value = false
      }
    }

    // MOUNT
    onMounted(() => {
      hasMounted.value = true
    })

    // WATCH
    watch(route, (r) => {
      if ('users-user-id' === r.name) {
        getPageData()
      }
    })

    return {
      loading,
      activeTab,
      publicUser,
      products,
      posts,
      hasMounted,
      friendshipAccess,
      myFriendshipAccess
    }
  },
  head: {}
})
</script>
<style scoped>
.v-tab {
  font-weight: 600;
}
</style>
