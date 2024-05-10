export default {
  namespaced: true,
  state: {
    history: [],
    currentSearch: ''
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
    },
    setCurrentSearch(state, payload) {
      state.currentSearch = payload
    }
  },
  actions: {}
}
