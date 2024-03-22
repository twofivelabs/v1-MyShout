<template>
  <div>
    <v-form ref="formEl" @submit.prevent="validate" class="rounded-lg pa-3" style="border:2px solid #ddd;">
      <ElementH4 :text="$t('heading.change_email_address')" align="left" class="mb-4" />
      <v-text-field
          v-model="form.email"
          :rules="rules.email"
          prepend-inner-icon="mdi-email"
          outlined
          background-color="#f8f9fa"
          class="py-0 my-0"
          :label="$t('form.email')"
      />
      <div v-if="showSaveButton">
        <span class="caption">{{ $t('heading.change_email_address_caption') }}</span>
        <v-text-field
            v-model="form.password"
            :rules="rules.password"
            autocomplete="off"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('form.password')"
            prepend-inner-icon="mdi-lock"
            counter
            required
            outlined
            background-color="#f8f9fa"
        />
        <v-btn
            :loading="loading"
            class="text-center"
            color="primary"
            elevation="0"
            type="submit"
        >
          {{ $t('btn.save') }}
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>

import {
  defineComponent,
  useStore,
  computed,
  ref, reactive, useContext, watchEffect,
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'
import lodash from 'lodash'

export default defineComponent({
  name: 'UserChangeemail',
  setup () {
    const { $notify, $system, i18n, $db } = useContext()
    const { state, dispatch } = useStore()
    const loading = ref(false)
    const user = computed(() => state.user.data)

    // DEFINE
    const valid = ref(true)
    const formEl = ref(null)
    const rules = formRules
    const showPassword = ref(false)
    const showSaveButton = ref(false)
    const form = reactive(lodash.cloneDeep(state.user.profile))
    let formOriginal = reactive(lodash.cloneDeep(state.user.profile))

    // METHODS
    const validateEmail = async () => {
      if(!form.email) {
        return false
      }
      if (formOriginal.email === form.email.toLowerCase()) {
        return true
      }
      const hasUsers = await $db.simpleSearch('Users', 'email', form.email.toLowerCase())
      if (hasUsers.length > 0) {
        $notify.show({ text: i18n.t('notify.email_in_use'), color: 'error' })
        return false
      }
      return true
    }
    const validate = async () => {
      valid.value = formEl.value.validate()
      if(!await validateEmail()) {
        valid.value = false
        console.log('Validate email')
        return
      }
      if (!user.value.uid) {
        valid.value = false
        return
      }
      if (valid.value) {
        await save()
      }
    }
    const save = async () => {
      loading.value = true
      try {

        // Sign in
        // const currUser = $fire.auth.currentUser
        const currUser = await $db.fire().capAuth.getCurrentUser()

        await $db.fire().capAuth.signInWithEmailAndPassword({
          email: currUser.user.email,
          password: form.password
        }).then(async () => {
        // await $fire.auth.signInWithEmailAndPassword(currUser.email, form.password).then(async () => {

          console.log('Success signing in')
          // Update Firebase Auth
          await $db.fire().capAuth.updateEmail({ newEmail: form.email }).then(async () => {
            // Update Firebase Doc
            await dispatch('user/updateField', {
              email: form.email
            })
            $notify.show({ text: i18n.t('notify.success'), color: 'success' })
          }).catch((e) => {
            console.log('Error updating authentication', e)
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
          })

        }).catch((e) => {
          console.log('STICKY: Error signing in', e)
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
        })

      } catch (e) {
        $system.log({ comp: 'UserProfile', msg: 'change email', val: e })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
      } finally {
        loading.value = false
      }
    }

    // WATCH
    watchEffect(() => {
      if(form && form.email) {
        if (formOriginal.email !== form.email.toLowerCase()) {
          showSaveButton.value = true
        }
      }
    })

    return {
      loading,
      formEl,
      rules,
      form,
      showPassword,
      showSaveButton,
      validate
    }
  }
})
</script>
