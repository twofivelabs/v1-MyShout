<template>
  <v-footer v-if="hasMounted" app class="pb-10">
    <v-bottom-navigation
      :height="75"
      absolute
      grow
    >
      <v-btn class="pb-3" color="accent-4" style="height:inherit" text to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn class="pb-3" color="accent-4" style="height:100%" text to="/notifications">
        <v-badge v-if="hasNotifications" dot overlap color="myshoutRed">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell</v-icon>
      </v-btn>
      <v-btn class="pb-3" color="accent-4" style="height:inherit" text to="/chats">
        <v-badge v-if="messages" overlap :content="messages" :bordered="false" color="myshoutRed">
          <v-icon>mdi-forum</v-icon>
        </v-badge>
        <v-icon v-else>mdi-forum</v-icon>
      </v-btn>
      <v-btn class="pb-3" color="accent-4" style="height:inherit" text to="/map">
        <v-icon>mdi-google-maps</v-icon>
      </v-btn>
      <v-btn class="pb-3" color="accent-4" style="height:inherit" text to="/profile">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalMobileFooter',
  setup () {
    const { state } = useStore()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const hasNotifications = computed(() => state.user.profile.has.notifications || false)
    const messages = computed(() => state.user.profile.notifications?.unseen || 0)

    // DEFINE CONTENT
    const hasMounted = ref(false)

    // MOUNT
    onMounted(() => {
      hasMounted.value = true
    })

    return {
      user,
      profile,
      hasMounted,
      hasNotifications,
      messages
    }
  }
})
</script>
<style scoped>

.footer-cart, .footer-orders {
  height: 75vh;
  bottom: 0;
  position: absolute
}
.v-icon.v-icon {
  font-size:30px;
}
</style>
