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

    <v-row class="pt-10 px-5">
      <v-col v-if="isLoading" cols="12" class="mt-10" >
        <v-skeleton-loader v-for="x of 4" :key="`skeleton-${x}`" width="100%" max-height="50" type="text" class="mb-6" />
      </v-col>
      <v-col v-else cols="12" class="pt-6 pr-2">

        <v-list two-line class="pb-9" v-if="userChats && Object.keys(userChats).length > 0">
          <template v-for="(chat, index) in userChats">

            <v-list-item v-if="chat" :key="index">
              <NuxtLink :to="`/chats/chat/${chat.id}`">
                <v-badge v-if="chat.unseen && chat.unseen[user.data.uid] > 0"
                  :content="chat.unseen[user.data.uid]"
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
                    <span class="caption" v-if="chat && chat.message && chat.message.created_at">
                      {{ moment(chat.message.created_at.toDate()).fromNow() }}
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="chat && chat.message && chat.message.sent_by_name">
                    <span>{{ chat.message.sent_by_name }}: </span>{{ truncateMessage(chat.message.snippet) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </NuxtLink>
            </v-list-item>
          </template>
        </v-list>
        <div v-else>
          <ElementH4 align="center" :text="$t('chats.no_chats')"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  useStore,
  ref,
  useContext,
  watchEffect,
  onUnmounted, watch
} from '@nuxtjs/composition-api'

import moment from 'moment'
import Vue from "vue"

export default defineComponent({
  name: 'ChatsIndex',
  middleware: 'authenticated',
  setup() {
    const { state } = useStore()
    const { $db, $capacitor } = useContext()
    const user = computed(() => state.user)

    // DEFINE
    const isLoading = ref(true)
    const currentLoadedUsers = {}
    const userChats = ref({})

    const truncateMessage = (message, length = 25) => message ? (message.length > length ? message.substring(0, length) + '...' : message) : '';
    const fetchChats = async () => {
      isLoading.value = true;

      try {
        await $db.listen('Chats', {
              where: ['participants', 'array-contains', user.value.data.uid],
              limit: 200
        })

      } catch (error) {
        console.log('STICKY: Error fetching chats:', error?.message);
      } finally {
        isLoading.value = false;
      }
    };

    watch (state.listeners, (_, listener) => {
      if (listener['Chats']) {

        listener['Chats'].forEach(async (chat) => {
          chat.message.sent_by_name = null
          if (chat?.message?.sent_by) {
            let u
            // This will help just eliminate an extra call to firebase
            if (!currentLoadedUsers[chat.message.sent_by]) {
              u = await $db.get(`Users/${chat.message.sent_by}`)
              currentLoadedUsers[chat.message.sent_by] = u
            } else {
              u = currentLoadedUsers[chat.message.sent_by]
            }
            chat.message.sent_by_name = u?.username ?? u.first_name
          }

          if (chat._changeType === "added" || chat._changeType === "modified") {
            Vue.set(userChats.value, chat.id, chat)
          } else {
            Vue.delete(userChats.value, chat.id)
          }

        })
      }
    })
    watchEffect(() => {
      if (user.value?.data?.uid) {

        // User data is available, load all chats the user participates in
        fetchChats()

        // Do not display AdMob if user is an Admin
        if (!user.value?.data?.role?.isAdmin) {
          $capacitor.AdMob_init();
          $capacitor.AdMob_banner();
        }
      }
    })

    onUnmounted(() => {
      // if (chatsListener.value) chatsListener.value();
    })

    return {
      moment,
      isLoading,
      user,
      state,
      userChats,
      truncateMessage
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
