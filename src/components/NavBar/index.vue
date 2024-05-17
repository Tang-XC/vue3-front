<template>
  <div
    class="flex h-[40px] px-1 justify-between items-center h-16 bg-white border-b border-gray-200"
  >
    <div class="flex items-center text-base flex-1" @click="onLeftClick">
      <SvgIcon name="left" class="w-2 h-2"></SvgIcon><span>返回</span>
    </div>
    <div class="text-lg font-bold">
      {{ title }}
    </div>
    <div class="flex-1" @click="onRightClick">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['onLeftClick', 'onRightClick'])
const onLeftClick = () => {
  emit('onLeftClick')
}
const onRightClick = () => {
  emit('onRightClick')
}
</script>
