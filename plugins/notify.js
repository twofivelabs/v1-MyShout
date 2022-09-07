export default ({ store }, inject) => {
  inject('notify', {
    show ({
      text = '',
      color = '',
      goTo = null,
      title = null,
      type = 'general',
      id = null,
      timeout = 2000,
      multiLine = false
    }) {
      store.commit('snackbar/show', {
        title,
        text,
        color,
        goTo,
        timeout,
        multiLine,
        type,
        id
      })
    }
  })
}
