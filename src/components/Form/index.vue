<template>
  <div>
    <slot :labelWidth="labelWidth"></slot>
  </div>
</template>
<script>
export default {
  name: 'Form'
}
</script>
<script setup>
import { provide, ref, watch } from 'vue'
const props = defineProps({
  model: {
    type: Object,
    required: true
  },
  rules: {
    type: Object,
    required: true
  },
  labelWidth: {
    type: String,
    default: '110px'
  }
})
const fields = ref([])
provide('labelWidth', props.labelWidth)
provide('rules', props.rules)
provide('formProps', props)
provide('setFields', (field) => {
  const target = fields.value.find((item) => item.name === field.name)
  if (target) {
    const arrs = fields.value.map((item) => {
      if (item.name === field.name) {
        return JSON.parse(JSON.stringify(field))
      }
      return JSON.parse(JSON.stringify(item))
    })
    fields.value = arrs
  } else {
    fields.value.push(field)
  }
})
watch(
  () => fields.value,
  () => {
    console.log('fields', fields.value)
  },
  { deep: true, immediate: true }
)
</script>
