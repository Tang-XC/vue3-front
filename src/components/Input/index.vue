<template>
  <div class="w-full">
    <input
      class="outline-none border-none w-full h-[38px] text-sm indent-1 outline-blue-400"
      :type="type"
      v-model="value"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="placeholder"
    />
  </div>
</template>
<script setup>
import { inject } from 'vue'
import { useVModel } from '@vueuse/core'
import { EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR } from '@/constants'
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits([EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])
const value = useVModel(props, 'modelValue')
const blur = inject('blur')

const onInput = () => {
  emit(EMIT_INPUT, value.value)
}
const onFocus = () => {
  emit(EMIT_FOCUS, value.value)
}
const onBlur = () => {
  emit(EMIT_BLUR, value.value)
  blur(value.value)
}
</script>
