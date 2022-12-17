<template>
  <div @click="showBottomSheet = true">
    <slot>
      {{ $t('btn.forgot_password') }}
    </slot>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="50vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <v-form ref="formEl" @submit.prevent="validate">
            <v-text-field
                v-model="form.email"
                :rules="rules.email"
                :label="$t('form.email')"
                class="mx-3 my-3"
                required
            />
            <div class="text-center">
              <v-btn
                  :loading="loading"
                  color="primary"
                  elevation="0"
                  class="text-center"
                  type="submit"
              >
                {{ $t('btn.send_password_reset') }}
              </v-btn>
            </div>
          </v-form>

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent,
  ref, useContext,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'FormsForgotpasswordbtn',
  directives: { Touch },
  setup() {
    const { $system, $fire, i18n, $notify } = useContext()
    const loading = ref(false)
    const showBottomSheet = ref(false)
    const form = ref({
      email: ''
    })
    const formEl = ref(null)
    const rules = formRules

    // METHODS
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }
    const validate = async () => {
      loading.value = true
      const valid = await formEl.value.validate()
      if (valid) {
        await forgotPassword()
      }
      loading.value = false
    }
    const forgotPassword = async () => {
      if (form.value.email) {
        try {
          await $fire.auth.sendPasswordResetEmail(form.value.email)
          $notify.show({ text: i18n.t('notify.check_your_email') })

        } catch (e) {
          $system.log({
            comp: 'ForgotPasswordPop',
            msg: 'Reset Password',
            val: e
          })
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        }
      } else {
        $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
      }
    }


    return {
      loading,
      showBottomSheet,
      swipe,
      rules,
      form,
      formEl,
      validate,
      forgotPassword
    }
  }
})
</script>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  border: 2px solid #f0f0ef;
  background: #f9f9f9;
  margin-bottom: 15px;
}
.v-list-item__title {
  font-size: 1.1rem;
  font-weight: 600;
}
.v-list-item__subtitle {
  font-size:0.9rem;
}
.v-list-item__icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  text-align: center;
}
.v-list-item__icon .v-icon {
  font-size:33px;
  width:100%;
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right:10px;
}
</style>
