import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import search from './modules/search'
import createPersistedState from 'vuex-persistedstate'

const sotre = createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    category,
    theme,
    search
  },
  plugins: [createPersistedState()]
})
export default sotre
