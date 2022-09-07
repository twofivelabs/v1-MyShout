<template>
  <nuxt-link :to="goTo">
    <v-badge top
             dot
             overlap
             bordered
             offset-x="8"
             offset-y="8"
             :color="(onlineStatus === 'online') ? 'myshoutGreen' : 'myshoutRed'"
    >
      <v-avatar
        :color="color"
        :size="size"
        rounded
        class="rounded-lg"
      >
        <v-icon v-if="!isLoggedIn" dark>
          mdi-account
        </v-icon>
        <v-img v-else-if="isLoggedIn && photo" :src="photo" />
        <span v-else-if="isLoggedIn" class="white--text headline">{{ initial }}</span>
      </v-avatar>
    </v-badge>
  </nuxt-link>
</template>
<script>

import {
  defineComponent,
  useStore,
  computed,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: Number,
      default: () => {
        return 50
      }
    },
    color: {
      type: String,
      default: () => {
        return 'black'
      }
    }
  },
  setup (props) {
    const { getters, state } = useStore()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    let initial = computed(() => state.user.profile.initial)
    let photo = computed(() => state.user.profile.photoURL)
    const loggedInUser = computed(() => state.user.profile)
    const onlineStatus = ref('offline')
    const goTo = ref(`/users/user/${props.user.id}`)

    if (state.user.profile.isOnline && state.user.profile.isOnline.status) {
      onlineStatus.value = state.user.profile.isOnline.status
    }

    if (props.user) {
      initial = computed(() => props.user.initial)
      photo = computed(() => props.user.photoURL)

      if (props.user.isOnline && props.user.isOnline.status) {
        onlineStatus.value = props.user.isOnline.status
      }
    }

    if (loggedInUser.value.id === props.user.id) {
      goTo.value = '/profile'
    }

    return {
      isLoggedIn,
      initial,
      photo,
      goTo,
      onlineStatus
    }
  }
})
</script>
