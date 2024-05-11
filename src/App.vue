<template>
  <div class="w-screen h-screen fixed top-0 left-0">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { message } from '@/components/index'
import { onMounted } from 'vue'
onMounted(() => {
  message('success', 'Welcom to imooc-front')
})
</script>
