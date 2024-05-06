<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 导航栏滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 导航栏更多按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
      >
        <SvgIcon name="more" class="w-1.5 h-1.5" />
      </li>
      <!-- 导航栏分类 -->
      <li
        ref="sliderItem"
        v-for="(item, index) in data"
        :key="item.id"
        class="slider-item shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': index === currentCategory }"
        @click="handleClick($event, index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue'
import _ from 'lodash'
const { data } = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const sliderTarget = ref(null)
const sliderItem = ref(null)
const currentCategory = ref(0)
const handleClick = (event, item) => {
  // 点击分类时滑动滑块
  if (Array.from(event.target.classList).includes('slider-item')) {
    sliderMove(sliderTarget.value, event.target)
  }
  // 给当前选中分类赋值
  currentCategory.value = item
}

// 移动滑块
const sliderMove = (a, b) => {
  a.style.left = b.offsetLeft + 'px'
  a.style.width = b.offsetWidth + 'px'
}

// 初始化滑块位置,只执行一次
const init = _.once(() => {
  const firstItem = document.querySelector('.slider-item')
  if (sliderTarget.value && firstItem) {
    sliderMove(sliderTarget.value, firstItem)
  }
})
onUpdated(() => {
  init()
})
</script>
<style lang="scss" scoped>
.sliderTarget {
}
</style>
