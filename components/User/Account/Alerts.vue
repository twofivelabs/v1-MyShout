<template>
  <div>

    <ElementH4 v-if="!loading && !canViewAlerts" align="center" class="my-5" :text="$t('must_be_emergency_contact')"/>
    <div v-else>
      <div class="text-center">
        <v-btn v-if="$store.state.user.alerts.hasNewAlerts" @click="getAlerts" color="myshoutOrange" class="my-3">
          <v-icon small>mdi-refresh</v-icon>
          {{ $t('btn.load_new') }}
        </v-btn>
      </div>

      <v-list v-if="alerts && alerts.length > 0" color="transparent" rounded>
        <v-list-item-group>
          <template v-for="(alert, index) in alerts">
            <AlertListitem :key="index" :alert="alert" />
          </template>
        </v-list-item-group>
      </v-list>
      <div v-else>
        <ElementH4 v-if="!loading" align="center" class="my-5" :text="$t('you_have_no_alerts')"/>
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
import lodash from 'lodash'

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
    const { $system, $db } = useContext()
    const { dispatch, state, commit } = useStore()
    const loggedInUser = computed(() => state.user.data)
    const loading = ref(false)

    // DEFINE CONTENT
    const alerts = ref([])
    const alertsStore = computed(() => state.user.alerts.all)
    const publicUser = ref()
    const canViewAlerts = ref(false)
    const friendshipAccess = ref({
      isEmergency: false
    })

    // METHODS
    const getUserFriends = async () => {
      loading.value = true
      try {
        await $db.get(`Users/${props.user.id}`).then((res) => {
          if (res !== false) {
            publicUser.value = lodash.cloneDeep(res)
          }
        }).catch((e) => {
          $system.log({ comp: 'PageUsersId', msg: 'user/getOne', val: e })
        })
        /* await dispatch('user/getOne', props.user.id).then((res) => {
          if (res !== false) {
            publicUser.value = lodash.cloneDeep(res)
          }
        }).catch((e) => {
          $system.log({
            comp: 'PageUsersId',
            msg: 'user/getOne',
            val: e
          })
        }) */
        // GET STATUS OF FRIENDSHIP
        await dispatch('user/friends/getAccess', {
          userId: loggedInUser.value.uid,
          id: props.user.id,
        }).then((res) => {
          if (res !== false) {
            friendshipAccess.value = res
            if(friendshipAccess.value.isEmergency) {
              canViewAlerts.value = true
            }
            if(publicUser.value.permissions.shareLocationWithFriends) {
              // canViewAlerts.value = true
            }
          }
        })
      } catch(e) {
        $system.log({ comp: 'UserAlerts', msg: 'getUserFriends', val: e })
      } finally {
        loading.value = false
      }
    }
    const getAlerts = async () => {
      loading.value = true
      try {
        if (loggedInUser.value.uid === props.user.id) {
          canViewAlerts.value = true
        } else if(!canViewAlerts.value) {
          return
        }

        //console.log('PROPS USER ID:', props.user.id)
        await $db.get(`Users/${props.user.id}/Alerts`).then(res => {
          if (res !== false) alerts.value = res
        })
      } catch(e) {
        $system.log({ comp: 'UserAlerts', msg: 'getAlerts', val: e })
      } finally {
        loading.value = false
        commit('user/alerts/HAS_NEW_ALERTS', false)
      }
    }

    onMounted(async () => {
      await getUserFriends()
      await getAlerts()
    })

    return {
      alertsStore,
      getAlerts,
      loading,
      state,
      alerts,
      canViewAlerts,
      publicUser,
      friendshipAccess
    }
  }
})
</script>
