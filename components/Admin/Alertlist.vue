<template>
  <v-container>
    <div v-if="alert">
      <v-row @click="rowClick(alert)" class="elevation-1 rounded-lg white align-center mb-1 mx-1">
          <v-col cols="3">
            <div v-if="alert.type === 'accident'" class="">
              <IconsAccident width="45px" />
            </div>
            <div v-if="alert.type === 'kidnapping'" class="">
              <IconsKidnapping width="45px" />
            </div>
            <div v-if="alert.type === 'robbery'" class="">
              <IconsRobbery width="45px" />
            </div>
            <div v-if="alert.type === 'shout'" class="">
              <IconsShout width="45px" />
            </div>
          </v-col>
          <v-col>
            <div class="d-flex align-center justify-space-between">
              <div v-if="loadedUsers[alert.userId]" class="user">@{{ loadedUsers[alert.userId].username }}</div>
              <div class="caption grey--text created_at" v-if="alert.created_at">{{ formatDate(alert.created_at) }}</div>
            </div>

            <div class="d-flex align-center justify-space-between">
              <div v-if="alert.location" style="font-size:12px;">
                {{ alert.location.city }}
                {{ alert.location.province }}
                {{ alert.location.country }}
              </div>
              <a target="_blank" :href="`https://www.google.com/maps/search/?api=1&query=${alert.gps.lat},${alert.gps.lng}`">
                <v-icon small>mdi-open-in-new</v-icon>
              </a>
            </div>
          </v-col>

      </v-row>
      <v-bottom-sheet v-if="alert" v-model="showBottomSheet" :scrollable="true" max-width="700">
        <v-sheet height="80vh" class="rounded-t-xl pb-14">
          <div class="ma-3" style="padding-bottom:180px;">
            <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                            @click.native="swipe('Down')"
            />

            <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
            <ElementH1 align="center" :text="$t('alert_details')" />

            <IconsAccident v-if="alert.type === 'accident'" width="60" />
            <IconsKidnapping v-if="alert.type === 'kidnapping'" width="60" />
            <IconsRobbery v-if="alert.type === 'robbery'" width="60" />
            <IconsShout v-if="alert.type === 'shout'" width="60" />

            <div class="text-center my-3">
              <span class="caption" v-if="alert.created_at">
                <v-icon>mdi-calendar</v-icon>
                {{ formatDate(alert.created_at) }}
              </span>
              <span class="caption">
                <v-icon>mdi-map</v-icon>
                {{ alert.gps.lat }}, {{ alert.gps.lng }}
              </span>
              <span class="caption" v-if="loadedUsers[alert.userId]">
                <nuxt-link :to="`/admin/users/view/${alert.userId}`">
                  <v-icon>mdi-account</v-icon>
                  <span v-if="loadedUsers[alert.userId]" class="user">@{{ loadedUsers[alert.userId].username }}</span>
                </nuxt-link>
              </span>
            </div>
            <div v-if="alert.location" class="text-center mb-3">
              {{ alert.location.city }},
              {{ alert.location.province }},
              {{ alert.location.country }}
            </div>
            <div v-if="alert.audioUrl" class="my-7 text-center" >
                <audio :src="alert.audioUrl" controls style="min-width:220px"></audio>
            </div>

            <MapGmbasic :lat="alert.gps.lat" :lng="alert.gps.lng" />
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
// import Vue from 'vue'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'AdminDashboard',
  middleware: 'admin',
  directives: { Touch },
  props: {
    alert: {
      type: Object,
      default: () => { return {} }
    },
    loadedUsers: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup () {
    const {
      state
    } = useStore()
    const {
      $system,
    } = useContext()
    // const router = useRouter()
    const loading = ref(true)
    const user = computed(() => state.user)
    const isAdmin = ref(user.value.data.role.isAdmin)
    const isVendor = ref(user.value.data.role.isVendor)
    const isDriver = ref(user.value.data.role.isDriver)

    // DEFINE CONTENT
    const alert = ref()
    const showBottomSheet = ref(false)

    // METHODS
    const rowClick = (row) => {
      try {
        loading.value = true
        alert.value = row
        showBottomSheet.value = true
      } catch(e) {
        $system.log({
          comp: 'AdminDashboard',
          msg: 'viewAlertDetails',
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
    const formatDate = (d) => {
      try {
        return d.created_at.toDate().toDateString()
      } catch {
        if (typeof d === 'string') {
          return d
        }
        return new Date(d.seconds * 1000).toDateString()
      }
    }

    // GET CONTENT

    return {
      isAdmin,
      isVendor,
      isDriver,
      loading,
      showBottomSheet,
      formatDate,
      rowClick,
      swipe
    }
  }
})
</script>
