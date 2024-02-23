<template>
  <v-container class="ma-0 pa-0 lightgray" height="100vh" fluid>
    <div class="d-flex flex-column justify-space-between align-center" style="height:100vh">

      <!-- TOP PORTION -->
      <div class="d-flex flex-column justify-space-around align-center" style=" width:100vw; height:23vh;">
        <OnboardingCardheader class="gray--text mx-14" :h1="$t('onboarding.profile_setup_sub')" />
      </div>

      <!-- WHITE CARD -->
      <div class="white pa-10 rounded-t-xl rounded-b-0 elevation-13" style="width:100vw; max-width:700px; height:77vh;" v-anime="{
        translateY: [200, 0],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 600,
        delay:600
      }">
        <div v-if="step===1">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.username_sub') }}</h5>
          <v-form ref="formUsername" @submit.prevent="validateUsername">
            <v-text-field v-model="form.username"
              :rules="rules.username"
              :label="$t('form.username')"
              prepend-inner-icon="mdi-at"
              required
              outlined
              background-color="#f8f9fa"
            />
            <div class="text-center mt-15">
              <v-btn
                :loading="loading"
                color="primary"
                fab
                dark
                x-large
                type="submit"
                class="white--text"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-form>
        </div>

        <div v-else-if="step===2">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.email_sub') }}</h5>
          <v-form ref="formEmail" @submit.prevent="validateEmail">
            <v-text-field v-model="form.email"
              :rules="rules.email"
              :label="$t('form.email')"
              prepend-inner-icon="mdi-at"
              required
              outlined
              background-color="#f8f9fa"
            />
            <div class="text-center mt-15">
              <v-btn
                  :loading="loading"
                  color="primary"
                  fab
                  dark
                  x-large
                  type="submit"
                  class="white--text"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-form>
        </div>

        <div v-else-if="step===3" class="text-center">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.add_photo_sub') }}</h5>

          <UserProfileavatar :user="user" :size="120" class="mt-5 mx-auto" />

          <div class="text-center mt-15">
            <v-btn
              :loading="loading"
              color="primary"
              fab
              dark
              x-large
              type="submit"
              class="white--text"
              @click="step=4"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>

        <div v-else-if="step===4" class="text-center">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.enable_location_permissions_heading') }}</h5>

          <h5 class="text-h5 text-center mb-6">
            {{ $t('onboarding.enable_location_permissions_sub') }}
          </h5>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.location_requirements_1') }}
          </h6>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.location_requirements_3') }}
          </h6>

          <v-icon
              v-if="user.permissions.location"
              class="mt-7"
              color="green"
              size="120"
              v-anime="{
                translateY: [100, 0],
                duration: 1200
              }"
          >
            mdi-checkbox-marked-circle-outline
          </v-icon>

          <div class="text-center mt-15">
            <OnboardingPrivacypolicy :showTermsText="false" class="" />

            <v-btn
              :loading="loading"
              @click="setLocationPermissions"
              color="primary"
              dark
              x-large
              type="submit"
              class="white--text mt-10"
            >
              <v-icon>mdi-check</v-icon>
              {{ $t('btn.yes_i_agree') }}
            </v-btn>
          </div>
        </div>

        <div v-else-if="step===5" class="text-center">
          <h5 class="text-h5 text-center mb-6">
            {{ $t('onboarding.enable_notification_permissions') }}
          </h5>

          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.notification_requirements_1') }}
          </h6>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.notification_requirements_2') }}
          </h6>
          <h6 class="primary--text text-h6 text-center mb-6">
            {{ $t('onboarding.notification_requirements_3') }}
          </h6>
          <h6 class="primary--text text-h6 text-center mb-6">
            <v-icon>mdi-microphone</v-icon> {{ $t('onboarding.notification_requirements_4') }}
          </h6>

          <v-icon
              v-if="user.permissions.notifications"
              class="mt-7"
              color="green"
              size="120"
              v-anime="{
                translateY: [100, 0],
                duration: 600
              }"
          >
            mdi-checkbox-marked-circle-outline
          </v-icon>

          <div class="text-center mt-15">
            <OnboardingPrivacypolicy :showTermsText="false" class="" />

            <v-btn
                :loading="loading"
                @click="setNotificationPermissions"
                color="primary"
                dark
                x-large
                type="submit"
                class="white--text mt-10"
            >
              <v-icon>mdi-check</v-icon>
              {{ $t('btn.yes_i_agree') }}
            </v-btn>
          </div>
        </div>

        <div v-else-if="step===6" class="text-center">
          <div>
            <h5 class="text-h5 text-center">{{ $t('onboarding.thank_you_sub') }}</h5>
          </div>
          <v-spacer />
          <v-btn
              color="primary"
              fab
              dark
              x-large
              class="white--text mt-15"
              to="/"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <div v-else>{{ step }}</div>
      </div>
    </div>
  </v-container>
