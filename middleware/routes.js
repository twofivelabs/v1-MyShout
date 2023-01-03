/**
 * This middleware is run on every route on the app
 */
export default async function ({
  store,
  route
}) {
  // Show Footer on all pages except the map page
  store.commit('SHOW_FOOTER', (route.path !== '/map'))

  if (store.state.user.data && store.state.user.data.uid) {
    // REMOVED DUE TO POLICY ERRORS
    //await app.$capacitor.watchPosition()
    //await app.$services.getSetUserGeneralLocation()
    // if (isMobile) {
      //await app.$capacitor.pushNotificationsListeners()
    // }
    return true
}
  return false
}
