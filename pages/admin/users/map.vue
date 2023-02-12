<template>
  <v-container class="admin-container">
    <AdminTitle />

    <v-btn to="/admin/users" class="mt-3 mb-2 mx-2 elevation-0 primary white--text">{{ $t('view_on_list') }}</v-btn>
    <div id="map" ref="googleMapEl" style="width:calc(100vw); height:calc(100vh - 275px);"/>

  </v-container>
</template>
<script>

import {
  computed,
  defineComponent, onMounted, onUnmounted,
  ref,
  useContext,
  useFetch,
  useStore, watch, watchEffect,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminUsersMap',
  middleware: 'admin',
  setup () {
    const {
      state,
      dispatch
    } = useStore()
    const {
      $system, $helper, $capacitor, $vuetify
    } = useContext()
    const loading = ref(true)

    // DEFINE CONTENT
    const googleMapEl = ref(null)
    const friends = ref([])
    const gps = computed(() => state.user.gps)
    const user = computed(() => state.user)
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

    $capacitor.positionPermissions()

    // GET CONTENT
    useFetch(async () => {
      await getUsers()
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
              content: `<div class="d-flex align-center"><v-img src="${doc.photoURL}" /><h4>${(doc.first_name) ? doc.first_name : doc.username}</h4> </div>`
            })
          }
        })
      }
    }
    const getUsers = async () => {
      loading.value = true
      try {
        await dispatch('user/getAll', {
          where: {},
          limit: 500,
          order: {
            by: 'username',
            direction: 'asc'
          }
        }).then((res) => {
          if (res !== false) {
            friends.value = res
          }
        })
      } catch(e) {
        $system.log({
          comp: 'AdminUsersMap',
          msg: 'Not able to get users for map',
          val: e
        })
      } finally {
        loading.value = false
      }
    }
    const centerOn = ({ lat = null, lng = null }) => {
      let mapPoint
      if (lat && lng) {
        mapPoint = new window.google.maps.LatLng(lat, lng)
        currentMap.value.panTo(mapPoint)
      }
    }
    const onDrag = async () => {
      // MIGHT NEED TO LOAD NEW DATA ON DRAG HERE
      if (currentMap.value) {
        currentMap.value.addListener('dragend', async () => {
          center.value = [currentMap.value.getCenter().lat(), currentMap.value.getCenter().lng()]
          console.log('STICKY: Your dragging the map around, new center is', center.value)
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
          $capacitor.watchPosition()
        }
      } catch(e) {
        $system.log({
          comp: 'MapPage',
          msg: 'Not able to get position',
          val: e
        })
      } finally {
        loading.value = false
      }
    })
    onUnmounted(() => {
      $capacitor.clearWatchPosition()
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
              id: user.value.data.uid,
              lat: user.value.gps.lat,
              lng: user.value.gps.lng,
              title: 'You',
              content: `You`,
            })
          }
          console.log('STICKY: INIT MAP DONE')

          if (!doneAddingMarkers.value && friends.value && friends.value.length > 0) {
            // console.log('STICKY: Add Friends', friends.value)
            await docsToMarkers(friends.value)
          }
        }
      }
    })

    // WATCH GPS CHANGES
    watch(gps, (before, after) => {
      console.log('STICKY: WATCH GPS', gps.value, after)
      if (parseFloat(before.lat) !== after.lat) {
        if (gps.value && mapInit.value === true) {
          moveMarker(markers[user.value.data.uid], gps.value.lat, gps.value.lng)
        }
      }
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
  }
})
</script>
