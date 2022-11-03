<template>
  <v-container class="admin-container">
    <AdminTitle/>
    <div v-if="loading">
      <v-progress-linear
          class="mb-0"
          indeterminate
      />
    </div>

    <div v-if="form" class="px-3 mt-3">
      <v-row>
        <v-col cols="12" sm="7">
          <v-avatar v-if="form.photoURL">
            <v-img :src="form.photoURL" />
          </v-avatar>
          <h3>{{ form.username }}</h3>
          <h5>{{ form.first_name }} {{ form.last_name }}</h5>
          <h5>{{ form.phone }}</h5>
          <h5>{{ form.email }}</h5>
        </v-col>
        <v-col class="pa-6 mt-3 rounded-lg grey lighten-5" cols="12" sm="5">
          <v-btn block color="secondary" class="white--text elevation-0 mb-2" :to="`/admin/users/edit/${form.id}`">{{ $t('btn.edit') }}</v-btn>
          <v-btn block color="secondary" v-if="form.role.isActive" @click="sendPasswordReset" class="elevation-0 mb-2">{{ $t('btn.send_password_reset') }}</v-btn>
          <v-btn block color="secondary" @click="toggleActivation" class="mb-2 elevation-0">{{ (form.role.isActive) ? $t('btn.deactivate') : $t('btn.reactivate') }}</v-btn>
        </v-col>
      </v-row>

      <v-row class="mt-7 mx-1">
        <v-col class="elevation-6 white">
          <h3>{{ $t('gps.gps') }}</h3>
          <h5>{{ form.gps.city }}</h5>
          <div v-if="form.gps && form.gps.lat && form.gps.lng">
            {{ form.gps.lat }}, {{ form.gps.lng }}
            <a target="_blank" :href="`https://www.google.com/maps/@${form.gps.lat},${form.gps.lng},14z`"><v-img width="600" class="mx-auto" :src="`https://maps.googleapis.com/maps/api/staticmap?center=${form.gps.lat},${form.gps.lng}&zoom=16&scale=1&size=600x500&maptype=hybrid&key=${$config.google.mapsApiKey}&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${form.gps.lat},${form.gps.lng}`" :alt="`Google Map of ${form.gps.lat},${form.gps.lng}`" /></a>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <ElementH4 text="User Alerts" align="left" class="mb-4" />
          <div v-if="!alerts">
            {{ $t('you_have_no_alerts') }}
          </div>
          <div v-if="alerts">
            <template v-for="(alert, key) in alerts">
              <AdminAlertlist :alert="alert" :key="key" />
            </template>
          </div>
        </v-col>
      </v-row>
    </div>
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
  name: 'AdminUsersEdit',
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
      $system, $fire, $notify, i18n
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
    const form = ref(lodash.cloneDeep(state.user.one))
    const alerts = ref([])

    // GET CONTENT
    useFetch(async () => {
      // LOAD USER DATA
      try {
        if (isVendor.value) {
          router.push('/admin')
          return
        }
        if (typeof route.value.params.id === 'undefined') {
          form.value = lodash.cloneDeep(state.user.default)
        }
        if (route.value.params.id) {
          loading.value = true
          await dispatch('user/getOne', route.value.params.id).then((res) => {
            if (res !== false) {
              form.value = lodash.cloneDeep(res)
              readonly.value = true
            }
          })
        }
      } catch(e) {
        $system.log({
          comp: 'AdminUserView',
          msg: 'useFetch',
          val: e
        })
      } finally {
        loading.value = false
      }

      // LOAD ALERTS
      loading.value = true
      try {
        if(!route.value.params.id) {
          return
        }
        alerts.value = []
        await $fire.firestore.collection(`Users/${route.value.params.id}/Alerts`)
            .orderBy('created_at', 'desc')
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                const d = doc.data()
                d.id = doc.id
                alerts.value.push(d)
              })
            })
      } catch (e) {
        $system.log({
          comp: 'AdminDashboard',
          msg: 'AdminUserView > Load Alerts',
          val: e
        })
      } finally {
        loading.value = false
      }
    })

    // METHODS
    const sendPasswordReset = async () => {
      if(form.value.email) {
        await $fire.auth.sendPasswordResetEmail(form.value.email)
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
      }
    }
    const toggleActivation = async () => {
      await dispatch('user/updateField', {
        uid: form.value.id,
        role: {
          isActive: !form.value.role.isActive
        }
      })
      form.value.role.isActive = !form.value.role.isActive
    }

    return {
      loading,
      valid,
      rules,
      readonly,
      form,
      formEl,
      alerts,
      sendPasswordReset,
      toggleActivation
    }
  }
})
</script>
