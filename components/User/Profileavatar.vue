<template>
  <div @click="takePhoto" style="display:inline-block">
    <v-badge top
             dot
             overlap
             bordered
             offset-x="6"
             offset-y="6"
             :color="(onlineStatus === 'online') ? 'myshoutGreen' : 'myshoutRed'"
    >
      <v-avatar
        :color="color"
        :size="size"
        rounded
        class="rounded-lg"
      >
        <v-icon v-if="loading" color="white">
          mdi-autorenew mdi-spin
        </v-icon>
        <v-icon v-if="!isLoggedIn" color="white">
          mdi-account
        </v-icon>
        <v-img v-else-if="isLoggedIn && photo" :src="photo" />
        <span v-else-if="isLoggedIn && !loading" class="white--text headline">{{ initial }}</span>
      </v-avatar>
    </v-badge>
  </div>
</template>
<script>

import {
  defineComponent,
  useStore,
  computed,
  useContext,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserProfileavatar',
  props: {
    size: {
      type: Number,
      default: () => {
        return 40
      }
    },
    color: {
      type: String,
      default: () => {
        return 'black'
      }
    },
    profile: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  setup () {
    const loading = ref(false)
    const { getters, state, dispatch } = useStore()
    const { $capacitor, $db, $notify, $system, i18n } = useContext()
    const user = computed(() => state.user.data)
    const isLoggedIn = computed(() => getters['user/isLoggedIn'])
    let initial = computed(() => state.user.profile.initial)
    let photo = computed(() => state.user.profile.photoURL)
    let onlineStatus = computed(() => state.user.profile.isOnline.status)

    // METHODS
    const takePhoto = async () => {
      try {
        loading.value = true
        // Take photo and upload it
        const photoBase64 = await $capacitor.cameraTakePicture()
        const photoUrl = await $db.upload({
          path: `/USERS/${user.value.uid}/profile.jpg`,
          data: photoBase64,
          base64: true
        })

        // Update profile
        const updateResponse = await dispatch('user/updateField', {
          photoURL: photoUrl
        })
        // Response
        if (updateResponse) {
          $notify.show({ text: i18n.t('notify.success'), color: 'success' })
        } else {
          $notify.show({ text: i18n.t('notify.error_try_again'), color: 'error' })
        }
      } catch (e) {
        $system.log({
          comp: 'UserProfileavatar',
          msg: 'takePhoto',
          val: e
        })
      } finally {
        loading.value = false
      }
    }

    return {
      isLoggedIn,
      loading,
      initial,
      photo,
      onlineStatus,
      takePhoto
    }
  }
})
</script>
