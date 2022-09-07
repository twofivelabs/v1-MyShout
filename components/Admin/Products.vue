<template>
  <div>
    <v-combobox
      v-model="selected"
      :items="all"
      label="Products"
      multiple
      chips
      clearable
      item-text="id"
      item-value="id"
      prepend-icon="mdi-tag"
      solo
      outlined
      flat
    >
      <template #selection="{ attrs, item, select }">
        <v-chip
          v-bind="attrs"
          :input-value="item.id"
          @click="select"
        >
          {{ item.id }}
        </v-chip>
      </template>
    </v-combobox>
  </div>
</template>
<script>
export default {
  name: 'AdminProducts',
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: [
    'data'
  ],
  data () {
    return {
      all: [],
      emit: []
    }
  },
  async fetch () {
    this.all = await this.$store.dispatch('products/getAll')
  },
  computed: {
    selected: {
      get () {
        if (this.products && this.products[0]) {
          const allSelected = []
          this.products.forEach((d) => {
            allSelected.push({
              id: d
            })
          })
          return allSelected
        } else if (this.products && this.products.id) {
          return { id: this.products.id }
        }
        return []
      },
      set (data) {
        if (data) {
          if (data.id) {
            this.$emit('data', {
              id: data.id
            })
          } else if (data[0]) {
            const allSelected = []
            data.forEach((d) => {
              allSelected.push({
                id: d
              })
            })
            this.$emit('data', allSelected)
          }
          return data
        }
      }
    }
  }
}
</script>
