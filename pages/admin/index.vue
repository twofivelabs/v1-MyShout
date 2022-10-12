<template>
  <v-container class="my-10">
    <AdminTitle/>

    <!-- ALERTS -->
    <div v-if="!alerts">
      You have no alerts currently.
      <v-btn @click="$nuxt.refresh()" class="elevation-0">
        <v-icon>mdi-refresh</v-icon> Try Refresh Data
      </v-btn>
    </div>
    <div v-if="alerts">
      <ElementH4 text="Last 100 Alerts" align="left" class="mb-4" />
      <template v-for="(alert, key) in alerts">
        <AdminAlertlist :alert="alert" :loadedUsers="loadedUsers" :key="key" />
      </template>
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

export default defineComponent({
  name: 'AdminDashboard',
  middleware: 'admin',
  directives: { Touch },
  setup () {
    const {
      state
    } = useStore()
    const {
      $system, $fire
    } = useContext()
    // const router = useRouter()
    const loading = ref(true)
    const user = computed(() => state.user)
    const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    const isDriver = ref(user.value.data.role.isDriver)

    // DEFINE CONTENT
    const alerts = ref([])
    const loadedUsers = ref({})

    // METHODS

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      const loopUsers = {}
      try {
        await $fire.firestore.collectionGroup('Alerts')
            .orderBy('created_at', 'desc')
            .limit(100)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                const d = doc.data()
                d.id = doc.id
                alerts.value.push(d)

                // Only get users if they aren't loaded
                if (!loopUsers[d.userId]) {
                  loopUsers[d.userId] = { username: '' }
                  $fire.firestore
                      .doc(`Users/${d.userId}`)
                      .get()
                      .then((userDoc) => {
                        if (userDoc.exists) {
                          loopUsers[d.userId] = userDoc.data()
                        }
                      })
                }
              })
            })
      } catch (e) {
        $system.log({
          comp: 'AdminDashboard',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loadedUsers.value = loopUsers
        loading.value = false
      }
    })

    return {
      isAdmin,
      isVendor,
      isDriver,
      loading,
      alerts,
      loadedUsers,
    }
  }
})
</script>
