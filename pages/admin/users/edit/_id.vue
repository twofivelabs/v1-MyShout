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
              v-model="form.username"
              :label="$t('form.username')"
              required
          />
          <v-text-field
              v-model="form.first_name"
              :label="$t('form.first_name')"
          />
          <v-text-field
              v-model="form.last_name"
              :label="$t('form.last_name')"
          />
          <v-row>
            <v-col><v-text-field
                v-model="form.location.city"
                :label="$t('form.city')"
            /></v-col>
            <v-col><v-text-field
                v-model="form.location.country"
                :label="$t('form.country')"
            /></v-col>
          </v-row>
        </v-col>
        <v-col class="pa-6 rounded-lg" cols="12" sm="5"
               style="background-color:rgba(0, 0, 0, 0.03)"
        >
          <v-sheet
              class="pa-4 mb-6 caption"
              elevation="0"
              outlined
              rounded
          >
            <v-simple-table>
              <template v-slot>
                <tbody>
                  <tr>
                    <td>Is Admin</td><td>{{ form.role.isAdmin ? form.role.isAdmin : 'false' }}</td>
                  </tr>
                  <tr v-if="form.created_at">
                    <td>Created</td><td>{{ form.created_at }}</td>
                  </tr>
                  <tr>
                    <td>PIN</td><td>{{ form.securityPin }}</td>
                  </tr>
                  <tr>
                    <td>Location Enabled</td><td>{{ form.permissions.location }}</td>
                  </tr>
                  <tr>
                    <td>Share Location With Friends</td><td>{{ form.permissions.shareLocationWithFriends }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
      // $helper,
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
    const formEl = ref(null)
    const form = ref(lodash.cloneDeep(state.user.default))

    // GET CONTENT
    useFetch(async () => {
      loading.value = true
      try {
        if (isVendor.value) {
          router.push('/admin')
          return
        }
        if (route.value.params.id) {
          await dispatch('user/getOne', route.value.params.id).then((res) => {
            if (res !== false) {
              form.value = lodash.cloneDeep(res)
            }
          })
        }
      } catch(e) {
        $system.log({
          comp: 'AdminUserEdit',
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
      if (valid) {
        await submit()
      }
    }
    const submit = async () => {
      if (form.value.username) {
        loading.value = true
        try {
          await dispatch('user/update', form.value)
          $notify.show({ text: i18n.t('notify.success') })
          router.push('/admin/users')
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

    return {
      loading,
      valid,
      rules,
      form,
      formEl,
      validate,
    }
  }
})
</script>
