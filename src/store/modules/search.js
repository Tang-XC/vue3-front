export default {
  namespaced: true,
  state: {
    history: []
  },
  mutations: {
    addHistory(state, payload) {
      if (state.history.includes(payload)) {
        state.history.splice(state.history.indexOf(payload), 1)
      }
      state.history.unshift(payload)
    },
    removeHistory(state, payload) {
      state.history = state.history.filter((item) => item !== payload)
    },
    clearHistory(state) {
      state.history = []
    }
  },
  actions: {}
}
