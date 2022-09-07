<template>
  <div>
    <div v-if="companies">
      <v-slide-group
          v-model="model"
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          center-active
          class="pa-0"
      >
        <v-slide-item
            v-for="(company, key) in companies"
            :key="key"
        >
          <div>
            <v-hover v-slot="{ hover }">
              <v-card
                  :elevation="hover ? 4 : 0"
                  :width="`${$vuetify.breakpoint.smAndDown ? '165' : '165' }`"
                  class="ma-2 pt-2 rounded-xl company-card-map"
                  @click="goTo(key)"
              >
                <v-img
                    v-if="company.logo_url"
                    :src="company.logo_url"
                    class="rounded card-image"
                    contain
                    lazy-src="/placeholder.png"
                    max-height="30"
                />
                <v-card-title class="map-title justify-center">
                  {{ company.name }}
                </v-card-title>
              </v-card>
            </v-hover>
          </div>
        </v-slide-item>
      </v-slide-group>
      <v-bottom-sheet
          v-model="showSheet"
          :scrollable="true"
          class="bottom-sheet"
          inset
          max-width="700"
      >
        <v-sheet
            class="pa-5 overflow-y-auto rounded-t-xl slide-up"
            height="35vh"
        >
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }"
                          @click.native="swipe('Down')"
          />
          <v-row class="align-center">
            <v-col cols="3">
              <v-avatar :key="`${Math.random()}`" color="white" contain>
                <CompanyLogo :company="sheetData"/>
              </v-avatar>
            </v-col>
            <v-col>
              <ElementH3 v-if="sheetData && sheetData.name" :text="sheetData.name"
                         align="left" class="mt-0 mb-4"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ElementP :text="sheetData && sheetData.description" align="left"
                        class="text-body-2"
              />
              <v-btn v-if="sheetData" :to="`/companies/${sheetData.id}`"
                     class="elevation-0"
                     primary
              >
                View More
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter
} from '@nuxtjs/composition-api'
import { Touch } from 'vuetify/lib/directives'

export default defineComponent({
  name: 'CompanySlider',
  directives: { Touch },
  props: {
    companies: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const { $vuetify } = useContext()
    const router = useRouter()

    // DEFINE CONTENT
    const model = ref(null)
    const howManyPlaceholders = computed(() => $vuetify.breakpoint.smAndDown ? 2 : 3)
    const showSheet = ref(false)
    const sheetData = ref(null)

    const goTo = (key) => {
      if (props.companies[key].lat) {
        const panTo = new window.google.maps.LatLng(props.companies[key].lat, props.companies[key].lng)
        window.currentMap.panTo(panTo)
        showSheet.value = true
        sheetData.value = props.companies[key]
      } else {
        router.push(`/companies/${props.companies[key].id}`)
      }
    }

    const swipe = (direction) => {
      if (direction === 'Down') {
        showSheet.value = false
      }
    }

    return {
      howManyPlaceholders,
      model,
      showSheet,
      sheetData,
      swipe,
      goTo
    }
  }
})
</script>
<style scoped>
.company-card-map .map-title {
  word-break: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 0;
  letter-spacing: -.5px;
  font-size: .85rem;
}

.theme--dark.v-sheet {
  background-color: #fff;
}

.card-image {
  height: 130px;
  width: 100%;
}

.missing-image {
  opacity: .25;
}
</style>
