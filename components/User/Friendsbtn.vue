<template>
  <div @click="openFindFriends">
    <slot>
      <v-icon class="grey lighten-2 pa-3 rounded-lg" color="myshoutDarkGrey">
        mdi-account-multiple-plus
      </v-icon>
    </slot>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="75vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH3 align="center" :text="$t('contacts.find_friends')" />

          <ContactsInvitebtn class="mt-3" />

          <v-text-field
              :label="$t('contacts.search_friends')"
              :placeholder="$t('contacts.search_friends')"
              append-icon="mdi-magnify"
              filled
              rounded
              class="mx-6 mt-6"
              v-model="searchFriendInput"
              @keyup.native="searchFriends"
          ></v-text-field>
          <v-list v-if="friends && friends.length > 0" color="transparent" rounded>
            <template v-for="(u, index) in friends">
              <UserListitem
                  :key="index"
                  :user="u"
                  urlBase="/users/user/"
              >
                <template v-slot:action>
                  <UserActionsbtn :user="u" />
                </template>
              </UserListitem>
            </template>
          </v-list>
          <div v-else>
            <ElementH4 v-if="searchFriendInput" align="center" class="my-5" :text="$t('no_results')" />
            <ElementH4 v-if="!searchFriendInput" align="center" class="my-5" :text="$t('contacts.search_friends')" />
          </div>

        </div>
      </v-sheet>
    </v-bottom-sheet>

  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'
import ContactsInvitebtn from "~/components/Contacts/Invitebtn";
// import lodash from 'lodash'

export default defineComponent({
  name: 'UserFriendsbtn',
  components: {ContactsInvitebtn},
  directives: { Touch },
  setup() {
    const {
      state, dispatch
    } = useStore()
    const loading = ref(false)
    const user = computed(() => state.user.data)
    const showBottomSheet = ref(false)
    const { $system, $db } = useContext()

    // DEFINE
    const friends = ref([])
    const friendsUnFiltered = ref([])
    const searchFriendInput = ref()

    // METHODS
    const openFindFriends = () => {
      showBottomSheet.value = true
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }
    const getFriends = async () => {
      loading.value = true
      try {
        await dispatch('user/friends/getAll', {
          uid: user.value.uid
        }).then((res) => {
          if (res !== false) {
            friends.value = res
            friendsUnFiltered.value = res
          }
        })
      } catch(e) {
        $system.log({ comp: 'UserAccountEmergency', msg: 'getFriends', val: e })
      } finally {
        loading.value = false
      }
    }
    const searchFriends = async () => {
      if(searchFriendInput.value && searchFriendInput.value.length >= 3) {
        let searchInput = searchFriendInput.value.toLowerCase()

        // SEARCH USERNAMES
        const foundUsernames = await $db.simpleSearch('Users', 'username', searchInput)
        if (foundUsernames && foundUsernames.length > 0) {
          friends.value = [...new Map(foundUsernames.map(item =>
              [item['id'], item])).values()];
        }

        // SEARCH PHONE
        searchInput = searchInput.replace(/[^0-9]/g, '')
        if (searchInput.substring(0, 2) !== '+1') {
          searchInput = `+1${searchInput}`
        }
        if (searchInput.substring(0, 1) !== '+') {
          searchInput = `+${searchInput}`
        }
        const foundPhone = await $db.simpleSearch('Users', 'phone', searchInput)
        if (foundPhone && foundPhone.length > 0) {
          friends.value = [...new Map(foundPhone.map(item =>
              [item['id'], item])).values()];
        }
      }
      else {
        friends.value = []
      }
    }

    return {
      loading,
      showBottomSheet,
      openFindFriends,
      swipe,
      getFriends,
      searchFriends,
      friends,
      searchFriendInput
    }
  }
})
</script>
