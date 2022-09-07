<template>
  <div v-if="company && company.id">
    <v-btn
        :to="`/companies/${company.id}`"
        class="pa-0 mt-n2 mb-4 product-company"
        color="grey"
        elevation="0"
        nuxt
        plain
        text
    >
      <v-avatar v-if="logoUrl" class="avatar-elevation white rounded-lg elevation-3 mr-2" rounded
                size="30"
      >
        <v-img
            :src="logoUrl"
            contain
        />
      </v-avatar>
      {{ company.name }}
    </v-btn>
  </div>
</template>
<script>

import { defineComponent, ref, useFetch, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductCompany',
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const { dispatch } = useStore()
    const companyFull = ref({})
    const logoUrl = ref('')

    useFetch(async () => {
      await dispatch('companies/getOne', props.company.id).then((res) => {
        if (res !== false) {
          companyFull.value = res

          if (companyFull.value && companyFull.value.logo_url) {
            logoUrl.value = companyFull.value.logo_url
          }
        }
      })
    })

    return {
      logoUrl
    }
  }
})
</script>
<style scoped>
.product-company::after {
  font-size: 7px;
}
</style>
