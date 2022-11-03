<template>
  <div>
    <div v-if="friends">
      <v-slide-group
          v-model="model"
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          center-active
          class="pa-0"
      >
        <v-slide-item
            v-for="(friend, key) in friends"
            :key="key"
        >
          <div>
            <v-hover v-slot="{ hover }">
              <v-card
                  :elevation="hover ? 4 : 0"
                  :width="`${$vuetify.breakpoint.smAndDown ? '165' : '165' }`"
                  class="ma-2 pa-1 rounded-lg friend-card-map d-flex align-center "
                  @click="goTo(key)"
              >
                <UserAvatar :user="friend" class="mr-4" />
                <div>{{ friend.username }}</div>
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
          <div>
            <div class="d-flex align-center mb-12">
              <UserAvatar :key="`${Math.random()}`" :user="sheetData" class="mr-4" />
              <ElementH3 v-if="sheetData && sheetData.username" :text="sheetData.username"
                         align="left" class="mt-0 mb-4"
              />
            </div>
            <v-btn v-if="sheetData" :to="`/users/user/${sheetData.id}`"
                   class="elevation-0"
                   primary
            >

              {{ $t('view_more') }}
            </v-btn>
          </div>
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
  name: 'FriendsMapslider',
  directives: { Touch },
  props: {
    friends: {
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
      if (props.friends[key] && props.friends[key] && props.friends[key].gps && props.friends[key].gps.lat) {
        const panTo = new window.google.maps.LatLng(props.friends[key].gps.lat, props.friends[key].gps.lng)
        window.currentMap.panTo(panTo)
        showSheet.value = true
        sheetData.value = props.friends[key]
      } else {
        router.push(`/users/user/${props.friends[key].id}`)
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
.friend-card-map .map-title {
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
