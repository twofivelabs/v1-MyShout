export const state = () => ({
  snackbars: [],
  title: null,
  text: '',
  color: '',
  timeout: 2000,
  multiLine: false,
  type: null,
  id: null,
  goTo: null
})

export const getters = {

}

export const mutations = {
  show (state, payload) {
    state.title = payload.title
    state.text = payload.text
    state.color = payload.color
    state.timeout = payload.timeout
    state.multiLine = payload.multiLine
    state.goTo = payload.goTo
    state.type = payload.type
    state.id = payload.id
  }
}

export const actions = {
}
