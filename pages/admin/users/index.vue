<template>
  <v-container class="admin-container">
    <AdminTitle/>

    <div class="mt-3 mb-2 px-3">
      <AdminSearchbox class="mb-6" />
      <v-btn to="/admin/users/map" small class="elevation-0 primary white--text">View on map</v-btn>
      Showing up to 500 users
    </div>
    <v-data-table
        @click:row="rowClick"
        :items="data"
        :headers="headers"
        :loading="loading"
        :loading-text="$t('is_loading')"
        :items-per-page="20"
        class="elevation-0"
    >
    </v-data-table>
  </v-container>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminUsers',
  middleware: 'admin',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $system
    } = useContext()
    const router = useRouter()
    const loading = ref(true)
    const isVendor = ref(state.user.data.role.isVendor)

    // DEFINE CONTENT
    const data = computed(() => state.user.all)
    const headers = [
      {
        text: 'Username',
        value: 'username'
      },
      {
        text: 'Country',
        align: 'start',
        sortable: true,
        value: 'location.country'
      },
      {
        text: 'Name',
        value: 'first_name'
      },
      {
        text: 'Phone',
        value: 'phone'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Active',
        value: 'role.isActive'
      }
    ]

    // METHODS
    const rowClick = (row) => {
      router.push(`/admin/users/view/${row.id}`)
    }

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        if (isVendor.value) {
          router.push('/admin')
          return
        }
        await dispatch('user/getAll', {
          where: {},
          limit: 500,
          order: {
            by: 'username',
            direction: 'asc'
          }
        })
      } catch (e) {
        $system.log({
          comp: 'AdminUsers',
          msg: 'getAll',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      headers,
      data,
      rowClick
    }
  }
})
</script>
