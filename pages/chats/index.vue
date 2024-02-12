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
    <v-container class="pt-4 pb-12">
      <v-row class="pa-6" v-if="isLoading">
        <v-col>
          <v-skeleton-loader v-for="x of 4" :key="`skeleton-${x}`" width="100%" max-height="50" type="text" class="mb-6" />
        </v-col>
      </v-row>
      <template v-if="chatList && chatList.length === 0">
        <div class="text-center pa-10 grey--text">
          {{ $t('chats.no_chats') }}
        </div>
      </template>
      <v-list two-line class="pb-9">
        <template v-for="(chat, index) in chatList">
          <v-list-item v-if="chat" :key="index">
            <NuxtLink :to="`/chats/chat/${chat.id}`">
              <v-badge v-if="chat.unseenMessages && chat.unseenMessages[user.data.uid] > 0" 
                :content="chat.unseenMessages[user.data.uid]" 
                color="myshoutRed" overlap offset-x="25"
              >
                <ChatTopavatar :chat="chat" class="mr-3" />
              </v-badge>
              <ChatTopavatar v-else :chat="chat" class="mr-3" />
            </NuxtLink>
              
            <NuxtLink :to="`/chats/chat/${chat.id}`" style="width:100%;" color="myshoutDarkGrey">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-start align-center myshoutDarkGrey--text">
                  <ChatUsername :chat="chat" :loggedInUser="user.data.uid" />
                  <v-spacer />
                  <span class="caption">{{ moment(chat.created_at.toDate()).fromNow() }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <Span v-if="chat.lastMessageSender">{{ chat.lastMessageSender }}: </Span>{{ chat.lastMessage }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </NuxtLink>
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
  useStore,
  ref, 
  useContext, 
  watch,
  onUnmounted
} from '@nuxtjs/composition-api'

import moment from 'moment'

export default defineComponent({
  name: 'ChatsIndex',
  middleware: 'authenticated',
  setup() {
    const { state, dispatch } = useStore()
    const { $fire, $capacitor } = useContext()
    const user = computed(() => state.user)

    // DEFINE
    const isLoading = ref(true)
    const chatsListener = ref();
    const chatList = ref([])

    const fetchChats = async () => {
      isLoading.value = true;

      try {
        chatsListener.value = await $fire.firestore
          .collection('Chats')
          .where('participants', 'array-contains', user.value.data.uid)
          .orderBy('lastMessageSent', 'desc')
          .onSnapshot(async (snapshot) => {
            let updatedChatList = [...chatList.value]; // Create a copy of the current chat list

            snapshot.docChanges().forEach(async (change) => {
              const data = change.doc.data();
              data.id = change.doc.id;

              if (data.lastMessageSender) {
                const u = await dispatch('user/getOne', data.lastMessageSender);
                data.lastMessageSender = u.first_name ?? u.username;
              }

              const existingIndex = updatedChatList.findIndex((chat) => chat.id === data.id);

              if (existingIndex > -1) {
                // If the chat already exists, update it
                updatedChatList[existingIndex] = data;
              } else {
                // If the chat does not exist, add it
                updatedChatList.push(data);
              }
            });

            chatList.value = updatedChatList; // Update the chat list with the new data
          });
      } catch (error) {
        console.error('Error fetching chats:', error.message);
      } finally {
        isLoading.value = false;
      }
    };


    watch(user, (userData) => {
      if (userData && userData.data.uid) {
        // User data is available, load all chats the user participates in
        fetchChats()
        
        // Do not display AdMob if user is an Admin
        if (!userData.profile.isAdmin) {
          $capacitor.AdMob_init();
          $capacitor.AdMob_banner();
        }
      }
    }, {immediate: true});

    onUnmounted(() => {
      if (chatsListener.value) chatsListener.value();
    })

    return {
      moment,
      isLoading,
      user,
      chatList,
      state,
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
