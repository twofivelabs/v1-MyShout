<template>
  <v-container class="admin-container">
    <AdminTitle/>

    <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="20"
        :loading="loading"
        class="mt-3 elevation-0"
        :loading-text="$t('is_loading')"
        @click:row="rowClick"
    >
      <template #[`item.title`]="{ item }">
        <div>{{ item.title }}</div>
        <div class="mt-n2 grey--text lighten-1"><small>
          <v-icon x-small>mdi-subdirectory-arrow-right</v-icon>
          {{ item.slug }}</small></div>
      </template>
      <template #[`item.content`]="{ item }">
        {{ item.content.substring(0, 40) }}
        <v-chip x-small>{{ item.content.length }}</v-chip>
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
  name: 'AdminPosts',
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
    const user = computed(() => state.user)
    // const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    // const isDriver = ref(user.value.data.role.isDriver)

    // DEFINE CONTENT
    const data = ref([])
    const headers = [
      {
        text: 'Title',
        align: 'start',
        sortable: true,
        value: 'title'
      },
      {
        text: 'Tags',
        value: 'tags'
      },
      {
        text: 'Pub',
        value: 'published'
      }
    ]

    // METHODS
    const rowClick = (row) => {
      router.push(`/admin/posts/edit/${row.id}`)
    }

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        const whereQuery = []
        if (isVendor.value && !state.user.data.role.companyId) {
          return false
        }
        // VENDOR
        if (isVendor.value && state.user.data.role.companyId) {
          whereQuery.push({
            field: 'company.id',
            op: '==',
            value: state.user.data.role.companyId
          })
        }
        await dispatch('posts/getAll', {
          where: whereQuery,
          limit: 500
        }).then((res) => {
          if (res !== false) {
            data.value = res
          }
        })
      } catch (e) {
        $system.log({ comp: 'AdminPosts', msg: 'getAll', val: e })
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
