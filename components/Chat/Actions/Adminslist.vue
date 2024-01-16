<template>
  <div v-if="!admins"> 
    <v-skeleton-loader v-for="x in 3" :key="x" type="list-item	" />
  </div>
  <v-list-item-group v-else>
    Admins
    <v-list-item
      v-for="(admin, index) in admins"
      :key="index"
    >
      <v-list-item-avatar>
        <ChatAvatar :user="admin" />
       </v-list-item-avatar>
      <v-list-item-title>
        {{ admin.username }}
      </v-list-item-title>
    </v-list-item>
  </v-list-item-group>
</template>
<script>

import {
  defineComponent
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminsList',
  props: {
    admins: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>
