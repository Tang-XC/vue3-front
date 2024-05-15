<template>
  <teleport to="body">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      duration="300"
      mode="in-out"
    >
      <div
        v-if="open"
        ref="modalRef"
        class="fixed p-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 grid place-items-center bg-zinc-50 shadow-lg rounded overflow-hidden"
        :style="{ width: props.width }"
      >
        <div class="flex justify-between items-center w-full">
          <div class="text-base">
            {{ title }}
          </div>
          <div style="cursor: pointer">
            <SvgIcon class="w-2 h-2" name="close" @click="handleClose" />
          </div>
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useVModel, useElementBounding, onClickOutside } from '@vueuse/core'
import gsap from 'gsap'
const props = defineProps({
  title: {
    type: String
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '50%'
  },
  triggerRef: {
    type: Object,
    default: null
  }
})
const open = useVModel(props, 'modelValue')
const triggerElProps = computed(() => useElementBounding(props.triggerRef))
const modalRef = ref(null)
const handleClose = () => {
  open.value = false
}
const beforeEnter = (el) => {
  const { left, top, width, height } = triggerElProps.value
  gsap.set(el, {
    opacity: 0,
    left: `${left.value + width.value / 2}px`,
    top: `${top.value + height.value / 2}px`,
    scale: 0.1
  })
}
const enter = (el) => {
  gsap.to(el, {
    opacity: 1,
    left: '50%',
    top: '50%',
    scale: 1
  })
}
const leave = (el) => {
  const { left, top, width, height } = triggerElProps.value
  gsap.to(el, {
    opacity: 0,
    left: `${left.value + width.value / 2}px`,
    top: `${top.value + height.value / 2}px`,
    scale: 0.1
  })
}
onClickOutside(modalRef, handleClose)
</script>
