<template>
  <v-container class="py-10 mb-10">
    <AdminTitle/>

    <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="20"
        :loading="loading"
        class="elevation-0"
        :loading-text="$t('is_loading')"
        @click:row="rowClick"
    >
      <template #[`item.title`]="{ item }">
        {{ item.title }}
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
  name: 'AdminPages',
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
    const data = computed(() => state.pages.all)
    const headers = [
      {
        text: 'Title',
        align: 'start',
        sortable: true,
        value: 'title'
      },
      {
        text: 'Content',
        value: 'content'
      },
      {
        text: 'Created',
        value: 'created_at'
      }
    ]

    // METHODS
    const rowClick = (row) => {
      router.push(`/admin/pages/edit/${row.id}`)
    }

    // GET CONTENT
    useFetch(async () => {
      try {
        loading.value = true
        if (isVendor.value) {
          router.push('/admin')
          return
        }
        await dispatch('pages/getAll')
      } catch (e) {
        $system.log({
          comp: 'AdminPages',
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
