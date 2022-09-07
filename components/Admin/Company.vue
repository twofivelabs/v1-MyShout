<template>
  <div>
    <v-combobox
        v-model="selected"
        :items="all"
        :multiple="multiple"
        chips
        clearable
        flat
        item-text="id"
        item-value="id"
        label="Company"
        outlined
        prepend-icon="mdi-domain"
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
  name: 'AdminCompanyComp',
  props: {
    company: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
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
    const isVendor = this.$store.state.user.data.role.isVendor
    if (isVendor) {
      await this.$store.dispatch('companies/getAll', {
        where: [{
          field: 'published',
          op: '==',
          value: true
        }, {
          field: 'id',
          op: '==',
          value: this.$store.state.user.data.role.companyId
        }],
        limit: 7
      }).then((res) => {
        if (res !== false) {
          this.all = res
        }
      })
    } else {
      this.all = await this.$store.dispatch('companies/getAll', {})
    }
  },
  computed: {
    selected: {
      get () {
        if (this.multiple && this.company) {
          const allSelected = []
          this.company.forEach((d) => {
            allSelected.push({
              id: d.id,
              name: d.name
            })
          })
          return allSelected
        } else if (this.company) {
          if (this.company[0]) {
            return { id: this.company[0].id }
          }
          return { id: this.company.id }
        } else {
          return null
        }
      },
      set (data) {
        if (data) {
          if (data.id) {
            this.$emit('data', {
              id: data.id,
              name: data.name
            })
          } else if (data[0]) {
            const allSelected = []
            data.forEach((d) => {
              allSelected.push({
                id: d.id,
                name: d.name
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
