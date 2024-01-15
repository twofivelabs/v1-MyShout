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
      <v-row class="pa-6" v-if="isLoading">
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
        <template v-for="item in filteredChatList">
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
    const { $fire, $capacitor } = useContext()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const filteredChatList = computed(() => state.chats.all)
    const isLoading = ref(false)

    // DEFINE
    const chatList = ref([])
    const isBottomSheetVisible = ref(false)
    const bottomSheetData = ref({})

    // METHODS
    const openBottomSheet = (data) => {
      bottomSheetData.value = data
      isBottomSheetVisible.value = true
    }
    const fetchChats = async () => {
      isLoading.value = true

      try {
        // Fetch user's chats from Firestore
        const querySnapshot = await $fire.firestore
          .collection('Chats')
          .where('participants', 'array-contains', user.value.uid)
          .orderBy('lastMessageSent', 'desc')
          .get();

          if (!querySnapshot.empty) {
            const chatsData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              chatsData.push(data);
            });

            // Update Vuex state with the chat data
            commit('chats/SET_ALL', chatsData);
            chatList.value = chatsData;
          } else {
            // Handle case when there are no chat documents
            chatList.value = [];
          }  
      } catch(error) {
        // Handle specific errors and log them
        if (error.code === 'permission-denied') {
          console.error('Permission denied. User does not have access to chats.');
        } else {
          console.error('Error fetching chats:', error.message);
        }
      } finally {
        isLoading.value = false
      }
    }

    // Fetch chats when component is mounted
    onMounted(() => {
      if (user.value.uid) {
        fetchChats()

        // Do not initiate AdMob if the user's role is Admin
        setTimeout(() => {
          if (profile.value.role.isAdmin) return;

          $capacitor.AdMob_init()
          $capacitor.AdMob_banner()

        }, 2500)
      }
    })

    // Check for messages and update user's state
    watchEffect(() => {
      setTimeout(() => {
        if(filteredChatList.value.length === 0) {
          dispatch('user/updateField', {
            has: {
              messages: false
            }
          })
        }
      }, 3000)
    })

    return {
      isLoading,
      user,
      isBottomSheetVisible,
      bottomSheetData,
      chatList,
      state,
      filteredChatList,
      openBottomSheet,
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
