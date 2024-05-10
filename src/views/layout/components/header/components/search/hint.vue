<template>
  <div class="">
    <ul>
      <li
        class="w-full text-zinc-500 py-0.5 hover:text-zinc-900 hover:bg-zinc-200 px-1 rounded cursor-pointer"
        v-for="item in hintData"
        :key="item"
        @click="onHintClick(item)"
        v-html="highlightText(item)"
      ></li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getHint } from '@/api/pexels.js'
import { EMIT_CLICK } from '@/constants'
import { watchDebounced } from '@vueuse/core'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emit = defineEmits([EMIT_CLICK])
const hintData = ref([])
const getHintData = () => {
  if (!props.searchText) return
  getHint(props.searchText).then((res) => {
    hintData.value = res.data.result
  })
}
const onHintClick = (item) => {
  emit(EMIT_CLICK, item)
}
const highlightText = (text) => {
  const result = `<span class="text-zinc-900 font-bold dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, result)
}
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
</script>
