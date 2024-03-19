<template>
  <div>
    <v-app-bar color="white" class="mobileNotch" app fixed top>
      <v-app-bar-nav-icon>
        <NuxtLink to="/settings">
          <v-icon class="pr-2 py-3 pl-2" color="myshoutDarkGrey">
            mdi-arrow-left
          </v-icon>
        </NuxtLink>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">
        <div class="d-flex align-center">
          <ElementH2 align="left" :text="$t('btn.contact_us')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container class="mt-3 mobileNotch px-3">
    <v-row>
      <v-col cols="12" sm="5">
        <div class="mt-8 pr-8">
          <p>
            {{ $t('page.contact_intro') }}
          </p>
          <GlobalSocialmedia />
        </div>
      </v-col>
      <v-col>
        <v-form ref="formEl" @submit.prevent="validate">
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            :label="$t('form.email')"
            required
          />
          <v-row>
            <v-col>
              <v-text-field
                v-model="form.phone"
                :rules="rules.phone"
                :label="$t('form.phone')"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.name"
                :label="$t('form.name')"
              />
            </v-col>
          </v-row>

          <v-textarea
            v-model="form.message"
            :rules="rules.message"
            :label="$t('form.message')"
            required
          />
          <v-btn
            :disabled="!valid"
            block
            color="primary"
            elevation="0"
            class="text-center"
            type="submit"
            :loading="loading"
          >
            {{ $t('btn.send') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<script>

import {
  defineComponent,
  useMeta,
  useContext,
  useStore,
  onMounted,
  ref,
  computed
} from '@nuxtjs/composition-api'

import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'PageContact',
  middleware: 'authenticated',
  setup () {
    const { state, dispatch, getters } = useStore()
    const { $config, $system, $notify, i18n } = useContext()
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    const user = computed(() => state.user.data)
    const profile = computed(() => state.user.profile)
    const loading = ref(false)

    // DEFINE CONTENT
    const valid = ref(true)
    const form = ref({
      email: null,
      name: null,
      userId: null,
      phone: '',
      message: null
    })
    const formEl = ref(null)
    const rules = formRules

    // MOUNTED
    onMounted(() => {
      form.value.email = user.value.email
      if (profile.value.first_name) {
        form.value.name = `${profile.value.first_name} ${profile.value.last_name}`
      }
      form.value.phone = profile.value.phone
      form.value.userId = profile.value.id
    })

    // METHODS
    const validate = async () => {
      loading.value = true
      const valid = await formEl.value.validate()
      if (valid) {
        await send()
      }
      loading.value = false
    }
    const send = async () => {
      await dispatch('messages/add', {
        subject: $config.contact.subject,
        h1: 'You were contacted',
        message: `
          ${form.value.name}
          ${form.value.phone}
          ${form.value.message}
        `,
        to_email: $config.contact.email,
        to_name: $config.contact.name
      }).then(() => {
        $notify.show({ text: i18n.t('notify.success'), color: 'success' })
        form.value.message = null
      }).catch((e) => {
        $system.log({ comp: 'PageContact', msg: 'Form', val: e })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      })
    }

    // PAGE META
    useMeta({
      title: `Contact ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Find out more information by contacting us online.'
      }]
    })

    return {
      loading,
      isLoggedIn,
      user,
      profile,
      valid,
      form,
      formEl,
      rules,
      validate
    }
  },
  head: {}
})
</script>