</template>
<script>

import {
  defineComponent,
  ref,
  computed,
  useContext,
  useMeta,
  useStore,
  // useRouter,
  watch
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'AuthUsername',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config,
      $helper,
      $notify,
      $capacitor,
      i18n
    } = useContext()
    const { state, dispatch } = useStore()
    // const router = useRouter()

    const user = computed(() => state.user.profile)

    const loading = ref(false)
    const rules = formRules
    const step = ref(6)
    const formUsername = ref()
    const formEmail = ref()
    const form = ref({
      username: '',
      email: '',
    })

    // Watch for changes in user state to update the step
    watch(user.value, (profile) => {
      if (profile) {
        if (!profile.username) {
          // Force user to set a username
          step.value = 1;
        } else if (!profile.email) {
          // If user authenticated via Phone, force to set a email address
          step.value = 2;
        }
      }
    })

    // METHODS
    const validateUsername = async () => {
      loading.value = true

      const isValid = await formUsername.value.validate()

      if (isValid) {
        const username = $helper.slugify(form.value.username, '')

        if(await userExists(username)) {
          $notify.show({ text: i18n.t('notify.username_in_use'), color: 'red' })
        } else {
          await dispatch('user/updateField', {
            username: username
          })
          step.value = user.value.email ? 3 : 2
        }
      }

      loading.value = false
    }
    const userExists = async (username) => {
      const hasUsers = await dispatch('user/search', {
        field: 'username',
        operator: '==',
        term: username,
        limit: 3
      })
      return hasUsers.length > 0;
    }

    const validateEmail = async () => {
      loading.value = true
      const isValid = await formEmail.value.validate()

      if (isValid) {
        const email = form.value.email

        if(await emailExists(email)) {
          $notify.show({ text: i18n.t('onboarding.error_email_in_use'), color: 'red' })
        } else {
          await dispatch('user/updateField', {
            email: email
          })
          step.value = 3
        }
      }

      loading.value = false
    }
    const emailExists = async (email) => {
      const hasUsers = await dispatch('user/search', {
        field: 'email',
        operator: '==',
        term: email,
        limit: 3
      })
      return hasUsers.length > 0;
    }

    const setLocationPermissions = async () => {
      loading.value = true

      setTimeout(async () => {
        $capacitor.gpsInit()
        // await $capacitor.positionPermissions()
        // await $services.getSetUserGeneralLocation()

        await dispatch('user/updateField', {
          permissions: {
            location: true
          }
        })

        step.value = 5
        loading.value = false
      },1000)
    }

    const setNotificationPermissions = () => {
      loading.value = true

      setTimeout(async () => {
        // PUSH NOTIFICATION PERMISSIONS
        await $capacitor.pushNotificationsRequestAndRegisterPermissions().then(async () => {
          await $capacitor.pushNotificationsListeners()
          await dispatch('user/updateField', {
            permissions: {
              notifications: true
            }
          })
        })

        // MICROPHONE PERMISSIONS
        await $capacitor.microphonePermissions()

        loading.value = false
        step.value = 6

      },1500)
    }

    // PAGE META
    useMeta({
      title: `${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `Discover ${$config.appTitle}`
      }]
    })

    return {
      loading,
      user, step,
      rules,
      form,
      formUsername, formEmail,
      validateUsername, validateEmail,
      setLocationPermissions, setNotificationPermissions
    }
  },
  head: {}
})
</script>
