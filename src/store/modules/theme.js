import { THEME_LIGHT } from '@/constants'
import createPersistedState from 'vuex-persistedstate'

export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT
  }),
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  },
  plugins: [
    createPersistedState({
      paths: ['themeType']
    })
  ]
}
