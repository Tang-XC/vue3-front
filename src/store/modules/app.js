export default {
  namespaced: true,
  state: () => ({
    routerType: 'none'
  }),
  mutations: {
    changeRouterType(state, type) {
      state.routerType = type
    }
  }
}
