<template>
  <div>
    <v-icon class="grey lighten-2 pa-3 rounded-lg" color="myshoutDarkGrey" @click="clear">
      mdi-notification-clear-all
    </v-icon>
  </div>
</template>
<script>
import {
  defineComponent,
  //useContext,
  //computed,
  //useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatNewchatbtn',
  directives: { Touch },
  setup() {
    //const { $system, $notify, i18n } = useContext()
    //const { state } = useStore()
    //const user = computed(() => state.user.data)

    const clear = () => {
      console.log("clear Notifications")
    }

    return {
      clear
    }
  }
})
</script>
