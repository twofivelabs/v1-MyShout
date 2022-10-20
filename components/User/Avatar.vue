<template>
  <div style="display:inline-block">
    <v-badge 
      top
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
        <v-img v-else-if="isLoggedIn && photo" :src="photo" @click="tappedPhoto" />
        <span v-else-if="isLoggedIn" class="white--text headline">{{ initial }}</span>
      </v-avatar>
    </v-badge>
    <v-bottom-sheet v-if="viewPhoto" v-model="viewPhoto" :scrollable="false" fullscreen>
      <v-sheet height="100vh" class="rounded-t-xl pa-5">
        <v-card>
          <v-card-title class="justify-end">
            <v-icon @click="viewPhoto=false">mdi-close-circle-outline</v-icon>
          </v-card-title>
          <v-card-text>
            <v-img :src="photo" />
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

import {
  defineComponent,
  useStore,
  useRoute,
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
    const route = useRoute()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    let initial = computed(() => state.user.profile.initial)
    let photo = computed(() => state.user.profile.photoURL)
    const loggedInUser = computed(() => state.user.profile)
    const onlineStatus = ref('offline')
    const viewPhoto = ref(false)
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

    const tappedPhoto = () => {
      if (route.value.name === 'users-user-id') {
        viewPhoto.value = true
      }
    }

    return {
      isLoggedIn,
      initial,
      photo,
      goTo,
      onlineStatus,
      viewPhoto,
      tappedPhoto
    }
  }
})
</script>
