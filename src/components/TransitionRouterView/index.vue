<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTER_TYPE_NONE } from '@/constants'
const router = useRouter()
const props = defineProps({
  routerType: {
    type: String,
    default: ROUTER_TYPE_NONE
  },
  // 首页组件名称
  mainComponentName: {
    type: String,
    default: 'Main'
  }
})
const transitionName = ref('')
router.beforeEach((to, from) => {
  transitionName.value = props.routerType
})
</script>
<style lang="scss" scoped>
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
@keyframes back-in {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes back-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50%, 0);
  }
}
</style>
