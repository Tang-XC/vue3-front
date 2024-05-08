<template>
  <ul
    class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[100px] py-1 text-xs text-zinc-400 duration-500 overflow-hidden mx-auto"
    :class="[isExpand ? 'h-[206px]' : 'h-[56px]']"
  >
    <div
      class="flex justify-start items-center absolute right-0 bottom-[0.01rem] z-20 p-1 rounded cursor-pointer duration-200 w-[3.1rem] h-5"
      @click="toggleExpand"
    >
      <div>
        <SvgIcon
          v-if="isExpand"
          class="w-1 h-1"
          name="arrowDown"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <SvgIcon
          v-else
          class="w-1 h-1"
          name="arrowUp"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
      </div>
      <div>
        <transition name="opacity">
          <li
            v-if="selectedItem && !isExpand"
            class="text-sm ml-1 bg-zinc-900 dark:bg-zinc-800 rounded-lg px-1 py-0.5 text-zinc-50"
          >
            {{ selectedItem }}
          </li>
        </transition>
      </div>
    </div>
    <li
      ref="sliderTarget"
      class="absolute h-4 bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
    ></li>
    <li
      v-for="item in data"
      :key="item.id"
      :id="item.id"
      class="slider-item shrink-0 px-1.5 py-0 z-20 duration-200 text-base font-bold h-4 leading-4 cursor-pointer hover:text-zinc-900 rounded mr-1 mb-1 dark:text-zinc-500"
      :class="{ 'slider-item-active': item.id === active }"
      @click="handleClick($event, item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
<script setup>
import { onMounted, ref, onUpdated, watch, computed } from 'vue'
import { useVModel } from '@vueuse/core'
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
const isExpand = ref(false)
const sliderTarget = ref(null)
const selectedItem = computed(() => {
  return props.data.slice(7).find((item) => item.id === active.value)?.name
})
const active = useVModel(props)
const toggleExpand = () => {
  isExpand.value = !isExpand.value
}
const handleClick = (event, item) => {
  // 点击分类时滑动滑块
  if (Array.from(event.target.classList).includes('slider-item')) {
    sliderMove(sliderTarget.value, event.target)
  }
  // 给当前选中分类赋值
  emit('onSelect', item.id)
  active.value = item.id
}

// 移动滑块
const sliderMove = (a, b) => {
  a.style.left = b.offsetLeft + 'px'
  a.style.top = b.offsetTop + 'px'
  a.style.width = b.offsetWidth + 'px'
}

// 初始化滑块位置,只执行一次
const initFunc = () => {
  const firstItem = document.querySelector(`#${active.value}`)
  if (sliderTarget.value && firstItem) {
    sliderMove(sliderTarget.value, firstItem)
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
<style lang="scss">
.slider-item-active {
  --tw-text-opacity: 1 !important;
  color: rgb(244 244 245 / var(--tw-text-opacity)) !important;
}
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.1s, transform 0.1s ease-in-out;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
