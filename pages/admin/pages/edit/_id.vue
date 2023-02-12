<template>
  <v-container class="admin-container">
    <AdminTitle/>
    <div v-if="loading">
      <v-progress-linear
          class="mb-0"
          indeterminate
      />
    </div>
    <v-form v-else class="px-3 mt-3" ref="formEl" @submit.prevent="validate">
      <v-row>
        <v-col cols="12" sm="7">
          <v-text-field
              v-model="form.title"
              :disabled="readonly"
              :readonly="readonly"
              :label="$t('form.title')"
              required
          />
          <v-textarea
              v-model="form.content"
              :label="$t('form.content')"
              required
          />

          <!-- MULTI LINGUAL -->
          <div v-if="Object.keys(form.language).length > 0">
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="(language, langCode) in form.language" :key="langCode">
                <v-expansion-panel-header style="text-transform: uppercase;">{{ langCode }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                      v-model="form.language[langCode].title"
                      :label="$t('form.title')"
                  />
                  <v-textarea
                      v-model="form.language[langCode].content"
                      :label="$t('form.content')"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

        </v-col>
        <v-col class="pa-6 rounded-lg" cols="12" sm="5"
               style="background-color:rgba(0, 0, 0, 0.03)"
        >
          <v-sheet
              v-if="form.created_at"
              class="pa-4 mb-6 caption"
              elevation="0"
              outlined
              rounded
          >
            {{ form.created_at }}
          </v-sheet>

          <div v-if="form.title">
            {{ $t('form.featured_image') }}
            <AdminUploadimage :initial="[form.featured_image_url]" :multiple="false"
                              :storage="`Pages/${form.title}`"
                              @urls="emittedFeaturedImage"
            />
            <v-checkbox
                v-model="form.isMarkdown"
                :label="$t('form.using_markdown')"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
              :disabled="!valid"
              :loading="loading"
              class="text-center"
              color="success"
              elevation="0"
              type="submit"
          >
            {{ $t('btn.save') }}
          </v-btn>
          <span v-if="$route.params.id">
          <v-btn
              :loading="loading"
              class="text-center"
              color="danger"
              elevation="0"
              @click="remove"
          >
            {{ $t('btn.delete') }}
          </v-btn>
        </span>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>

import lodash from 'lodash'

import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useRoute,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'AdminPagesEdit',
  middleware: 'admin',
  watch: {
    '$route.query': '$fetch'
  },
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $helper,
      $notify,
      $system, i18n
    } = useContext()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const isVendor = ref(state.user.data.role.isVendor)

    // DEFINE CONTENT
    const valid = ref(true)
    const rules = formRules
    const readonly = ref(false)
    const formEl = ref(null)
    const form = ref(lodash.cloneDeep(state.pages.one))

    // GET CONTENT
    useFetch(async () => {
      try {
        if (isVendor.value) {
          router.push('/admin')
          return
        }
        if (typeof route.value.params.id === 'undefined') {
          form.value = lodash.cloneDeep(state.pages.default)
        }
        if (route.value.params.id) {
          loading.value = true
          await dispatch('pages/getOne', route.value.params.id).then((res) => {
            if (res !== false) {
              form.value = lodash.cloneDeep(res)
              readonly.value = true
            }
          })
        }
      } catch(e) {
        $system.log({
          comp: 'AdminPagesEdit',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    // METHODS
    const validate = async () => {
      let valid = formEl.value.validate()
      if (!route.value.params.id) {
        valid = await $helper.validSlug('pages/search', form.value.title)
      }
      if (valid) {
        await submit()
      }
    }
    const submit = async () => {
      if (form.value.title) {
        loading.value = true
        try {
          await dispatch('pages/add', form.value)
          $notify.show({ text: i18n.t('notify.success') })
          router.push('/admin/pages')
        } catch {
          $notify.show({
            text: i18n.t('notify.error_try_again'),
            color: 'error'
          })
        } finally {
          loading.value = false
        }
      } else {
        $notify.show({
          text: i18n.t('notify.error_try_again'),
          color: 'error'
        })
      }
    }
    const remove = async () => {
      const response = await dispatch('pages/remove', form.value.slug)
      if (response) {
        $notify.show({ text: i18n.t('notify.success') })
        router.push('/admin/pages')
      } else {
        $notify.show({
          text: i18n.t('notify.error_try_again'),
          color: 'error'
        })
      }
    }
    const emittedFeaturedImage = (url) => {
      form.value.featured_image_url = url
    }

    return {
      loading,
      valid,
      rules,
      readonly,
      form,
      formEl,
      validate,
      remove,
      emittedFeaturedImage
    }
  }
})
</script>
