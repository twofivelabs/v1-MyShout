<template>
  <v-list-item>
    <NuxtLink :to="(goTo) ? goTo : `${urlBase}${user.id}`">
      <UserAvatar :user="user" class="mr-5" />
    </NuxtLink>
    <NuxtLink :to="(goTo) ? goTo : `${urlBase}${user.id}`" style="width:100%;" color="myshoutDarkGrey">
      <v-list-item-content>
        <v-list-item-title v-html="(user && user.username) ? `@${user.username}` : user.first_name" class="username myshoutDarkGrey--text"></v-list-item-title>
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
  onMounted, useStore,
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
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const chat = ref()
    const dialog = ref(false)
    const loggedInUser = computed(() => state.user.data)
    const isMe = ref(false)
    const goTo = ref()

    // METHODS

    // MOUNT
    onMounted(() => {
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
      goTo
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
