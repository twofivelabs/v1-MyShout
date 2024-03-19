<template>
  <v-container class="admin-container">
    <AdminTitle/>

    <!-- ALERTS -->
    <div v-if="!alerts">
      {{ $t('you_have_no_alerts') }}
      <v-btn @click="$nuxt.refresh()" class="elevation-0">
        <v-icon>mdi-refresh</v-icon> {{ $t('you_have_no_alerts') }}
      </v-btn>
    </div>
    <div v-if="alerts" class="mt-3">
      <div class="px-3">
        <v-select
            :items="['ALL', 'accident', 'kidnapping', 'robbery', 'shout']"
            @change="changeFilter"
            :label="$t('form.filter_by')"
            outlined
        />
        {{ filterText }}
      </div>

      <template v-for="(alert, key) in alerts">
        <AdminAlertlist :alert="alert" :loadedUsers="loadedUsers" :key="key" />
      </template>

      <div v-if="showPagination" class="d-flex align-center justify-space-between">
        <v-btn @click="goDirection('previous')" text>
          <v-icon>mdi-arrow-left</v-icon>
          {{ $t('previous') }}
        </v-btn>
        <v-btn @click="goDirection('next')" text>
          {{ $t('next') }}
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

    </div>
  </v-container>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
  // useRouter,
  useStore,
} from '@nuxtjs/composition-api'
// import Vue from 'vue'
import { Touch } from 'vuetify/lib/directives'
// import { paginationMarkers } from '@/plugins/fb'

export default defineComponent({
  name: 'AdminDashboard',
  middleware: 'admin',
  layout: 'admin',
  directives: { Touch },
  setup () {
    const { state, dispatch } = useStore()
    const { $system, $db } = useContext()
    // const router = useRouter()
    const loading = ref(true)
    const user = computed(() => state.user)
    const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    const isDriver = ref(user.value.data.role.isDriver)

    // DEFINE CONTENT
    const alerts = ref([])
    const loadedUsers = ref({})
    const direction = ref('next')
    const showPagination = ref(true)
    const filterText = ref()

    // GET CONTENT
    const { fetch } = useFetch(async () => {
      loading.value = true
      const loopUsers = {}

      try {
        showPagination.value = true
        filterText.value = null

        alerts.value = await dispatch('user/alerts/paginate', {
          direction: direction.value,
          limit: 10
        })

        if (alerts.value) {
          alerts.value.forEach((d) => {
            // Only get users if they aren't loaded
            if (!loopUsers[d.userId]) {
              loopUsers[d.userId] = { username: '' }
              $db.fire().fs.doc(`Users/${d.userId}`).get().then((userDoc) => {
                if (userDoc.exists) loopUsers[d.userId] = userDoc.data()
              })
            }
          })
        }

      } catch (e) {
        $system.log({ comp: 'AdminDashboard', msg: 'useFetch', val: e })
      } finally {
        loadedUsers.value = loopUsers
        loading.value = false
      }
    })

    const goDirection = (dir='next') => {
      direction.value = dir
      fetch()
    }
    const changeFilter = async (v) => {
      if (v === 'ALL') {
        fetch()
        return
      }

      filterText.value = 'Showing 50 of the most recent'
      showPagination.value = false

      alerts.value = await dispatch('user/alerts/group', {
        what: 'Alerts',
        where: {
          field: 'type',
          op: '==',
          value: v
        },
        limit: 50
      })
    }

    return {
      isAdmin,
      isVendor,
      isDriver,
      loading,
      alerts,
      showPagination,
      filterText,
      changeFilter,
      loadedUsers,
      goDirection,
    }
  }
})
</script>
