<template>
  <v-app dark class="" :style="`${$vuetify.breakpoint.smAndDown ? 'overflow-x:hidden' : '' }`">
    <v-main>
      <div class="pa-10 text-center">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <NuxtLink to="/">Go Home</NuxtLink>
      </div>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>
<script>

import {
  defineComponent,
  ref, useContext, useRoute, useRouter
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorLayout',
  props: ['error'],
  setup (props) {
    const loading = ref(false)
    const { $system } = useContext()
    const route = useRoute()
    const router = useRouter()

    // DEFINE CONTENT

    // METHODS
    router.push('/')

    $system.log({
      comp:'ErrorLayout',
      msg: 'Error on page',
      val: props.error
    })
    $system.log({
      comp:'ErrorLayout',
      msg: 'Error on page > Route',
      val: route.value
    })

    // MOUNT


    return {
      loading
    }
  }
})
</script>
