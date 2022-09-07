<template>
  <div>
    <v-form ref="formEl" @submit.prevent="validate" class="rounded-lg pa-3" style="border:2px solid #ddd;">
      <ElementH4 text="Change Email Address" align="left" class="mb-4" />
      <v-text-field
          v-model="form.email"
          :rules="rules.email"
          prepend-inner-icon="mdi-email"
          outlined
          background-color="#f8f9fa"
          class="py-0 my-0"
          label="Email"
      />
      <div v-if="showSaveButton">
        <span class="caption">To change your email, please provide your password.</span>
        <v-text-field
            v-model="form.password"
            :rules="rules.password"
            autocomplete="off"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
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
          Save
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
    const { $notify, $system, $fire } = useContext()
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
      const hasUsers = await dispatch('user/search', {
        field: 'email',
        operator: '==',
        term: form.email.toLowerCase(),
        limit: 3
      })
      if (hasUsers.length > 0) {
        $notify.show({ text: 'Email invalid or is in use by another user', color: 'error' })
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
      try {
        loading.value = true

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
            $notify.show({
              text: 'Saved',
              color: 'success'
            })
          }).catch((e) => {
            console.log('Error updating authentication', e)
            $notify.show({
              text: 'Error updating authentication',
              color: 'red'
            })
          })

        }).catch((e) => {
          console.log('Error signing in', e)
          $notify.show({
            text: 'Error, Not able to sign in',
            color: 'red'
          })
        })

      } catch (e) {
        $system.log({
          comp: 'UserProfile',
          msg: 'change email',
          val: e
        })
        $notify.show({
          text: 'Error, try again',
          color: 'red'
        })
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
