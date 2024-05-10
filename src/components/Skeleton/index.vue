<template>
  <div v-if="loading">
    <DefaultType v-if="type === 'default'" />
  </div>
  <div v-else>
    <slot />
  </div>
</template>
<script setup>
import DefaultType from './type/default.vue'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
