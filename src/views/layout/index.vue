<template>
  <div class="h-screen">
    <Header class="h-header" />
    <Main class="h-main" />
    <Floating />
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from './components/header/index.vue'
import Main from './components/main/index.vue'
import Floating from './components/floating/index.vue'
const store = useStore()
onMounted(() => {
  store.dispatch('category/useCategoryData')
})
</script>
