<template v-slot="slot">
  <div class="text-base flex items-center p-1 pr-0 mb-1">
    <label
      class="text-zinc-500 text-sm font-medium"
      :style="{
        display: 'block',
        width: labelWidth
      }"
      >{{ label }}</label
    >
    <div class="flex-1 relative">
      <div
        class="overflow-hidden rounded-sm border"
        :class="{
          'error-input-wrapper': field.validate !== true
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="flex px-1 -mt-1">
    <div
      :style="{
        display: 'block',
        width: labelWidth
      }"
    ></div>
    <div class="flex-1 text-sm">
      <div>
        <transition name="slide-down">
          <span v-if="field.validate != true" class="text-red-400">{{
            field.validate
          }}</span>
        </transition>
        <transition name="slide-down">
          <span
            v-if="field.validate === true && field.value"
            class="text-success-300 flex items-center"
          >
            <SvgIcon
              name="success-fill"
              class="w-1.5 h-1.5 mr-0.5 fill-success-300"
            />
            <div>输入正确!</div>
          </span>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormItem'
}
</script>
<script setup>
import { computed, inject, ref, provide, watch, isReactive } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  prop: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String
  },
  rules: {
    type: Array,
    default: []
  }
})
const field = ref({
  name: props.prop,
  value: '',
  validate: true
})
const { rules: formRules, labelWidth: formLabelWidth } = inject('formProps')
const setFields = inject('setFields')
const labelWidth = computed(() => props.labelWidth || formLabelWidth)
const rules = computed(() =>
  props.rules.length > 0 ? props.rules : formRules[props.prop]
)

const blur = (val) => {
  const rule = rules.value.find((item) => item.trigger === 'blur').validator
  if (rule) {
    field.value = {
      ...field.value,
      value: val,
      validate: rule(val)
    }
  }
}
provide('blur', blur)
watch(
  () => field.value,
  () => {
    setFields(field.value)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style scoped setup>
.error-input-wrapper {
  border: 1px solid red;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateX(-20px) skew(-90deg);
  position: absolute;
}
</style>
