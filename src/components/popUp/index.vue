<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          v-if="isVisible"
          @click="closePopup"
        ></div>
      </transition>
      <transition :name="`popup-${position}`">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="z-50 fixed bg-white"
          :class="{
            'top-base': position === 'top',
            'bottom-base': position === 'bottom',
            'left-base': position === 'left',
            'right-base': position === 'right'
          }"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { EMIT_UPDATE_MODELVALUE } from '@/constants'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'bottom'
  }
})
const emit = defineEmits([EMIT_UPDATE_MODELVALUE])
const isVisible = useVModel(props)
const isLocked = useScrollLock(document.body)
const closePopup = () => {
  isVisible.value = false
}
watch(
  () => isVisible,
  (val) => {
    isLocked.value = val
  }
)
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-top-enter-active,
.popup-top-leave-active,
.popup-bottom-enter-active,
.popup-bottom-leave-active,
.popup-left-enter-active,
.popup-left-leave-active,
.popup-right-enter-active,
.popup-right-leave-active {
  transition: all 0.3s;
}

.popup-top-enter-from,
.popup-top-leave-to {
  transform: translateY(-100%);
}
.popup-bottom-enter-from,
.popup-bottom-leave-to {
  transform: translateY(100%);
}
.popup-left-enter-from,
.popup-left-leave-to {
  transform: translateX(-100%);
}
.popup-right-enter-from,
.popup-right-leave-to {
  transform: translateX(100%);
}
.top-base {
  width: 100vw;
  top: 0px;
}
.bottom-base {
  width: 100vw;
  bottom: 0px;
}
.left-base {
  height: 100vh;
  left: 0px;
}
.right-base {
  height: 100vh;
  right: 0px;
}
</style>
