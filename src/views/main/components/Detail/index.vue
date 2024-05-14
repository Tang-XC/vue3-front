<template>
  <div class="flex w-full h-[600px]">
    <div
      class="w-[63%]"
      style="margin-left: -40px; margin-bottom: -40px; margin-top: -50px"
    >
      <img
        class="w-full h-full object-cover"
        ref="picCardImgRef"
        :src="data.photo"
      />
    </div>
    <div class="h-full flex-1 ml-3 mt-2">
      <div class="text-base dark:text-zinc-300">{{ data.title }}</div>
      <div class="flex text-sm justify-start items-center mt-0.5">
        <div class="rounded-full w-3 h-3 overflow-auto">
          <img :src="data.avatar" />
        </div>
        <div class="ml-1 text-zinc-500">
          {{ data.author }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
