<template>
  <div>

    <v-text-field
        v-model="searchInput"
        @keyup.native="doSearch"
        :label="$t('form.search')"
        :placeholder="$t('form.search')"
        append-icon="mdi-magnify"
        rounded
        filled
    ></v-text-field>
    <v-list v-if="results && results.length > 0">
      <template v-for="(u, index) in results">
        <UserListitem
            :key="index"
            :user="u"
            urlBase="/users/user/"
            class="mb-2"
        >
          <template v-slot:action>
            ASD
          </template>
        </UserListitem>
      </template>
    </v-list>

  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
  useStore,
  computed,
} from '@nuxtjs/composition-api'

import lodash from 'lodash'

export default defineComponent({
  name: 'AdminSearchusers',
  setup() {
    const { $system, } = useContext()
    const { dispatch, state } = useStore()
    const loading = ref(false)
    const user = computed(() => state.user.data)

    // DEFINE
    const showBottomSheet = ref(false)
    const results = ref([])
    const resultsUnFiltered = ref([])
    const searchInput = ref()

    // METHODS
    const doSearch = async () => {
      loading.value = true
      try {
        const res = await dispatch('user/friends/getAll', { uid: user.value.uid })
        if (res !== false) {
          results.value = res
          resultsUnFiltered.value = res
        }
      } catch(e) {
        $system.log({ comp: 'AdminSearchusers', msg: 'doSearch', val: e })
      } finally {
        loading.value = false
      }
    }
    const searchUsers = async () => {
      if(searchInput.value && searchInput.value.length >= 3) {
        const input = searchInput.value.toLowerCase()
        results.value = lodash.filter(resultsUnFiltered.value, (friend) => {
          if (friend.first_name && friend.first_name.toLowerCase().includes(input)) return true
          if (friend.last_name && friend.last_name.toLowerCase().includes(input)) return true
          if (friend.username && friend.username.toLowerCase().includes(input)) return true
          if (friend.phone && friend.phone.toLowerCase().includes(input)) return true
        })
      } else {
        results.value = resultsUnFiltered.value
      }
    }

    return {
      loading,
      showBottomSheet,
      results,
      searchInput,
      searchUsers,
      doSearch,
    }
  }
})
</script>
