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
  <PcNavigator v-model="active" @onSelect="handleSelect" v-else></PcNavigator>
</template>
<script setup>
import MobileNavigator from './mobile/index.vue'
import PcNavigator from './pc/index.vue'
import { useVModel } from '@vueuse/core'
import { EMIT_UPDATE_MODELVALUE } from '@/constants'
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
const emit = defineEmits([EMIT_UPDATE_MODELVALUE])
const active = useVModel(props)
const handleSelect = (val) => {
  active.value = val
}
</script>
