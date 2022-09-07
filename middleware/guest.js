export default function ({ store, redirect }) {
  if (store.state.authUser || !store.state.authUser) {
    return true
  }
  return redirect('/')
}
