<template>
  <div
    class="h-full overflow-auto dark:bg-zinc-900 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <Navigator
      :type="isMobileDevice ? 'mobile' : 'pc'"
      :data="store.getters.categories"
      v-model="activeCategory"
    >
      <template #more>
        <div @click="openMore">
          <SvgIcon name="more" class="w-1.5 h-1.5 dark:fill-zinc-300" />
        </div>
      </template>
    </Navigator>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <PexelsList :column="isMobileDevice ? 2 : 5" />
    </div>
    <div class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <TriggerMenu v-if="isMobileDevice" :items="triggerItems" />
    </div>
    <PopUp v-model="showMore" position="top">
      <CategoryMenu
        :data="store.getters.categories"
        @close="closeMore"
        @onSelect="handleMenuSelect"
      />
    </PopUp>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<script setup>
import CategoryMenu from './components/CategoryMenu/index.vue'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import PexelsList from './pexelsList/index.vue'
import { isMobileDevice } from '@/utils/flexible.js'
const store = useStore()
const showMore = ref(false)
const activeCategory = ref(store.getters.currentCategory)
const triggerItems = [
  {
    title: '首页',
    icon: 'home-fill',
    path: '/'
  },
  {
    title: '上传',
    icon: 'upload-fill',
    path: '/upload'
  },
  {
    title: '我的',
    icon: 'personal-fill',
    path: '/personal'
  }
]
const counter = ref(0)

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
  store.dispatch('category/useCategoryData')
})
watch(activeCategory, (val) => {
  store.commit('category/setCurrentCategory', val)
})
</script>
