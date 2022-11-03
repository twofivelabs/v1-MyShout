<template>
  <div>
    <v-combobox
        v-model="selected"
        :items="all"
        chips
        clearable
        flat
        item-text="name"
        item-value="id"
        :label="$t('form.tags')"
        multiple
        outlined
        prepend-icon="mdi-tag"
        solo
    >
      <template #selection="{ attrs, item, select }">
        <v-chip
            :input-value="item.id"
            v-bind="attrs"
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
  name: 'AdminTags',
  props: {
    tags: {
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
    this.all = await this.$store.dispatch('tags/getAll')
  },
  computed: {
    selected: {
      get () {
        if (this.tags && this.tags[0]) {
          const allSelected = []
          this.tags.forEach((d) => {
            if (d.id) {
              allSelected.push({
                id: d.id
              })
            } else {
              allSelected.push({
                id: d
              })
            }
          })
          return allSelected
        } else if (this.tags && this.tags.id) {
          return { id: this.tags.id }
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
              if (d.id) {
                allSelected.push(d.id)
              } else {
                allSelected.push(d)
              }
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
