<template>
  <div>
    <mobileNavigation v-if="isMobileDevice" :data="categoryData">
      <template #more>
        <div @click="openMore">
          <SvgIcon name="more" class="w-1.5 h-1.5" />
        </div>
      </template>
    </mobileNavigation>
    <pcNavigation v-else />
  </div>
  <PopUp v-model="showMore" position="top">
    <h1>Hello world</h1>
  </PopUp>
</template>
<script setup>
import { isMobileDevice } from '@/utils/flexible'
import { mobileNavigation, pcNavigation } from './components/navigation'
import { getCategory } from '@/api/category.js'
import { onMounted, ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryData = ref([])
const showMore = ref(false)
const getCategoryData = () => {
  getCategory().then((res) => {
    categoryData.value = [ALL_CATEGORY_ITEM, ...res.data.categorys]
  })
}

const openMore = () => {
  showMore.value = true
}
onMounted(() => {
  getCategoryData()
})
</script>
