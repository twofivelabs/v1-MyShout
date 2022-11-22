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
          <ElementH2 align="left" :text="$t('heading.change_language')" />
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container class="mt-3 mobileNotch px-3">
      <v-row>
        <v-col cols="12" sm="5">

          <v-item-group mandatory>
            <v-row>
              <v-col
                  v-for="locale in $i18n.locales"
                  :key="locale.code"
                  cols="6"
                  md="4"
              >
                <v-item v-slot="{ active }">
                  <v-card
                      :color="$i18n.localeProperties.code === locale.code ? 'primary' : ''"
                      @click="changeLang(locale.code)"
                      class="d-flex align-center"
                      height="200"
                      dark
                  >
                    <v-scroll-y-transition>
                      <div v-if="active" class="text-h2 flex-grow-1 text-center">
                        {{ locale.local }}
                      </div>
                      <div v-else class="text-h2 flex-grow-1 text-center">
                        {{ locale.local }}
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>

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
  ref,
  computed,
  useRouter
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserLanguagepage',
  middleware: 'authenticated',
  setup () {
    const { state } = useStore()
    const { $config, $notify, i18n, $ttlStorage } = useContext()
    const router = useRouter()
    const user = computed(() => state.users.data)
    const profile = computed(() => state.users.profile)
    const loading = ref(false)
    const dialog = ref(false)

    // METHODS
    const changeLang = async (code) => {
      $ttlStorage.set('locale', code)
      await i18n.setLocale(code)

      await i18n.setLocaleCookie(code)
      $notify.show({ text: i18n.t('notify.success'), color: 'green' })
      router.push('/')
    }

    // PAGE META
    useMeta({
      title: `Language ${$config.appTitle}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: ''
      }]
    })

    return {
      loading,
      dialog,
      user,
      changeLang,
      profile,
    }
  },
  head: {}
})
</script>
