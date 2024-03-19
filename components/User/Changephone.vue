<template>
  <div>
    <v-form ref="formEl" @submit.prevent="validate" class="rounded-lg pa-3" style="border:2px solid #ddd;">
      <ElementH4 :text="$t('heading.change_phone_number')" align="left" class="mb-4" />
      <v-text-field v-model="form.phone" :rules="rules.phone" prepend-inner-icon="mdi-phone" outlined background-color="#f8f9fa" class="py-0 my-0" :label="$t('form.phone')" />
      <div v-if="showSaveButton">
        <span class="caption">{{ $t('heading.change_phone_number_caption') }}</span>
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
  name: 'UserChangephone',
  setup () {
    const { $notify, $system, $fire, $helper, i18n } = useContext()
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
    const validatePhone = async () => {
      if (!form.phone) {
        return false
      }

      const hasUsers = await dispatch('user/search', {
        field: 'phone',
        operator: '==',
        term: $helper.formatPhone(form.phone, 'db'),
        limit: 3
      })
      if (hasUsers.length > 0) {
        $notify.show({ text: i18n.t('notify.phone_in_use'), color: 'error' })
        return false
      }
      return true;
    }
    const validate = async () => {
      valid.value = formEl.value.validate()
      if(!await validatePhone()) {
        valid.value = false
        console.log('Validate phone')
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
        const currUser = $fire.auth.currentUser
        await $fire.auth.signInWithEmailAndPassword(currUser.email, form.password).then(async () => {

          console.log('Success signing in')
          // Update Firebase Auth
          $fire.auth.currentUser.updateEmail(form.email).then(async () => {
            // Update Firebase Doc
            await dispatch('user/updateField', {
              email: form.email
            })
            $notify.show({ text: i18n.t('notify.success'), color: 'success' })
          }).catch((e) => {
            console.log('STICKY: Error updating authentication', e)
            $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
          })

        }).catch((e) => {
          console.log('STICKY: Error signing in', e)
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
        })

      } catch (e) {
        $system.log({ comp: 'UserProfile', msg: 'change phone', val: e })
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'red' })
      } finally {
        loading.value = false
      }
    }

    // WATCH
    watchEffect(() => {
      if (formOriginal.phone !== form.phone.toLowerCase()) {
        showSaveButton.value = true
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
