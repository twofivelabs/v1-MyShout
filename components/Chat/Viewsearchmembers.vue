<template>
  <div class="mb-12 pb-12">
    <div v-if="!friends || friends.length === 0">
      <ElementH4 v-if="!loading" align="center" class="my-5" :text="$t('contacts.no_contacts')"/>
    </div>

    <v-text-field
        v-else
        :label="$t('contacts.search_friends')"
        :placeholder="$t('contacts.search_friends')"
        append-icon="mdi-magnify"
        filled
        rounded
        v-model="searchFriendInput"
        @keyup.native="searchFriends"
    ></v-text-field>

    <v-list>
      <template v-for="(u, index) in friends">
        <UserListitem
            :key="index"
            :user="u"
            urlBase="/users/user/"
            class="mb-2"
        >
          <template v-slot:action>
            <v-checkbox v-if="(u.status===`approved`)" @click="toggleFriend(u.id)"></v-checkbox>
            <v-chip
                v-else
                color="myshoutOrange"
                :title="u.status"
            ><v-icon class="pr-3">mdi-update</v-icon></v-chip>
          </template>
        </UserListitem>
      </template>
    </v-list>

  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  useStore,
  computed,
  onMounted
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'ChatViewsearchmembers',
  setup(_, { emit }) {
    const { $system, $helper } = useContext()
    const { dispatch, state } = useStore()
    const loading = ref(false)
    const user = computed(() => state.user.data)

    // DEFINE
    const showBottomSheet = ref(false)
    const friends = ref([])
    const friendsUnFiltered = ref([])
    const searchFriendInput = ref()
    const friendsSelected = ref([])

    // METHODS
    const getFriends = async () => {
      try {
        loading.value = true
        await dispatch('user/friends/getAll', {
          uid: user.value.uid
        }).then((res) => {
          if (res !== false) {
            friends.value = res
            friendsUnFiltered.value = res
          }
        })
      } catch(e) {
        $system.log({
          comp: 'Newchat',
          msg: 'getFriends',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const toggleFriend = async (userId) => {
      friendsSelected.value = $helper.arrToggle(friendsSelected.value, userId)
      emit('friendsSelected', friendsSelected.value)
    }
    const searchFriends = async () => {
      if(searchFriendInput.value && searchFriendInput.value.length >= 3) {
        const searchInput = searchFriendInput.value.toLowerCase()
        friends.value = lodash.filter(friendsUnFiltered.value, (friend) => {
          if (friend.first_name && friend.first_name.toLowerCase().includes(searchInput)) return true
          if (friend.last_name && friend.last_name.toLowerCase().includes(searchInput)) return true
          if (friend.username && friend.username.toLowerCase().includes(searchInput)) return true
          if (friend.phone && friend.phone.toLowerCase().includes(searchInput)) return true
        })
      } else {
        friends.value = friendsUnFiltered.value
      }
    }

    // MOUNT
    onMounted(async () => {
      try {
        loading.value = true
        await getFriends()
      } catch(e) {
        $system.log({
          comp: 'ChatViewsearchmembers',
          msg: 'getFriends',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      showBottomSheet,
      friends,
      searchFriendInput,
      toggleFriend,
      searchFriends,
    }
  }
})
</script>
