<template>
  <div>
    <div class="map-actions">
      <div>
        <v-btn elevation="0" fab small color="primary" @click="centerOn({
          lat: user.gps.lat,
          lng: user.gps.lng
        })">
          <v-icon>
            mdi-crosshairs-gps
          </v-icon>
        </v-btn>
      </div>
    </div>

    <div id="map" ref="googleMapEl" style="width:calc(100vw); height:calc(100vh - 75px);"/>

    <div class="map-slider">
      <FriendsMapslider :friends="friends" class="mb-10" />
    </div>
  </div>
</template>
<script>

import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  useContext,
  useFetch,
  useMeta,
  useStore,
  watch,
  watchEffect,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MapPage',
  middleware: 'authenticated',
  setup () {
    const {
      state,
    } = useStore()
    const {
      $config,
      $capacitor,
      $system,
      $vuetify,
      $helper,
      $db
    } = useContext()
    const loading = ref(true)

    // DEFINE CONTENT
    const googleMapEl = ref(null)
    const friends = ref([])
    const gps = computed(() => state.user.gps)
    const user = computed(() => state.user)
    const userData = computed(() => state.user.data)
    const center = ref([])
    const slider = ref([])
    const mapInit = ref(false)
    const currentMapIsSet = ref(false)
    const currentMap = ref(null)
    const mapError = ref(false)
    const doneAddingMarkers = ref(false)
    const isMounted = ref(false)
    // const userCenter = ref('')
    const markers = ref({})

    // $capacitor.positionPermissions()

    // GET CONTENT
    useFetch(async () => {
      // await getFriends()
    })

    // METHODS
    const moveMarker = (marker, lat, lng) => {
      if (marker) {
        marker.setPosition(new window.google.maps.LatLng(lat, lng))
      }
    }
    const createMarker = ({
      title = 'Marker',
      label = null,
      lat = null,
      lng = null,
      content = null,
      iconUrl = 'MapIconScaled.svg',
      iconX = 30,
      iconY = 30,
      id = null
    }) => {
      markers.value[id] = new window.google.maps.Marker({
        map: currentMap.value,
        position: new window.google.maps.LatLng(lat, lng),
        title: title,
        label: label,
        icon: {
          url: `map/${iconUrl}`,
          scaledSize: new window.google.maps.Size(iconX, iconY),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(iconX / 2, iconY / 2)
        }
      })
      // INFO WINDOW
      const contentString = `<div id="content">${content}</div>`
      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
      })
      markers.value[id].addListener('click', () => {
        infoWindow.open({
          anchor: markers.value[id],
          map: currentMap.value,
          shouldFocus: false
        })
      })
    }
    //eslint-disable-next-line no-unused-vars
    const docsToMarkers = (docs) => {
      if (docs) {
        doneAddingMarkers.value = true

        docs.forEach(doc => {
          // Make sure they have lat/lng
          if (doc.gps && doc.gps.lat && doc.permissions.shareLocationWithFriends) {
            createMarker({
              id: doc.id,
              lat: doc.gps.lat,
              lng: doc.gps.lng,
              iconUrl: 'FriendIcon.svg',
              title: `${(doc.first_name) ? doc.first_name : doc.username}`,
              content: `<div class="d-flex align-center"><v-img src="${doc.photoURL}" /><h4>${(doc.first_name) ? doc.first_name : doc.username}</h4></div>`
            })
          }
        })
      }
    }
    //eslint-disable-next-line no-unused-vars
    const getFriends = async () => {
      await $db.get(`Users/${userData.value.uid}/Friends`).then(async friendsList => {
        const allFriends = []
        for (const friend of friendsList) {
          await $db.get(`Users/${friend.id}`).then(details => {
            allFriends.push(details)
          })
        }
        friends.value = allFriends
        docsToMarkers(allFriends)

      }).catch(e => {
        $system.log({ comp: 'MapPage', msg: 'Not able to get friends for map', val: e })
      })
    }
    const centerOn = ({ lat = null, lng = null }) => {
      let mapPoint
      if (lat && lng) {
        mapPoint = new window.google.maps.LatLng(lat, lng)
        currentMap.value.panTo(mapPoint)

        moveMarker(markers[userData.value.uid], gps.value.lat, gps.value.lng)
      }
    }
    const onDrag = async () => {
      // MIGHT NEED TO LOAD NEW DATA ON DRAG HERE
      if (currentMap.value) {
        currentMap.value.addListener('dragend', async () => {
          center.value = [currentMap.value.getCenter().lat(), currentMap.value.getCenter().lng()]
          // console.log('STICKY: Your dragging the map around, new center is', center.value)
          // TODO: when dragging, add other elements
        })
      }
    }
    const initMap = async () => {
      await $helper.sleep(1500)

      currentMap.value = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      })

      // Set a variable to the window
      window.currentMap = currentMap.value

      // Center on me
      console.log('USER GPS', user.value.gps)
      if (!user.value.gps.lat) {
        user.value.gps.lat = 49.8995757
        user.value.gps.lng = -119.6195832
      }

      if (user.value.gps.lat) {
        console.log('Init map with a center of', user.value.gps.lat)
        centerOn({
          lat: user.value.gps.lat,
          lng: user.value.gps.lng
        })
      } else {
        console.log('STICKY: not able to center map with empty coords')
      }

      // Color theme
      if ($vuetify.theme.dark) {
        currentMap.value.setOptions({
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              elementType: 'geometry',
              stylers: [{ color: '#242A33' }]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242A33' }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#abc6b4' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#abc6b4' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#999999' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        })
      } else {
        currentMap.value.setOptions({
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              elementType: 'geometry',
              stylers: [{ color: '#F6F8FA' }]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#F6F8FA' }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#abc6b4' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#abc6b4' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#dddddd' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#dddddd' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#999999' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#b5b5b5' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#d4e7f9' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d4e7f9' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#d4e7f9' }]
            }
          ]
        })
      }

      // Init Complete
      mapInit.value = true
      currentMapIsSet.value = true
    }

    // MOUNT
    onMounted(async() => {
      isMounted.value = true
      try {
        if (!gps.value || !gps.value.lat) {
          // We are going to watch position in case they are driving or moving
          // We are removing the watch position, but using the HEARTBEAT to update location every 5 minutes
          // $capacitor.watchPosition()
          $capacitor.gpsInit()
        }
      } catch(e) {
        $system.log({ comp: 'MapPage', msg: 'Not able to get position', val: e })
      } finally {
        loading.value = false
      }
    })
    onUnmounted(() => {
      // $capacitor.clearWatchPosition()
    })

    // WATCH
    watchEffect(async () => {
      if (isMounted.value) {
        if (window.google && mapInit.value !== true && !currentMap.value) {

          await initMap()
          await onDrag()

          // Add "YOU" Marker
          if (user.value.gps && user.value.gps.lat) {
            await createMarker({
              id: userData.value.uid,
              lat: user.value.gps.lat,
              lng: user.value.gps.lng,
              title: 'You',
              content: `You`,
            })
          }
          console.log('STICKY: INIT MAP DONE')

          if (!doneAddingMarkers.value) {
            // console.log('STICKY: Add Friends', friends.value)
            await getFriends()
          }
        }
      }
    })

    // WATCH GPS CHANGES
    watch(gps, (before, after) => {
      console.log('STICKY: WATCH GPS', gps.value, after)
      if (parseFloat(before.lat) !== after.lat) {
        if (gps.value && mapInit.value === true) {
          console.log('STICKY: [map] move marker: ', userData.value.uid, gps.value.lat, gps.value.lng)
          moveMarker(markers[userData.value.uid], gps.value.lat, gps.value.lng)
        }
      }
    })

    // META
    useMeta({
      title: `${$config.appTitle} on Map view`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: `${$config.appTitle} on Map view`
      }]
    })

    return {
      loading,
      friends,
      googleMapEl,
      gps,
      slider,
      mapError,
      user,
      centerOn
    }
  },
  head: {}
})
</script>
<style scoped>
#map-wrap {
  margin-top: 10px;
  height: 100%;
  width: 100%;
  height: calc(100vh - 160px);
}

#leafletEl, .vue2leaflet-map {
  z-index: 0;
}

.map-actions {
  position: absolute;
  bottom: 40vh;
  right: 12px;
  z-index: 5;
}

.map-search {
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 5;
  margin-right: 12px;
}

.map-slider {
  position: absolute;
  z-index: 1;
  width: 100%;
  bottom: 7vh;
}
</style>
