<template>
  <mobileNavigation v-if="isMobileDevice" :data="categoryData" />
  <pcNavigation v-else />
</template>
<script setup>
import { isMobileDevice } from '@/utils/flexible'
import { mobileNavigation, pcNavigation } from './components/navigation'
import { getCategory } from '@/api/category.js'
import { onMounted, ref } from 'vue'
const categoryData = ref([])
const getCategoryData = () => {
  getCategory().then((res) => {
    categoryData.value = res.data.categorys
  })
}
onMounted(() => {
  getCategoryData()
})
</script>
