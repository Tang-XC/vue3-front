<template>
  <div class="h-screen">
    <Header class="h-header" />
    <Main class="h-main" />
    <Floating />
  </div>
</template>
<script setup>
import Header from './components/header/index.vue'
import Main from './components/main/index.vue'
import Floating from './components/floating/index.vue'
</script>
