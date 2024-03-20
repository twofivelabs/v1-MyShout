<template>
  <div>
    <template v-if="loading">
      <v-progress-circular color="primary" indeterminate />
    </template>
    <template v-else>
      <v-text-field
          v-if="friendsUnFiltered && friendsUnFiltered.length > 0"
          v-model="searchFriendInput"
          @keyup.native="searchFriends"
          :label="$t('form.search_friends')"
          :placeholder="$t('form.search_friends')"
          append-icon="mdi-magnify"
          class="mx-6 mt-6"
          rounded
          filled
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
        <ElementH4 v-if="!loading" align="center" class="my-5" :text="$t('chats.no_friends')"/>
      </div>
    </template>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  useStore, onMounted, computed,
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'UserAccountFriends',
  middleware: 'authenticated',
  setup () {
    const { state } = useStore()
    const { $system, $db } = useContext()
    const user = computed(() => state.user.data)
    const loading = ref(false)

    // DEFINE CONTENT
    const friends = ref([])
    const friendsUnFiltered = ref([])
    const searchFriendInput = ref()

    // METHODS
    const getFriends = async () => {
      loading.value = true

      try {
        await $db.get(`Users/${user.value.uid}/Friends`).then(response => {
          if (!response) return

          response.forEach(async (u) => {
            const joinedUser = await $db.get(`Users/${u.id}`)
            if (joinedUser) {
              friends.value.push(Object.assign({...u}, joinedUser))
              friendsUnFiltered.value.push(joinedUser)
            }
          })
        })

        /* await dispatch('user/friends/getAll', {
          uid: user.value.uid
        }).then((res) => {
          if (res !== false) {
            res.forEach(async (u) => {
              const joinedUser = await dispatch('user/getOne', u.id)
              if (joinedUser) {
                // const joinedUser = await joinUser(u.id)
                friends.value.push(Object.assign({...u}, joinedUser))
                // friends.value.push(joinedUser)
                friendsUnFiltered.value.push(joinedUser)
              }
            })
          }
        }) */
      } catch(e) {
        $system.log({ comp: 'UserAccountFriends', msg: 'getFriends', val: e })
      } finally {
        loading.value = false
      }
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

    onMounted(() => {
      getFriends()
    })

    return {
      loading,
      state,
      friends,
      searchFriendInput,
      friendsUnFiltered,
      searchFriends
    }
  }
})
</script>
