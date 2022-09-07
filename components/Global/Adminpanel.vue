<template>
  <div v-if="user && user.admin" class="admin-panel d-inline-flex align-center pa-1">
    <v-btn v-if="root" :to="`/admin/${root}/edit/${id}`" elevation="0" small nuxt>
      Edit
    </v-btn>
    <div class="ml-4">
      {{ profile.first_name }}
      | {{ profile.email }}
      | {{ profile.location.postal }}
      | Admin? {{ profile.role.admin }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminPanel',
  props: {
    root: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      id: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      profile: 'user/profile'
    })
  },
  mounted () {
    this.id = this.$route.params.id
  }
}
</script>
<style scoped>
.admin-panel {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: #ccc;
  font-size:90%;
}
</style>
