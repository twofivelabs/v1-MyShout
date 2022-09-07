<template>
  <v-dialog
      v-model="dialog"
      width="500"
      :scrollable="true"
  >
    <template v-slot:activator="{ on, attrs }" >
      <div class="text-center grey--text caption lighten-1">
        <div>By signing up you agree to our</div>
        <div v-on="on" v-bind="attrs" @click="loadPage">Privacy Policy and Terms</div>.
      </div>
    </template>

    <v-card class="pa-2 pt-6 rounded-xl elevation-13">
      <v-card-text>
        <div v-if="loading">
          Loading...
        </div>
        <div v-else-if="page">
          <h4 class="text-h4 text-center">{{ page.title }}</h4>
          <div v-if="page.content">
            <div v-if="page.isMarkdown" v-dompurify-html="$md.render(page.content)" class="mdDoc mt-5"/>
            <div v-else v-dompurify-html="page.content" class="mdDoc mt-5"/>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
            text
            @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {
  defineComponent,
  ref, useContext, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OnboardingPrivacypolicy',
  setup () {
    const dialog = ref(false)
    const loading = ref(false)
    const {
      dispatch
    } = useStore()
    const {
      error
    } = useContext()

    // DEFINE
    const page = ref()

    // METHODS
    const loadPage = async () => {
      loading.value = true
      try {
        await dispatch('pages/getOne', 'privacy').then((res) => {
          if (res !== false) {
            page.value = res
          }
        })
      } catch {
        error({ statusCode: 404 })
      } finally {
        loading.value = false
      }
    }

    return {
      dialog,
      loading,
      loadPage,
      page,
    }
  }
})
</script>
