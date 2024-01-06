<template>
  <div>
    <v-app-bar color="transparent" class="mobileNotch elevation-0 appBarHeight" app fixed top>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('chats.page_h1')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
      <UserFriendsbtn class="mr-2" />
      <ChatNewchatbtn />
    </v-app-bar>
    <v-container class="pt-4 pb-12 mt-7">
      <v-row class="pa-6" v-if="loading">
        <v-col>
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
          <v-skeleton-loader width="100%" max-height="50" type="text" class="mb-6" />
        </v-col>
      </v-row>
      <template v-if="chatList && chatList.length === 0">
        <div class="text-center pa-10 grey--text">
          {{ $t('chats.no_chats') }}
        </div>
      </template>
      <v-list two-line class="pb-9">
        <template v-for="item in chatList2">
          <v-list-item v-if="item && (!Array.isArray(item))" :key="item.id">
            <NuxtLink :to="`/chats/chat/${item.id}`">
              <ChatTopavatar :chat="item" class="mr-3" />
            </NuxtLink>
            <NuxtLink :to="`/chats/chat/${item.id}`" style="width:100%;" color="myshoutDarkGrey">
              <v-list-item-content>
                <v-list-item-title class="myshoutDarkGrey--text"><ChatUsername :chat="item" :loggedInUser="user" /></v-list-item-title>
                <v-list-item-subtitle>
                  <v-badge v-if="item.seen && !item.seen.includes(user.uid)" dot inline color="myshoutRed">
                    <div>{{ item.lastMessage }}</div>
                  </v-badge>
                  <div v-else>{{ item.lastMessage }}</div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </NuxtLink>
            <v-list-item-action class="mr-3">
              <ChatActionsbtn :chatId="item.id" />
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  useStore,
  ref, useContext, watchEffect
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatsIndex',
  middleware: 'authenticated',
  setup() {
    const { state, commit, dispatch } = useStore()
    const { $system, $fire, $capacitor } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const chatList2 = computed(() => state.chats.all)
    const loading = ref(false)

    // DEFINE
    const chatList = ref([])
    const showBottomSheet = ref(false)
    const sheetData = ref({})

    // METHODS
    const setSheetData = (data) => {
      sheetData.value = data
      showBottomSheet.value = true
    }
    const getChats = async () => {
      loading.value = true
      try {
        $fire.firestore
            .collection('Chats')
            .where('participants', 'array-contains', user.value.uid)
            .onSnapshot((docs) => {
              commit('chats/SET_ALL', []) // RESET CHATS TO ZERO, Used when removing
              docs.forEach((doc) => {
                chatList.value = []
                const data = doc.data()
                data.id = doc.id
                commit('chats/PUSH_TO_ALL', data)
                chatList.value.push(data)
              })
            })
      } catch(e) {
        $system.log({
          comp: 'ChatsIndex',
          msg: 'getChats',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (user.value.uid) {
        getChats()

        setTimeout(() => {
          //Do not initiate AdMob if the user's role is Admin
          if (profile.value.role.isAdmin) return;

          $capacitor.AdMob_init()
          $capacitor.AdMob_banner()

        }, 2500)
      }
    })

    watchEffect(() => {
      setTimeout(() => {
        if(chatList2.value.length === 0) {
          dispatch('user/updateField', {
            has: {
              messages: false
            }
          })
        }
      }, 3000)
    })

    return {
      loading,
      user,
      showBottomSheet,
      sheetData,
      chatList,
      state,
      chatList2,
      setSheetData,
    }
  }
})
</script>
<style scoped>
.v-list-item .v-list-item__title {
  font-size:1.25rem;
}
.theme--light.v-list {
  background:transparent;
}
</style>
