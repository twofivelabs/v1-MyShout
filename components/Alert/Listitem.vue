<template>
  <div>
    <v-list-item two-line @click="viewAlertDetails">
      <div class="mr-2">
        <IconsAccident v-if="alert.type === 'accident'" width="50" />
        <IconsKidnapping v-if="alert.type === 'kidnapping'" width="50" />
        <IconsRobbery v-if="alert.type === 'robbery'" width="50" />
        <IconsShout v-if="alert.type === 'shout'" width="50" />
      </div>
      <v-list-item-content>
        <ElementH3 :text="alert.type" align="left" style="text-transform: capitalize;" />
        <span class="caption" v-if="alert.location">{{ alert.location.city }}, {{ alert.location.province }}</span>
        <span class="caption" v-else-if="alert.gps.lat">{{ alert.gps.lat }}, {{ alert.gps.lng }}</span>
      </v-list-item-content>
      <v-list-item-action class="mr-3">
        <span class="caption">{{ alert.timeAgo }}</span>
      </v-list-item-action>
    </v-list-item>
    <v-bottom-sheet v-model="showBottomSheet" :scrollable="true" max-width="700">
      <v-sheet height="80vh" class="rounded-t-xl pb-14">
        <div class="ma-3">
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />

          <ElementH3 v-if="loading" align="center" :text="$t('is_loading')" />
          <ElementH1 align="center" text="Alert Details" />

          <IconsAccident v-if="alert.type === 'accident'" width="60" />
          <IconsKidnapping v-if="alert.type === 'kidnapping'" width="60" />
          <IconsRobbery v-if="alert.type === 'robbery'" width="60" />
          <IconsShout v-if="alert.type === 'shout'" width="60" />

          <div class="text-center my-3">
            <span class="caption">
              <v-icon>
                mdi-calendar
              </v-icon>
              {{ alert.created_at }}
            </span>
            <span class="caption">
              <v-icon>
                mdi-map
              </v-icon>
              {{ alert.gps.lat }}, {{ alert.gps.lng }}
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
</template>
<script>
import {
  defineComponent,
  ref, useContext,
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'AlertListitem',
  directives: { Touch },
  props: {
    alert: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const { $system } = useContext()
    const loading = ref(false)
    const showBottomSheet = ref(false)

    // METHODS
    const viewAlertDetails = () => {
      try {
        loading.value = true
        showBottomSheet.value = true

        // GET MAP DETAILS
      } catch(e) {
        $system.log({
          comp: 'AlertListitem',
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

    return {
      loading,
      showBottomSheet,
      swipe,
      viewAlertDetails,
    }
  }
})
</script>
