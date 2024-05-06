<template>
  <svg aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" :fill="color" :class="fillClass" />
  </svg>
</template>
<script setup>
//指定组件名称
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fillClass: {
    type: String
  }
})
</script>
