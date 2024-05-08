import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
const sotre = createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    category
  }
})
export default sotre
