<template>
  <v-container>
    <AdminTitle/>
    <div v-if="loading">
      <v-progress-linear
          class="mb-0"
          indeterminate
      />
    </div>
    <v-form v-else ref="formEl" @submit.prevent="validate">
      <v-row>
        <v-col cols="12" sm="7">
          <v-row>
            <v-col cols="3">
              Like?
            </v-col>
            <v-col>
              {{ form.like }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              Comment:
            </v-col>
            <v-col>
              {{ form.comment }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              Company:
            </v-col>
            <v-col>
              {{ form.company.id }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              Product:
            </v-col>
            <v-col>
              {{ form.product.id }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              User:
            </v-col>
            <v-col>
              <div>{{ form.user.id }}</div>
              <div><small>{{ form.ip }}</small></div>
            </v-col>
          </v-row>
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
              @click="validate"
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
  name: 'AdminFeedbackEdit',
  middleware: 'admin',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $helper,
      $notify,
      $system,
        i18n
    } = useContext()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const isVendor = ref(state.user.data.role.isVendor)

    // DEFINE CONTENT
    const valid = ref(true)
    const rules = formRules
    const readonly = ref(true)
    const formEl = ref(null)
    const form = ref(lodash.cloneDeep(state.feedback.one))

    // GET CONTENT
    useFetch(async () => {
      try {
        if (typeof route.value.params.id === 'undefined') {
          form.value = lodash.cloneDeep(state.feedback.default)
        }
        if (route.value.params.id) {
          loading.value = true
          await dispatch('feedback/getOne', route.value.params.id).then((res) => {
            if (res !== false) {
              form.value = lodash.cloneDeep(res)
            }
          })
          if (isVendor.value && (state.user.data.role.companyId !== form.value.company.id)) {
            return router.push('/admin')
          }
        }
      } catch(e) {
        $system.log({ comp: 'AdminFeedbackEdit', msg: 'useFetch', val: e })
      } finally {
        loading.value = false
      }
    })

    // METHODS
    const validate = async () => {
      let valid = formEl.value.validate()
      if (!route.value.params.id) {
        valid = await $helper.validSlug('feedback/search', form.value.name)
      }
      if (valid) {
        await submit()
      }
    }
    const submit = async () => {
      if (form.value.name) {
        try {
          await dispatch('feedback/add', form.value)
          $notify.show({ text: i18n.t('notify.success') })
          router.push('/admin/feedback')
        } catch (e) {
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        }
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }
    const remove = async () => {
      const response = await dispatch('feedback/remove', form.value.slug)
      if (response) {
        $notify.show({ text: i18n.t('notify.success') })
        router.push('/admin/feedback')
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }

    return {
      loading,
      valid,
      rules,
      readonly,
      form,
      formEl,
      validate,
      remove
    }
  }
})
</script>
