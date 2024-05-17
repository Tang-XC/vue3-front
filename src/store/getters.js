import { isMobileDevice } from '@/utils/flexible'
export default {
  categories: (state) => state.category.categories,
  currentCategory: (state) => state.category.currentCategory,
  themeType: (state) => state.theme.themeType,
  history: (state) => state.search.history,
  currentSearch: (state) => state.search.currentSearch,
  routerType: (state) => {
    if (!isMobileDevice.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
