<template>
  <div>
    <slot />
    <div ref="loadingRef" class="py-4">
      <div class="w-full flex justify-center">
        <Loading v-show="loading" class="w-5 h-5" />
      </div>
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了！
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'onLoad'])
const loadingRef = ref(null)
const isIntersect = ref(false)
const loading = useVModel(props, 'modelValue')
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  isIntersect.value = isIntersecting
  handleLoad()
})
const handleLoad = () => {
  setTimeout(() => {
    if (isIntersect.value && !loading.value && !props.isFinished) {
      loading.value = true
      emit('onLoad')
    }
  }, 200)
}
watch(
  loading,
  (val) => {
    handleLoad()
  },
  {
    immediate: true
  }
)
</script>
