<template>
  <v-list-item v-if="!loading && userDetails">
    <NuxtLink :to="(goTo) ? goTo : `${urlBase}${userDetails.id}`">
      <UserAvatar :user="userDetails" class="mr-5" />
    </NuxtLink>
    <NuxtLink :to="(goTo) ? goTo : `${urlBase}${userDetails.id}`" style="width:100%;" color="myshoutDarkGrey">
      <v-list-item-content>
        <v-list-item-title v-html="(userDetails && userDetails.username) ? `@${userDetails.username}` : userDetails.first_name" class="username myshoutDarkGrey--text"></v-list-item-title>
      </v-list-item-content>
    </NuxtLink>
    <v-list-item-action class="mr-3">
      <slot name="action"></slot>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import {
  computed,
  defineComponent,
  ref,
  onMounted, useStore, useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserListitem',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    urlBase: {
      type: String,
      default: () => {
        return '/users/user/'
      }
    }
  },
  setup(props) {
    const {
      state,
    } = useStore()
    const { $db } = useContext()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const chat = ref()
    const dialog = ref(false)
    const loggedInUser = computed(() => state.user.data)
    const isMe = ref(false)
    const goTo = ref()
    const userDetails = ref()
    const friendsLoaded = {}

    // METHODS
    const getUserDetails = async () => {
      loading.value = true
      // Try to only load the items you need
      // This will not be reactive though
      if (friendsLoaded[props.user.id]) {
        userDetails.value = friendsLoaded[props.user.id]
        loading.value = false
        return
      }
      if (!props.user.id) {
        console.log('No userId')
        return
      }
      await $db.get(`Users/${props.user.id}`).then(u => {
        friendsLoaded[props.user.id] = u
        userDetails.value = u
      })
      loading.value = false
    }

    // MOUNT
    onMounted(async() => {
      if (props.user.username) {
        // We should already have the user data
        friendsLoaded[props.user.id] = props.user
        userDetails.value = props.user
      } else {
        await getUserDetails()
      }

      if (loggedInUser.value.uid === props.user.id) {
        isMe.value = true
        goTo.value = '/profile'
      }
    })

    return {
      loading,
      chat,
      showBottomSheet,
      dialog,
      isMe,
      goTo,
      userDetails
    }
  }
})
</script>
<style scoped>
.username {
  font-size:19px;
  font-weight:600;
}
</style>
