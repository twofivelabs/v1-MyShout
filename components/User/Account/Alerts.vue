<template>
  <div>
    <ElementH4 v-if="!loading && !canViewAlerts" align="center" class="my-5" text="You must be their emergency contact to view alerts"/>
    <div v-else>
      <v-list v-if="alerts && alerts.length > 0" color="transparent" rounded>
        <v-list-item-group>
          <template v-for="(alert, index) in alerts">
            <AlertListitem :key="index" :alert="alert" />
          </template>
        </v-list-item-group>
      </v-list>
      <div v-else>
        <ElementH4 v-if="!loading" align="center" class="my-5" text="You have no alerts"/>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref, useContext,
  onMounted,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserAccountAlerts',
  middleware: 'authenticated',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { $system } = useContext()
    const { dispatch, state } = useStore()
    const loggedInUser = computed(() => state.user.data)
    const loading = ref(false)

    // DEFINE CONTENT
    const alerts = ref([])
    const alertsStore = computed(() => state.user.alerts.all)
    const canViewAlerts = ref(false)

    // METHODS
    const getUserFriends = async () => {
      try {
        loading.value = true
        await dispatch('user/friends/getOne', {
          userId: props.user.id,
          id: loggedInUser.value.uid
        }).then((res) => {
          if (res !== false) {
            canViewAlerts.value = res.isEmergency
          }
        })
      } catch(e) {
        $system.log({
          comp: 'UserAlerts',
          msg: 'getUserFriends',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const getAlerts = async () => {
      try {
        loading.value = true
        if (loggedInUser.value.uid === props.user.id) {
          canViewAlerts.value = true
        } else if(!canViewAlerts.value) {
          return
        }
        
        await dispatch('user/alerts/getAll', props.user.id).then((res) => {
          if (res !== false) {
            alerts.value = res
          }
        })
      } catch(e) {
        $system.log({
          comp: 'UserAlerts',
          msg: 'getAlerts',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(async () => {
      await getUserFriends()
      await getAlerts()
    })

    return {
      alertsStore,
      loading,
      state,
      alerts,
      canViewAlerts
    }
  }
})
</script>
