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

        <!-- USERNAME SUB -->
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

        <!-- EMAIL SUB -->
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

        <!-- COUNTRY SUB -->
        <div v-else-if="step===3" class="text-center">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.country_sub') }}</h5>
          <v-form ref="formCountry" @submit.prevent="validateCountry">
<!--            <v-text-field v-model="form.country"
              :rules="rules.country"
              :label="$t('form.country')"
              required
              outlined
              background-color="#f8f9fa"
            />    -->
            <v-select
                v-model="form.country"
                :items="countryItems"
                item-text="name"
                item-value="code"
                class="py-0 my-0"
                background-color="#f8f9fa"
                :label="$t('form.country')"
                outlined
                required
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

        <!-- PHOTO AVATAR -->
        <div v-else-if="step===4" class="text-center">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.add_photo_sub') }}</h5>

          <UserProfileavatar :user="user" :size="120" class="mt-5 mx-auto" />

          <div class="text-center mt-15">
            <v-btn
              :loading="loading"
              color="primary"
              fab
              dark
              x-large
              class="white--text"
              @click="setProfilePhoto"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- LOCATION PERMISSIONS -->
        <div v-else-if="step===5" class="text-center">
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

        <!-- NOTIFICATION PERMISSIONS -->
        <div v-else-if="step===6" class="text-center">
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
                class="white--text mt-10"
                color="primary"
                type="submit"
                x-large
                dark
            >
              <v-icon>mdi-check</v-icon>
              {{ $t('btn.yes_i_agree') }}
            </v-btn>
          </div>
        </div>

        <!-- HOW DID YOU HEAR? -->
        <div v-else-if="step===7" class="text-center">
          <h5 class="text-h5 text-center mb-6">{{ $t('onboarding.how_did_you_hear') }}</h5>
          <v-text-field v-model="form.hear"
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
              @click="setHowDidYouHear"
              class="white--text"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- THANK YOU -->
        <div v-else-if="step===8" class="text-center">
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
              @click="completeProfile"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <div v-else>
          <v-skeleton-loader v-for="x of 4" :key="`skeleton-${x}`" width="100%" max-height="50" type="text" class="mb-6" />
        </div>
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
  useRouter,
  watch
} from '@nuxtjs/composition-api'
import formRules from '~/classes/formRules'

