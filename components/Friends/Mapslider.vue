<template>
  <div>
    <div v-if="friends && friends.length > 0">
      <v-slide-group
          v-model="model"
          :show-arrows="$vuetify.breakpoint.mdAndUp"
          active-class="success"
          class="pa-0"
          center-active
      >
        <v-slide-item v-for="(friend, key) in friends" :key="key" >
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
          max-width="700"
          inset
      >
        <v-sheet
            class="pa-5 overflow-y-auto rounded-t-xl slide-up"
            height="35vh"
            style="padding-bottom:180px;"
        >
          <GlobalSlidebar v-touch="{ down: () => swipe('Down') }" @click.native="swipe('Down')" />

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
  useRouter,
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
    const { $vuetify, $db } = useContext()
    const router = useRouter()

    // DEFINE CONTENT
    const model = ref(null)
    const howManyPlaceholders = computed(() => $vuetify.breakpoint.smAndDown ? 2 : 3)
    const showSheet = ref(false)
    const sheetData = ref(null)
    const friendsWithData = ref([])

    const goTo = (key) => {
      const friend = props.friends
      if (friend[key] && friend[key]?.gps && friend[key]?.gps?.lat) {
        const panTo = new window.google.maps.LatLng(friend[key].gps.lat, friend[key].gps.lng)
        window.currentMap.panTo(panTo)
        sheetData.value = friend[key]
        showSheet.value = true
      } else {
        router.push(`/users/user/${friend[key].id}`)
      }
    }

    //eslint-disable-next-line no-unused-vars
    const getFriendsProfile = () => {
      if (props.friends?.length >=1 ) {
        props.friends.forEach( async(friend) => {
          // Basically if the friend has a username, it assumes we have the entire profile
          // Otherwise get the user data
          if (friend?.username) {
            friendsWithData.value.push(friend)
          } else {
            const friendDetails = await $db.get(`Users/${friend.id}`)
            friendsWithData.value.push(friendDetails)
          }
        })
      }
    }

    const swipe = (direction) => {
      if (direction === 'Down') {
        showSheet.value = false
      }
    }
/*
    watchEffect(() => {
      if (props.friends?.length >=1 ) {
        getFriendsProfile()
      }
    }) */

    return {
      howManyPlaceholders,
      model,
      showSheet,
      sheetData,
      friendsWithData,
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
