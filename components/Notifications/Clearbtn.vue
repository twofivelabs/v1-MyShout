<template>
  <div>
    <v-icon class="grey lighten-2 pa-3 rounded-lg" color="myshoutDarkGrey" @click="openDialog">
      mdi-notification-clear-all
    </v-icon>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Select Notification Filters</v-card-title>
        <v-card-text>
          <v-checkbox v-model="filters.alerts" label="Alerts"></v-checkbox>
          <v-checkbox v-model="filters.friendRequest" label="Friend Requests"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="applyFilters">Apply</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatNewchatbtn',
  setup(_, { emit }) {
    const dialog = ref(false);
    const filters = ref({
      alert: true,
      friendRequest: true
    });

    const openDialog = () => dialog.value = true;

    const applyFilters = () => {
      emit('filtersChanged', filters.value);
      dialog.value = false;
    };

    const cancel = () => dialog.value = false;

    return {
      dialog,
      filters,
      openDialog,
      applyFilters,
      cancel,
    };
  }
});
</script>
