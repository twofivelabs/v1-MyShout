export default function ({
  store,
  redirect
}) {
  // we can assume is user logged in with firebase, but we could throw some more error checks in here
  console.log('store.state?.user?.profile?.role?.isAdmin', store.state?.user?.profile?.role?.isAdmin)
  if (store.state.user.data) {
    if (store.state.user.data.role.isAdmin || store.state.user.data.role.isDriver || store.state.user.data.role.isVendor) {
      return true
    }
  }
  // This will use the firestore doc.
  else if (store.state?.user?.profile?.role?.isAdmin) {
    return true
  } else {
    return redirect('/onboarding/')
  }
}
