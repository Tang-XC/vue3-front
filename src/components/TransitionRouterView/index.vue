<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="handleBeforeEnter"
      @after-leave="handleAfterLeave"
    >
      <keep-alive :include="virtualTask">
        <component
          :is="Component"
          :key="$route.fullPath"
          :class="{ 'fixed top-0 left-0 w-full h-full z-10': isAnimate }"
        />
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
const virtualTask = ref([props.mainComponentName])
const isAnimate = ref(false)
const handleBeforeEnter = () => {
  isAnimate.value = true
}
const handleAfterLeave = () => {
  isAnimate.value = false
}
const clearVirtualTask = () => {
  virtualTask.value = []
}
router.beforeEach((to, from) => {
  transitionName.value = props.routerType

  if (props.routerType === 'push') {
    virtualTask.value.push(to.name)
  } else if (props.routerType === 'back') {
    virtualTask.value.pop()
  }

  if (to.name === props.mainComponentName) {
    clearVirtualTask()
  }
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
    transform: translate(-100%, 0);
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
    transform: translate(100%, 0);
  }
}
</style>
