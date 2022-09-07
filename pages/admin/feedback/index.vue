<template>
  <v-container>
    <AdminTitle/>
    <v-data-table
        :headers="headers"
        :items="data"
        :loading="loading"
        class="elevation-0"
        loading-text="Loading... Please wait"
        @click:row="rowClick"
    >
      <template #[`item.like`]="{ item }">
        <v-icon v-if="item.like">
          mdi-thumb-up
        </v-icon>
        <v-icon v-else>
          mdi-thumb-down
        </v-icon>
      </template>
      <template #[`item.user.id`]="{ item }">
        <div>{{ item.user.id }}</div>
        <div><small>{{ item.ip }}</small></div>
      </template>
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
  name: 'AdminFeedback',
  middleware: 'admin',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const { $helper } = useContext()
    const router = useRouter()
    const loading = ref(true)
    const user = computed(() => state.user)
    // const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    // const isDriver = ref(user.value.data.role.isDriver)

    // DEFINE CONTENT
    const data = ref([])
    const headers = [
      {
        text: 'Product',
        align: 'start',
        sortable: true,
        value: 'product.id'
      },
      {
        text: 'Company',
        value: 'company.id'
      },
      {
        text: 'Like?',
        value: 'like'
      },
      {
        text: 'User',
        value: 'user.id'
      }
    ]

    // METHODS
    const rowClick = (row) => {
      router.push(`/admin/feedback/edit/${row.id}`)
    }

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      await $helper.sleep(1200)
      if (isVendor.value && !state.user.data.role.companyId) {
        loading.value = false
        router.push('/admin')
        return false
      }
      const whereQuery = []
      // VENDOR ORDERS
      if (isVendor.value && state.user.data.role.companyId) {
        whereQuery.push({
          field: 'company.id',
          op: '==',
          value: state.user.data.role.companyId
        })
      }
      await dispatch('feedback/getAll', {
        where: whereQuery,
        limit: 500
      }).then((res) => {
        if (res !== false) {
          data.value = res
        }
      })
      loading.value = false
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
