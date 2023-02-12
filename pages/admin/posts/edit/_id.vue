<template>
  <v-container class="admin-container">
    <AdminTitle/>
    <div v-if="loading">
      <v-progress-linear
          class="mb-0"
          indeterminate
      />
    </div>
    <v-form v-else ref="formEl" @submit.prevent="validate" class="px-3 my-3">
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
          <v-text-field
              v-model="form.learn_more"
              :label="$t('form.learn_more_url')"
          />
          <v-text-field
              v-model="form.learn_more_label"
              :label="$t('form.learn_more_label')"
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
                  <v-text-field
                      v-model="form.language[langCode].learn_more_label"
                      :label="$t('form.learn_more_label')"
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

          <div v-if="form.title" class="mt-6">
            <v-checkbox
                v-model="form.published"
                :label="$t('form.published')"
            />
            <v-checkbox
                v-model="form.isMarkdown"
                :label="$t('form.using_markdown')"
            />
            <AdminTags :tags="form.tags" :label="$t('form.tags')" @data="emittedTags"/>

            {{ $t('form.featured_image') }}
            <AdminUploadimage :initial="[form.featured_image_url]" :multiple="false"
                              :storage="`Posts/${form.title}`"
                              @urls="emittedFeaturedImage"
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
  name: 'AdminPostsEdit',
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
    const form = ref(lodash.cloneDeep(state.posts.one))

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        if (typeof route.value.params.id === 'undefined') {
          form.value = lodash.cloneDeep(state.posts.default)
        }
        if (route.value.params.id) {
          await dispatch('posts/getOne', route.value.params.id).then((res) => {
            if (res !== false) {
              form.value = lodash.cloneDeep(res)
              readonly.value = true
            }
          })
          if (isVendor.value && (state.user.data.role.companyId !== form.value.company.id)) {
            router.push('/admin')
            return
          }
        }
      } catch(e) {
        $system.log({
          comp: 'AdminPostsEdit',
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
          await dispatch('posts/add', form.value)
          $notify.show({ text: i18n.t('notify.success') })
          router.push('/admin/posts')
        } catch (e) {
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
      const response = await dispatch('posts/remove', form.value.slug)
      if (response) {
        $notify.show({ text: i18n.t('notify.success') })
        router.push('/admin/posts')
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
    const emittedCompany = (company) => {
      form.value.company = { ...company }
    }
    const emittedTags = (tags) => {
      form.value.tags = tags
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
      emittedFeaturedImage,
      emittedCompany,
      emittedTags
    }
  }
})
</script>
