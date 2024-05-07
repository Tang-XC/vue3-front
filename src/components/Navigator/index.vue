<template>
  <MobileNavigator
    v-if="type === 'mobile'"
    v-model="active"
    @onSelect="handleSelect"
  >
    <template #more>
      <slot name="more"></slot>
    </template>
  </MobileNavigator>
  <PcNavigator v-else></PcNavigator>
</template>
<script setup>
import MobileNavigator from './mobile/index.vue'
import PcNavigator from './pc/index.vue'
import { useVModel } from '@vueuse/core'
const props = defineProps({
  type: {
    type: String,
    reuqired: true
  },
  modelValue: {
    type: String,
    reuqired: true
  }
})
const active = useVModel(props, 'modelValue')
const handleSelect = (val) => {
  active.value = val
}
</script>
