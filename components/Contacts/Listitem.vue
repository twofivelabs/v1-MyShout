<template>
  <v-list-item v-if="contact.phone">
    <v-avatar
        v-if="contact.name"
        size="40"
        rounded
        color="myshoutDarkGrey"
        class="rounded-lg"
    >
      <span class="white--text headline">{{ contact.name.substr(0,1) }}</span>
    </v-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="(contact && contact.name)" class="ml-2 username myshoutDarkGrey--text">{{ contact.name }}</v-list-item-title>
      </v-list-item-content>
    <v-list-item-action class="mr-3">
      <v-btn @click="invite(contact.phone)"
          class="elevation-0 primary white--text"
          :loading="loading"
      >
        {{ buttonText }}
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import {
  defineComponent,
  ref, useContext
} from '@nuxtjs/composition-api'
import {SmsManager} from '@byteowls/capacitor-sms'

export default defineComponent({
  name: 'ContactsListitem',
  props: {
    contact: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const loading = ref(false)
    const { $capacitor, $system } = useContext()

    // DEFINE
    const url = ref()
    const buttonText = ref('Invite')

    // METHODS
    const invite = async (phone) => {
      const phoneClean = phone.replace(/\D/g, '')
      const body = 'I found this really great app! Check out MyShout. Visit https://myshout.net/download'

      try {
        loading.value = true
        const device = await $capacitor.device()

        if (device.platform !== 'web') {
          await SmsManager.send({
            numbers: [phoneClean],
            text: body,
          })
          // success
          buttonText.value = 'Invited'
        }
      } catch (e) {
        $system.log({
          comp: 'ContactsListitem',
          msg: 'Not able to invite',
          val: e
        })
      } finally {
        loading.value = false
      }
      return url.value
    }

    return {
      loading,
      url,
      buttonText,
      invite,
    }
  }
})
</script>
<style scoped>
.username {
  font-size:19px;
  font-weight:600;
}
</style>
