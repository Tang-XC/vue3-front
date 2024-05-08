<template>
  <div
    class="group flex h-[44px] relative justify-between items-center border-white rounded-xl"
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
      />
    </div>
    <div
      class="flex mx-[6px] items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    >
      <div class="border-r border-zinc-200 mr-1 pr-1">
        <SvgIcon
          name="close-fill"
          class="w-2 h-2 cursor-pointer"
          color="gray"
        />
      </div>
      <div>
        <Button icon="search" iconColor="#ffff" class="rounded-full"></Button>
      </div>
    </div>
    <Transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      ></div>
    </Transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { EMIT_UPDATE_MODELVALUE } from '@/constants'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits([EMIT_UPDATE_MODELVALUE])
const searchValue = useVModel(props)
</script>
