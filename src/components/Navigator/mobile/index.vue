<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden no-scrollbar"
      ref="sliderRef"
    >
      <!-- 导航栏滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 导航栏更多按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
        v-if="$slots.more"
      >
        <slot name="more"></slot>
      </li>
      <!-- 导航栏分类 -->
      <li
        v-for="item in data"
        :key="item.id"
        :index="item.id"
        :id="item.id"
        class="slider-item shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': item.id === active }"
        @click="handleClick($event, item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onUpdated, ref, watch } from 'vue'
import { useVModel, useScroll } from '@vueuse/core'
import { EMIT_UPDATE_MODELVALUE } from '@/constants'

import _ from 'lodash'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['onSelect', EMIT_UPDATE_MODELVALUE])
const sliderTarget = ref(null)
const sliderRef = ref(null)
const { x, y } = useScroll(sliderRef)
const active = useVModel(props)

const handleClick = (event, item) => {
  // 点击分类时滑动滑块
  if (Array.from(event.target.classList).includes('slider-item')) {
    sliderMove(sliderTarget.value, event.target)
  }
  // 给当前选中分类赋值
  active.value = item.id
  emit('onSelect', item.id)
}

// 移动滑块
const sliderMove = (a, b) => {
  a.style.left = b.offsetLeft + 'px'
  a.style.width = b.offsetWidth + 'px'
}

// 初始化滑块位置,只执行一次
const initFunc = () => {
  const firstItem = document.querySelector(`#${active.value}`)
  if (sliderTarget.value && firstItem) {
    sliderMove(sliderTarget.value, firstItem)
    if (firstItem.offsetLeft > window.innerWidth / 2) {
      x.value = firstItem.offsetLeft - sliderRef.value.offsetWidth / 2
    } else {
      x.value = 0
    }
  }
}
const init = _.once(initFunc)
onUpdated(() => {
  init()
})
watch(active, (value) => {
  initFunc()
})
</script>
<style lang="scss" scoped></style>
