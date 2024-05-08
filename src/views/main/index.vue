<template>
  <div>
    <Navigator
      type="mobile"
      :data="store.getters.categories"
      v-model="activeCategory"
    >
      <template #more>
        <div @click="openMore">
          <SvgIcon name="more" class="w-1.5 h-1.5 dark:fill-zinc-300" />
        </div>
      </template>
    </Navigator>
  </div>
  <PopUp v-model="showMore" position="top">
    <CategoryMenu
      :data="store.getters.categories"
      @close="closeMore"
      @onSelect="handleMenuSelect"
    />
  </PopUp>
</template>
<script setup>
import CategoryMenu from './components/CategoryMenu/index.vue'
import { onMounted, ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { useStore } from 'vuex'

const showMore = ref(false)
const activeCategory = ref(ALL_CATEGORY_ITEM.id)
const store = useStore()

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
</script>
