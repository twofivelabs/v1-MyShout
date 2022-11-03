<template>
  <div class="px-2 pt-1 elevation-3 primary lighten-5">
    <div class="d-flex align-center mb-5">
      <v-btn text to="/" color="gray" small class="px-1">
        <v-icon>mdi-arrow-left</v-icon> To App
      </v-btn>

      <v-spacer />

      <v-btn text @click="$store.dispatch('users/signOut')" color="gray" small class="px-1">
        Logout <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>
    <div class="d-flex align-center">
      <v-btn v-if="crumbs().length === 1" to="/admin" text plain class="font-weight-black gray--text">Admin</v-btn>
      <v-btn v-if="crumbs()[1]" :to="`/admin/${crumbs()[1]}`" text plain class="font-weight-black gray--text">{{ crumbs()[1] }}</v-btn>

      <v-spacer />

      <AdminNav/>
    </div>
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
