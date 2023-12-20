<template>
  <div>
    <v-row>
      <v-col cols="12" align="center">
        <v-btn v-if="showButton" @click="showInviteSheet" color="primary"  class="elevation-0">
          {{ $t('contacts.invite_friends') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="75vh" class="rounded-t-xl">
        <div class="ma-3" style="padding-bottom:180px;">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 align="center" :text="$t('contacts.invite_friends')" />
          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH4 v-if="!loading && (contacts && contacts.length === 0)" align="center" class="my-5" :text="$t('contacts.no_contacts')"/>

          <template v-for="(contact, index) of contacts">
            <ContactsListitem class="mt-2" :contact="contact" :key="index" />
          </template>

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {
  defineComponent, onMounted,
  ref, useContext, watch
  // useStore
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'
import lodash from 'lodash'

export default defineComponent({
  name: 'ContactsInvitebtn',
  directives: { Touch },
  setup() {
    const { $system, $capacitor, $helper } = useContext()
    // const {  } = useStore()
    const loading = ref(false)
    const showButton = ref(true)
    const isWeb = ref(false)
    const showBottomSheet = ref(false)
    const device = ref()
    const contacts = ref([])

    // METHODS
    const showInviteSheet = async () => {
      try {
        loading.value = true
        showBottomSheet.value = true
      } catch(e) {
        $system.log({
          comp: 'ContactsInvitebtn',
          msg: 'showInviteSheet',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const swipe = (direction) => {
      if (direction === 'Down') {
        showBottomSheet.value = false
      }
    }

    // MOUNT
    onMounted(async () => {
      device.value = await $capacitor.device()
      if (device.value && device.value.platform && (device.value.platform === 'web' || typeof device.value.platform === 'undefined' || device.value.platform === null)) {
        isWeb.value = true
        showButton.value = false
      }
    })

    watch(showBottomSheet, async () => {
      if (showBottomSheet.value === true) {
        loading.value = true
        try {
          // Needs to be two
          const deviceContacts = await $capacitor.getContacts().then(async () => {
            return await $capacitor.getContacts()
          })
          // console.log('Device Contacts', JSON.stringify(deviceContacts))
          const unsortedContacts = $helper.normalizeDeviceContacts(deviceContacts)
          contacts.value = lodash.sortBy(unsortedContacts, ['name'])
          // console.log('STICKY: NORMALIZED:' + JSON.stringify(contacts.value))
        } catch(e) {
          $system.log({
            comp: 'ContactsInvitebtn',
            msg: 'showBottomSheet',
            val: e
          })
          console.log('Not able to get contacts:', e)
        } finally {
          loading.value = false
        }
      }
    })

    return {
      loading,
      showBottomSheet,
      showButton,
      contacts,
      showInviteSheet,
      swipe,
    }
  }
})
</script>
