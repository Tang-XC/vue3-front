<template>
  <div class="w-screen h-screen fixed top-0 left-0">
    <TransitionRouterView
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></TransitionRouterView>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TransitionRouterView from './components/TransitionRouterView/index.vue'

const store = useStore()
onMounted(() => {
  console.log(store.getters.routerType)
})
watch(
  () => store.getters.routerType,
  (newVal) => {
    console.log(newVal)
  }
)
</script>
