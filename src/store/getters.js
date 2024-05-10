export default {
  categories: (state) => state.category.categories,
  currentCategory: (state) => state.category.currentCategory,
  themeType: (state) => state.theme.themeType,
  history: (state) => state.search.history,
  currentSearch: (state) => state.search.currentSearch
}
