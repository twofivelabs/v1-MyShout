<template>
  <div>
    <v-icon class="grey lighten-2 pa-3 rounded-lg" color="myshoutDarkGrey" @click="openDialog">
      mdi-notification-clear-all
    </v-icon>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Select Notification Filters</v-card-title>
        <v-card-text>
          <v-checkbox v-model="localFilters.alert" label="Alerts"></v-checkbox>
          <v-checkbox v-model="localFilters.friendRequest" label="Friend Requests"></v-checkbox>
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
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChatNewchatbtn',
  props: {
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const localFilters = ref({});

    const openDialog = () => dialog.value = true;

    const applyFilters = () => {
      emit('filtersChanged', localFilters.value);
      dialog.value = false;
    };

    const cancel = () => dialog.value = false;

    watch(() => props.filters, (newFilters) => {
      localFilters.value = { ...newFilters };
    }, { immediate: true, deep: true });

    return {
      dialog,
      localFilters,
      openDialog,
      applyFilters,
      cancel,
    };
  }
});
</script>
