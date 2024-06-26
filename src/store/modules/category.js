import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => ({
    categories: [ALL_CATEGORY_ITEM],
    currentCategory: ALL_CATEGORY_ITEM.id
  }),
  mutations: {
    setCategory(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    },
    setCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    }
  },
  actions: {
    async useCategoryData(context) {
      return new Promise((resolve, reject) => {
        getCategory()
          .then((res) => {
            context.commit('setCategory', res.data.categorys)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
