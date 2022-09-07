<template>
  <div>
    <v-app-bar
        :height="`${$vuetify.breakpoint.lgAndUp ? 50 : 75}`"
        app
        class="pt-sm-4 pt-xs-4 align-center"
        elevation="0"
        extension-height="30"
        hide-on-scroll
    >
      <nuxt-link
          class="svg pt-1 pb-4"
          style="width:100%; max-width:200px; padding:0 !important;"
          to="/"
      >
        <img alt="MyShout Logo" src="/logo/MyShout-Logo.svg" style="width:100%; max-width:200px;">
      </nuxt-link>
      <v-spacer/>
      <v-toolbar-items v-if="nav && nav.length > 0" justify="center"
                       rounded
      >
        <v-btn
            v-for="item in nav"
            :key="item.title"
            :to="item.to"
            class="font-weight-bold hidden-sm-and-down"
            medium
            text
        >
          <v-icon dark left>
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  // useContext,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalNavbar',
  setup () {
    const { state } = useStore()
    /*const {
      // $remoteConfig
    } = useContext()*/
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const drawer = ref(false)
    const nav = ref([])

    // MOUNT
    onMounted(() => {
      try {
        // nav.value = $remoteConfig.get('navigation')
      } catch (e) {
        // ...
      }
    })

    return {
      user,
      profile,
      loading,
      nav,
      drawer
    }
  }
})
</script>
<style scoped>
.outline {
  border: 1px solid #000;
}

/deep/ div.v-toolbar__extension {
  background-color: #000;
  color: #fff;
  font-size: 0.8rem;
  justify-content: center;
}

.v-toolbar__items > .v-btn {
  height: max-content !important;
  border-radius: 22px;
  padding: 10px 16px !important;
}

.v-toolbar__items {
  height: auto;
}

.svg {
  position: relative;
  display: inline-block;
}

.svg:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
