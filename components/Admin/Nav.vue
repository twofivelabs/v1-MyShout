<template>
  <div>
    <v-btn
        v-if="canAdd()"
        :to="getRoute()"
        class="mr-1 elevation-0"
        color="secondary"
    >
      + Add
    </v-btn>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            elevation="0"
            v-bind="attrs"
            v-on="on"
        >
          Content
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in navOptions" :key="index" :to="item.to" nuxt>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRoute,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminNavComp',
  setup () {
    const {
      state
    } = useStore()
    const route = useRoute()
    const user = computed(() => state.user)
    // const profile = reactive({ ...state.user.profile })
    const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    const isDriver = ref(user.value.data.role.isDriver)

    const navOptions = ref([
     {
        to: '/admin/users',
        label: 'Users'
      },
      {
        to: '/admin/pages',
        label: 'Pages'
      },
      {
        to: '/admin/posts',
        label: 'Posts'
      },
      /*{
        to: '/admin/coupons',
        label: 'Coupons'
      },
      {
        to: '/admin/taxes',
        label: 'Taxes'
      },
      {
        to: '/admin/shipping',
        label: 'Shipping'
      },
      {
        to: '/admin/feedback',
        label: 'Feedback'
      }*/
    ])
    const getNavOptions = async () => {
      if (isAdmin.value) {
        // ... nav options are good
      } else if (isVendor.value) {
        navOptions.value = [
          {
            to: '/admin/products',
            label: 'Products'
          },
          {
            to: '/admin/posts',
            label: 'Posts'
          },
          {
            to: '/admin/shipping',
            label: 'Shipping'
          },
          {
            to: '/admin/feedback',
            label: 'Feedback'
          }
        ]
      } else if (isDriver.value) {
        navOptions.value = []
      }
    }
    const getRoute = () => {
      if (route.value.fullPath.includes('edit')) {
        return route.value.fullPath.replace(route.value.params.id, '')
      }
      return `${route.value.fullPath}/edit`
    }
    const canAdd = () => {
      const p = route.value.path
      if (p === '/admin' || p === '/admin/') {
        return false
      }
      if (p.includes('/edit')) {
        return false
      }
      if (p.includes('/users')) {
        return false
      }
      return true
    }

    onMounted(() => {
      canAdd()
      getNavOptions()
    })

    return {
      canAdd,
      navOptions,
      getRoute
    }
  }
})
</script>
