<template>
  <v-snackbar v-model="show" :color="snack.color" elevation="0">
    <div v-if="snack.title">
      <strong>{{ snack.title }}</strong>
    </div>
    {{ snack.text }}
    <template #action="{ attrs }">
      <v-btn
        v-if="snack.goTo"
        color="white"
        text
        @click="snackbarClick"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>

import {
  defineComponent,
  useStore,
  useRouter,
  onMounted,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SnackbarComp',
  setup () {
    const store = useStore()
    const router = useRouter()
    const show = ref(false)
    const snack = ref({
      text: '',
      title: '',
      color: '',
      multiLine: false,
      timeout: 2000,
      goTo: '',
      type: 'general', // notification || general
      id: null
    })

    onMounted(() => {
      store.subscribe((mutation, state) => {
        if (mutation.type === 'snackbar/show') {
          snack.value.title = state.snackbar.title
          snack.value.text = state.snackbar.text
          snack.value.color = state.snackbar.color
          snack.value.timeout = state.snackbar.timeout
          snack.value.multiLine = state.snackbar.multiLine
          snack.value.goTo = state.snackbar.goTo
          snack.value.type = state.snackbar.type
          snack.value.id = state.snackbar.id

          show.value = true
        }
      })
    })

    const snackbarClick = () => {
      console.log(`SNACKBARCLICK, ${snack.value.id} ${snack.value.type}`)
      if (snack.value.goTo) {
        if (snack.value.type === 'notification' && snack.value.id) {
          store.dispatch('user/notifications/update', {
            id: snack.value.id,
            seen: true,
            actions: {
              tap: true
            }
          })
        }
        router.push(snack.value.goTo)
      }
      setTimeout(() => {
        show.value = false
      }, 1000)
    }

    return {
      show,
      snack,
      snackbarClick
    }
  }
})
</script>
