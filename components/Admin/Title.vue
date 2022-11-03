<template>
  <div>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <v-btn text to="/" small class="px-1">
          <v-icon>
            mdi-arrow-left
          </v-icon>
          {{ $t('btn.back_to_app') }}
        </v-btn>
      </v-col>
      <v-col class="ma-0 pa-0 text-right">
        <v-btn text @click="logout" small class="px-1">
          {{ $t('btn.log_out') }}
          <v-icon>
            mdi-exit-to-app
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="align-center mb-3">
      <v-col class="pa-0 ml-0" cols="5">
        <h4 class="text-left text-xl-h5">
          <v-breadcrumbs :items="crumbs()"
                         large
                         class="pa-2"
                         style="text-transform: capitalize"
          >
            <template #[`item`]="{ item }">
              <nuxt-link v-if="item === 'admin'" to="/admin">{{ item }}</nuxt-link>
              <span v-else-if="item === 'edit'">{{ item }}</span>
              <nuxt-link v-else :to="`/admin/${item}`">{{ item }}</nuxt-link>
            </template>
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </h4>
      </v-col>
      <v-col class="text-right">
        <AdminNav/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'AdminTitleComp',
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    crumbs () {
      const items = this.$nuxt.$route.path.replace(/^\/|\/$/g, '').split('/')
      if (items.length === 4) {
        items.splice(2, 2)
      }
      return items
    },
    logout () {
      this.$store.dispatch('user/signOut')
    }
  }
}
</script>
<style>
.v-breadcrumbs li {
  padding: 0;
}
</style>
