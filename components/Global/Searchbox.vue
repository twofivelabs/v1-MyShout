<template>
  <v-autocomplete
      v-model="select"
      :cache-items="true"
      :clearable="true"
      :filter="customFilter"
      :items="items"
      :loading="loading"
      :rounded="true"
      :search-input.sync="search"
      :solo="true"
      append-icon="mdi-magnify"
      background-color="#ffffff;"
      flat
      hide-details
      item-text="name"
      item-value="slug"
      label="Search"
  />
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
  useStore,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalSearchBox',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const { $system } = useContext()
    const router = useRouter()
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const items = ref([])
    const search = ref('')
    const select = ref('')

    // METHODS
    const querySelections = async (v) => {
      try {
        loading.value = true

        // Min input length before searching
        if (v.length >= 2) {
          v = v.trim().toLowerCase()
          // Search Product Tags
          await dispatch('products/getAll', {
            where: [{
              field: 'tags',
              op: 'array-contains-any',
              value: [v]
            }, {
              field: 'name',
              op: '>=',
              value: v
            }]
          }).then((res) => {
            if (res !== false) {
              res.forEach((product) => {
                if (product.name && product.slug) {
                  items.value.push({
                    name: product.name,
                    slug: `products/${product.slug}`,
                    tags: product.tags.join(),
                    company: product.company.name,
                    companyId: product.company.id
                  })
                }
              })
            }
          })
          // Search Product Names
          await dispatch('products/getAll', {
            where: {
              field: 'company.id',
              op: '>=',
              value: v
            }
          }).then((res) => {
            if (res !== false) {
              res.forEach((product) => {
                if (product.name && product.slug) {
                  items.value.push({
                    name: product.name,
                    slug: `products/${product.slug}`,
                    tags: product.tags.join(),
                    company: product.company.name,
                    companyId: product.company.id
                  })
                }
              })
            }
          })
        }
      } catch(e) {
        $system.log({
          comp: 'GlobalSearchbox',
          msg: 'querySelections',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const customFilter = (item, queryText) => {
      const searchText = queryText.toLowerCase()

      const tags = item.tags.toLowerCase()
      if (tags.indexOf(searchText) > -1) {
        return true
      }
      const company = item.company.toLowerCase()
      if (company.indexOf(searchText) > -1) {
        return true
      }
      const name = item.name.toLowerCase()
      if (name.indexOf(searchText) > -1) {
        return true
      }

      return false
    }

    // WATCH
    watch(search, (val) => {
      val && val !== select.value && querySelections(val)
    })
    watch(select, (val) => {
      router.push(`/${val}`)
    })

    return {
      user,
      profile,
      loading,
      items,
      search,
      select,
      customFilter,
      querySelections
    }
  }
})
</script>
