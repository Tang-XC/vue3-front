<template>
  <div>
    <Navigator
      :type="isMobileDevice ? 'mobile' : 'pc'"
      :data="categoryData"
      v-model="activeCategory"
    >
      <template #more>
        <div @click="openMore">
          <SvgIcon name="more" class="w-1.5 h-1.5" />
        </div>
      </template>
    </Navigator>
  </div>
  <PopUp v-model="showMore" position="top">
    <CategoryMenu
      :data="categoryData"
      @close="closeMore"
      @onSelect="handleMenuSelect"
    />
  </PopUp>
</template>
<script setup>
import { isMobileDevice } from '@/utils/flexible'
import { getCategory } from '@/api/category.js'
import CategoryMenu from './components/CategoryMenu/index.vue'
import { onMounted, ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryData = ref([])
const showMore = ref(false)
const activeCategory = ref(ALL_CATEGORY_ITEM.id)
const getCategoryData = () => {
  getCategory().then((res) => {
    categoryData.value = [ALL_CATEGORY_ITEM, ...res.data.categorys]
  })
}

const openMore = () => {
  showMore.value = true
}
const closeMore = () => {
  showMore.value = false
}
const handleMenuSelect = (val) => {
  activeCategory.value = val
}
onMounted(() => {
  getCategoryData()
})
</script>
