<template>
  <v-autocomplete
      v-model="select"
      @change="itemClicked"
      :search-input.sync="search"
      :label="$t('form.search')"
      :loading="loading"
      :items="items"
      :cache-items="false"
      :clearable="true"
      :rounded="true"
      :solo="true"
      background-color="#ffffff;"
      append-icon="mdi-magnify"
      class="elevation-4"
      item-value="value"
      item-text="text"
      return-object
      hide-details
      no-filter
      flat
  ></v-autocomplete>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
  useStore,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminSearchbox',
  props: {
    contentType: {
      type: String,
      default: () => {
        return 'Users'
      }
    }
  },
  setup (props) {
    const {
      state,
    } = useStore()
    const { $system, $fire } = useContext()
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
      loading.value = true
      const localItems = []
      try {
        // Min input length before searching
        if (v && v.length >= 2) {
          v = v.trim().toLowerCase()
            // search listings
            await $fire.firestore.collection(props.contentType)
                .orderBy('username', 'asc')
                .startAt(v)
                .endAt(`${v}~`)
                .limit(50)
                .get()
                .then(r => {
                  r.docs.forEach((doc) => {
                    const data = doc.data()
                    localItems.push({
                      text: data.username,
                      value: data.username,
                      path: `/admin/users/view/${doc.id}`,
                    })
                  })
                })
        }
      } catch(e) {
        $system.log({ comp: 'AdminSearchbox', msg: 'querySelections', val: e })
      } finally {
        console.log('ITEMS', localItems.length)
        loading.value = false
        items.value = localItems
      }
    }
    const customFilter = (item, queryText) => {
      try {
        const searchText = queryText.toLowerCase()
        const q = item.q.toLowerCase()
        if (q.indexOf(searchText) > -1) {
          return true
        }
      } catch {
        // ...
      }

      return false
    }
    const itemClicked = async (item) => {
      if (!item) return
        if (item && item.path) {
          router.push(`${item.path}`)
        }
    }

    // MOUNT

    // WATCH
    watch(search, (val) => {
      val && querySelections(val)
    })
    /*watch(select, (val) => {
      if(val) {
        console.log('VALUE', select, val)
        // router.push(`/companies/${val.toLowerCase()}`)
      }
    })*/

    return {
      user,
      profile,
      loading,
      items,
      search,
      select,
      itemClicked,
      customFilter,
      querySelections
    }
  }
})
</script>
<style>
.v-autocomplete__content.v-menu__content {
  transform-origin: center top !important;
  transform: scale(0.90) !important;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}
</style>
