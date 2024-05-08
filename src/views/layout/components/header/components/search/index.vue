<template>
  <div
    class="group flex h-[44px] relative justify-between items-center border-white rounded-xl"
    ref="searchRef"
  >
    <div class="flex mx-2 z-10">
      <SvgIcon name="search" class="w-2 h-2" />
    </div>
    <div class="flex-1 text-base">
      <input
        type="text"
        placeholder="搜索"
        class="w-full block absolute h-[44px] top-0 left-0 outline-0 caret-zinc-400 border border-zinc-100 bg-zinc-100 px-5 focus:shadow-lg hover:bg-white hover:border-zinc-200 hover:shadow-sm rounded-xl"
        v-model="searchValue"
        @keyup.enter="onSearch"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div class="flex mx-[6px] items-center z-10">
      <div
        v-show="searchValue && searchValue.length > 0"
        class="border-r border-zinc-200 mr-1 pr-1"
        @click="onSearchClear"
      >
        <SvgIcon
          name="close-fill"
          class="w-2 h-2 cursor-pointer"
          color="gray"
        />
      </div>
      <div
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        :class="{
          'opacity-100': searchValue && searchValue.length > 0
        }"
      >
        <Button
          icon="search"
          iconColor="#ffff"
          class="rounded-full"
          @click="onSearch"
        ></Button>
      </div>
    </div>
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
import {
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_BLUR,
  EMIT_FOCUS
} from '@/constants'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_BLUR,
  EMIT_FOCUS
])
const searchRef = ref(null)
const isFocus = ref(false)
const searchValue = useVModel(props)
const onSearchClear = () => {
  searchValue.value = ''
  emit(EMIT_CLEAR)
}
const onSearch = () => {
  emit(EMIT_SEARCH, searchValue.value)
}
const onFocus = () => {
  isFocus.value = true
  emit(EMIT_FOCUS)
}
const onBlur = () => {
  emit(EMIT_BLUR)
}
onClickOutside(searchRef, () => {
  isFocus.value = false
})
watch(searchValue, (value) => {
  emit(EMIT_INPUT, value)
})
</script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