export default defineComponent({
  name: 'AuthSetupProfile',
  layout: 'onboarding',
  middleware: 'authenticated',
  setup () {
    const {
      $config,
      $helper,
      $notify,
      $capacitor,
      i18n,
      $db
    } = useContext()
    const { state } = useStore()
    const router = useRouter()
    const user = computed(() => state.user.profile)
    const userData = computed(() => state.user.data)

    const loading = ref(false)
    const rules = formRules
    const step = ref(0)
    const formUsername = ref()
    const formEmail = ref()
    const formCountry = ref()
    const form = ref({
      username: '',
      email: '',
      country: '',
      hear: ''
    })

    watch(user, async (profile) => {
      //console.log('WATCHING USER', profile)
      if (profile) {
        if (profile.onboarded < 1) step.value = 1;
        else if (profile.onboarded < 2) step.value = 2;
        else if (profile.onboarded < 3) step.value = 3;
        else if (profile.onboarded < 4) step.value = 4;
        else if (profile.onboarded < 5) step.value = 5;
        else if (profile.onboarded < 6) step.value = 6;
        else if (profile.onboarded < 7) step.value = 7;
        else if (profile.onboarded < 8) step.value = 8;
      } else {
        step.value = 1;
      }
    }, { immediate: true, deep: true }); // Correct syntax for options object

    // METHODS
    const validateUsername = async () => {
      loading.value = true

      const isValid = await formUsername.value.validate()

      if (isValid) {
        const username = $helper.slugify(form.value.username, '')

        if(await userExists(username)) {
          $notify.show({ text: i18n.t('notify.username_in_use'), color: 'red' })

        } else {
          await $db.save(`Users/${userData.value.uid}`, {
            username: username,
            onboarded: user.value.email ? 2 : 1
          }).then(() => {
            $notify.show({ text: i18n.t('notify.success'), color: 'green' })
            step.value = user.value.email ? 3 : 2
          })
        }
      }

      loading.value = false
    }
    const userExists = async (username) => {
      const hasUsers = await $db.simpleSearch('Users', 'username', username)
      return hasUsers.length > 0
    }
    const validateEmail = async () => {
      loading.value = true
      const isValid = await formEmail.value.validate()

      if (isValid) {
        const email = form.value.email

        if(await emailExists(email)) {
          $notify.show({ text: i18n.t('onboarding.error_email_in_use'), color: 'red' })
        } else {
          await $db.save(`Users/${userData.value.uid}`, {
            email: email,
            onboarded: 1
          }).then(() => {
            $notify.show({ text: i18n.t('notify.success'), color: 'green' })
            step.value = 3
          })
        }
      }

      loading.value = false
    }
    const emailExists = async (email) => {
      const hasUsers = await $db.simpleSearch('Users', 'email', email)
      return hasUsers.length > 0
    }
    const validateCountry = async () => {
      loading.value = true
      const isValid = await formCountry.value.validate()

      if (isValid) {
        await $db.save(`Users/${userData.value.uid}`, {
          country: form.value.country,
          location: {
            country: form.value.country
          },
          onboarded: 3
        })
        /* await dispatch('user/updateField', {
          country: form.value.country,
          'location.country': form.value.country,
          onboarded: 3
        }) */

        step.value = 4
      }

      loading.value = false
    }
    const setProfilePhoto = async () => {
      await $db.save(`Users/${userData.value.uid}`, {
        onboarded: 4
      })

      step.value = 5
    }
    const setLocationPermissions = async () => {
      loading.value = true

      setTimeout(async () => {
        $capacitor.gpsInit()

        await $db.save(`Users/${userData.value.uid}`, {
          permissions: {
            location: true
          },
          onboarded: 5
        })

        step.value = 6
        loading.value = false
      },1000)
    }
    const setNotificationPermissions = () => {
      loading.value = true

      setTimeout(async () => {
        // PUSH NOTIFICATION PERMISSIONS
        await $capacitor.pushNotificationsRequestAndRegisterPermissions().then(async () => {
          await $capacitor.pushNotificationsListeners()
          await $db.save(`Users/${userData.value.uid}`, {
            permissions: {
              notifications: true
            },
            onboarded: 6
          })
        })

        // MICROPHONE PERMISSIONS
        await $capacitor.microphonePermissions()

        loading.value = false
        step.value = 7

      },1500)
    }
    const setHowDidYouHear = async () => {
      if (form.hear) {
        await $db.save(`Users/${userData.value.uid}`, {
          how_did_you_hear: form.hear,
          onboarded: 7
        })
      }

      return step.value = 8
    }
    const completeProfile = async () => {
      const device = await $capacitor.device()
      await $db.save(`Users/${userData.value.uid}`, {
        onboarded: 8,
        device: {
          model: device.model,
          operatingSystem: device.operatingSystem,
          osVersion: device.osVersion,
          platform: device.platform
        }
      })

      return router.push('/')
    }
    const countryItems = computed(() => {
      return [
        {name: 'Afghanistan', code: 'AF'},
        {name: 'Åland Islands', code: 'AX'},
        {name: 'Albania', code: 'AL'},
        {name: 'Algeria', code: 'DZ'},
        {name: 'American Samoa', code: 'AS'},
        {name: 'AndorrA', code: 'AD'},
        {name: 'Angola', code: 'AO'},
        {name: 'Anguilla', code: 'AI'},
        {name: 'Antarctica', code: 'AQ'},
        {name: 'Antigua and Barbuda', code: 'AG'},
        {name: 'Argentina', code: 'AR'},
        {name: 'Armenia', code: 'AM'},
        {name: 'Aruba', code: 'AW'},
        {name: 'Australia', code: 'AU'},
        {name: 'Austria', code: 'AT'},
        {name: 'Azerbaijan', code: 'AZ'},
        {name: 'Bahamas', code: 'BS'},
        {name: 'Bahrain', code: 'BH'},
        {name: 'Bangladesh', code: 'BD'},
        {name: 'Barbados', code: 'BB'},
        {name: 'Belarus', code: 'BY'},
        {name: 'Belgium', code: 'BE'},
        {name: 'Belize', code: 'BZ'},
        {name: 'Benin', code: 'BJ'},
        {name: 'Bermuda', code: 'BM'},
        {name: 'Bhutan', code: 'BT'},
        {name: 'Bolivia', code: 'BO'},
        {name: 'Bosnia and Herzegovina', code: 'BA'},
        {name: 'Botswana', code: 'BW'},
        {name: 'Bouvet Island', code: 'BV'},
        {name: 'Brazil', code: 'BR'},
        {name: 'British Indian Ocean Territory', code: 'IO'},
        {name: 'Brunei Darussalam', code: 'BN'},
        {name: 'Bulgaria', code: 'BG'},
        {name: 'Burkina Faso', code: 'BF'},
        {name: 'Burundi', code: 'BI'},
        {name: 'Cambodia', code: 'KH'},
        {name: 'Cameroon', code: 'CM'},
        {name: 'Canada', code: 'CA'},
        {name: 'Cape Verde', code: 'CV'},
        {name: 'Cayman Islands', code: 'KY'},
        {name: 'Central African Republic', code: 'CF'},
        {name: 'Chad', code: 'TD'},
        {name: 'Chile', code: 'CL'},
        {name: 'China', code: 'CN'},
        {name: 'Christmas Island', code: 'CX'},
        {name: 'Cocos (Keeling) Islands', code: 'CC'},
        {name: 'Colombia', code: 'CO'},
        {name: 'Comoros', code: 'KM'},
        {name: 'Congo', code: 'CG'},
        {name: 'Congo, The Democratic Republic of the', code: 'CD'},
        {name: 'Cook Islands', code: 'CK'},
        {name: 'Costa Rica', code: 'CR'},
        {name: 'Cote D\'Ivoire', code: 'CI'},
        {name: 'Croatia', code: 'HR'},
        {name: 'Cuba', code: 'CU'},
        {name: 'Cyprus', code: 'CY'},
        {name: 'Czech Republic', code: 'CZ'},
        {name: 'Denmark', code: 'DK'},
        {name: 'Djibouti', code: 'DJ'},
        {name: 'Dominica', code: 'DM'},
        {name: 'Dominican Republic', code: 'DO'},
        {name: 'Ecuador', code: 'EC'},
        {name: 'Egypt', code: 'EG'},
        {name: 'El Salvador', code: 'SV'},
        {name: 'Equatorial Guinea', code: 'GQ'},
        {name: 'Eritrea', code: 'ER'},
        {name: 'Estonia', code: 'EE'},
        {name: 'Ethiopia', code: 'ET'},
        {name: 'Falkland Islands (Malvinas)', code: 'FK'},
        {name: 'Faroe Islands', code: 'FO'},
        {name: 'Fiji', code: 'FJ'},
        {name: 'Finland', code: 'FI'},
        {name: 'France', code: 'FR'},
        {name: 'French Guiana', code: 'GF'},
        {name: 'French Polynesia', code: 'PF'},
        {name: 'French Southern Territories', code: 'TF'},
        {name: 'Gabon', code: 'GA'},
        {name: 'Gambia', code: 'GM'},
        {name: 'Georgia', code: 'GE'},
        {name: 'Germany', code: 'DE'},
        {name: 'Ghana', code: 'GH'},
        {name: 'Gibraltar', code: 'GI'},
        {name: 'Greece', code: 'GR'},
        {name: 'Greenland', code: 'GL'},
        {name: 'Grenada', code: 'GD'},
        {name: 'Guadeloupe', code: 'GP'},
        {name: 'Guam', code: 'GU'},
        {name: 'Guatemala', code: 'GT'},
        {name: 'Guernsey', code: 'GG'},
        {name: 'Guinea', code: 'GN'},
        {name: 'Guinea-Bissau', code: 'GW'},
        {name: 'Guyana', code: 'GY'},
        {name: 'Haiti', code: 'HT'},
        {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
        {name: 'Holy See (Vatican City State)', code: 'VA'},
        {name: 'Honduras', code: 'HN'},
        {name: 'Hong Kong', code: 'HK'},
        {name: 'Hungary', code: 'HU'},
        {name: 'Iceland', code: 'IS'},
        {name: 'India', code: 'IN'},
        {name: 'Indonesia', code: 'ID'},
        {name: 'Iran, Islamic Republic Of', code: 'IR'},
        {name: 'Iraq', code: 'IQ'},
        {name: 'Ireland', code: 'IE'},
        {name: 'Isle of Man', code: 'IM'},
        {name: 'Israel', code: 'IL'},
        {name: 'Italy', code: 'IT'},
        {name: 'Jamaica', code: 'JM'},
        {name: 'Japan', code: 'JP'},
        {name: 'Jersey', code: 'JE'},
        {name: 'Jordan', code: 'JO'},
        {name: 'Kazakhstan', code: 'KZ'},
        {name: 'Kenya', code: 'KE'},
        {name: 'Kiribati', code: 'KI'},
        {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
        {name: 'Korea, Republic of', code: 'KR'},
        {name: 'Kuwait', code: 'KW'},
        {name: 'Kyrgyzstan', code: 'KG'},
        {name: 'Lao People\'S Democratic Republic', code: 'LA'},
        {name: 'Latvia', code: 'LV'},
        {name: 'Lebanon', code: 'LB'},
        {name: 'Lesotho', code: 'LS'},
        {name: 'Liberia', code: 'LR'},
        {name: 'Libyan Arab Jamahiriya', code: 'LY'},
        {name: 'Liechtenstein', code: 'LI'},
        {name: 'Lithuania', code: 'LT'},
        {name: 'Luxembourg', code: 'LU'},
        {name: 'Macao', code: 'MO'},
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
        {name: 'Madagascar', code: 'MG'},
        {name: 'Malawi', code: 'MW'},
        {name: 'Malaysia', code: 'MY'},
        {name: 'Maldives', code: 'MV'},
        {name: 'Mali', code: 'ML'},
        {name: 'Malta', code: 'MT'},
        {name: 'Marshall Islands', code: 'MH'},
        {name: 'Martinique', code: 'MQ'},
        {name: 'Mauritania', code: 'MR'},
        {name: 'Mauritius', code: 'MU'},
        {name: 'Mayotte', code: 'YT'},
        {name: 'Mexico', code: 'MX'},
        {name: 'Micronesia, Federated States of', code: 'FM'},
        {name: 'Moldova, Republic of', code: 'MD'},
        {name: 'Monaco', code: 'MC'},
        {name: 'Mongolia', code: 'MN'},
        {name: 'Montserrat', code: 'MS'},
        {name: 'Morocco', code: 'MA'},
        {name: 'Mozambique', code: 'MZ'},
        {name: 'Myanmar', code: 'MM'},
        {name: 'Namibia', code: 'NA'},
        {name: 'Nauru', code: 'NR'},
        {name: 'Nepal', code: 'NP'},
        {name: 'Netherlands', code: 'NL'},
        {name: 'Netherlands Antilles', code: 'AN'},
        {name: 'New Caledonia', code: 'NC'},
        {name: 'New Zealand', code: 'NZ'},
        {name: 'Nicaragua', code: 'NI'},
        {name: 'Niger', code: 'NE'},
        {name: 'Nigeria', code: 'NG'},
        {name: 'Niue', code: 'NU'},
        {name: 'Norfolk Island', code: 'NF'},
        {name: 'Northern Mariana Islands', code: 'MP'},
        {name: 'Norway', code: 'NO'},
        {name: 'Oman', code: 'OM'},
        {name: 'Pakistan', code: 'PK'},
        {name: 'Palau', code: 'PW'},
        {name: 'Palestinian Territory, Occupied', code: 'PS'},
        {name: 'Panama', code: 'PA'},
        {name: 'Papua New Guinea', code: 'PG'},
        {name: 'Paraguay', code: 'PY'},
        {name: 'Peru', code: 'PE'},
        {name: 'Philippines', code: 'PH'},
        {name: 'Pitcairn', code: 'PN'},
        {name: 'Poland', code: 'PL'},
        {name: 'Portugal', code: 'PT'},
        {name: 'Puerto Rico', code: 'PR'},
        {name: 'Qatar', code: 'QA'},
        {name: 'Reunion', code: 'RE'},
        {name: 'Romania', code: 'RO'},
        {name: 'Russian Federation', code: 'RU'},
        {name: 'RWANDA', code: 'RW'},
        {name: 'Saint Helena', code: 'SH'},
        {name: 'Saint Kitts and Nevis', code: 'KN'},
        {name: 'Saint Lucia', code: 'LC'},
        {name: 'Saint Pierre and Miquelon', code: 'PM'},
        {name: 'Saint Vincent and the Grenadines', code: 'VC'},
        {name: 'Samoa', code: 'WS'},
        {name: 'San Marino', code: 'SM'},
        {name: 'Sao Tome and Principe', code: 'ST'},
        {name: 'Saudi Arabia', code: 'SA'},
        {name: 'Senegal', code: 'SN'},
        {name: 'Serbia and Montenegro', code: 'CS'},
        {name: 'Seychelles', code: 'SC'},
        {name: 'Sierra Leone', code: 'SL'},
        {name: 'Singapore', code: 'SG'},
        {name: 'Slovakia', code: 'SK'},
        {name: 'Slovenia', code: 'SI'},
        {name: 'Solomon Islands', code: 'SB'},
        {name: 'Somalia', code: 'SO'},
        {name: 'South Africa', code: 'ZA'},
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
        {name: 'Spain', code: 'ES'},
        {name: 'Sri Lanka', code: 'LK'},
        {name: 'Sudan', code: 'SD'},
        {name: 'Suriname', code: 'SR'},
        {name: 'Svalbard and Jan Mayen', code: 'SJ'},
        {name: 'Swaziland', code: 'SZ'},
        {name: 'Sweden', code: 'SE'},
        {name: 'Switzerland', code: 'CH'},
        {name: 'Syrian Arab Republic', code: 'SY'},
        {name: 'Taiwan, Province of China', code: 'TW'},
        {name: 'Tajikistan', code: 'TJ'},
        {name: 'Tanzania, United Republic of', code: 'TZ'},
        {name: 'Thailand', code: 'TH'},
        {name: 'Timor-Leste', code: 'TL'},
        {name: 'Togo', code: 'TG'},
        {name: 'Tokelau', code: 'TK'},
        {name: 'Tonga', code: 'TO'},
        {name: 'Trinidad and Tobago', code: 'TT'},
        {name: 'Tunisia', code: 'TN'},
        {name: 'Turkey', code: 'TR'},
        {name: 'Turkmenistan', code: 'TM'},
        {name: 'Turks and Caicos Islands', code: 'TC'},
        {name: 'Tuvalu', code: 'TV'},
        {name: 'Uganda', code: 'UG'},
        {name: 'Ukraine', code: 'UA'},
        {name: 'United Arab Emirates', code: 'AE'},
        {name: 'United Kingdom', code: 'GB'},
        {name: 'United States', code: 'US'},
        {name: 'United States Minor Outlying Islands', code: 'UM'},
        {name: 'Uruguay', code: 'UY'},
        {name: 'Uzbekistan', code: 'UZ'},
        {name: 'Vanuatu', code: 'VU'},
        {name: 'Venezuela', code: 'VE'},
        {name: 'Viet Nam', code: 'VN'},
        {name: 'Virgin Islands, British', code: 'VG'},
        {name: 'Virgin Islands, U.S.', code: 'VI'},
        {name: 'Wallis and Futuna', code: 'WF'},
        {name: 'Western Sahara', code: 'EH'},
        {name: 'Yemen', code: 'YE'},
        {name: 'Zambia', code: 'ZM'},
        {name: 'Zimbabwe', code: 'ZW'}
      ]
    })


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
      formUsername, formEmail, formCountry,
      countryItems,
      validateUsername, validateEmail, validateCountry,
      setProfilePhoto,
      setLocationPermissions, setNotificationPermissions,
      setHowDidYouHear, completeProfile
    }
  },
  head: {}
})
</script>
