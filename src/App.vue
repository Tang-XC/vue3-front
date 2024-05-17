<template>
  <div class="w-screen h-screen fixed top-0 left-0">
    <TransitionRouterView
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></TransitionRouterView>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import TransitionRouterView from './components/TransitionRouterView/index.vue'

const store = useStore()
watch(
  () => store.getters.routerType,
  (newVal) => {}
)
</script>
