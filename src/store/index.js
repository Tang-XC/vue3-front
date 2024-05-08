import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
const sotre = createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    category,
    theme
  }
})
export default sotre
