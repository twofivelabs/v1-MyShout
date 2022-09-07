<template>
  <div>
    <v-list v-if="friends && Object.keys(friends).length > 0" color="transparent" rounded>
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
      <ElementH4 v-if="!loading" align="center" class="my-5" text="You have no emergency friends"/>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  useStore, onMounted, computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserAccountEmergency',
  middleware: 'authenticated',
  setup () {
    const {
      state, dispatch
    } = useStore()
    const { $system } = useContext()
    const user = computed(() => state.user.data)
    const loading = ref(false)

    // DEFINE CONTENT
    const friends = ref()

    // METHODS
    const getFriends = async () => {
      try {
        loading.value = true
        await dispatch('user/friends/getAll', {
          where: [{
            field: 'isEmergency',
            op: '==',
            value: true
          }],
          uid: user.value.uid
        }).then((response) => {
          friends.value = response
        })
      } catch(e) {
        $system.log({
          comp: 'UserAccountEmergency',
          msg: 'getFriends',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    // MOUNT
    onMounted(() => {
      getFriends()
    })

    return {
      loading,
      state,
      friends,
    }
  }
})
</script>
