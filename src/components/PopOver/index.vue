<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceRef" class="p-1">
      <slot name="reference"></slot>
    </div>
    <div>
      <transition name="slide">
        <div
          ref="contentRef"
          v-show="isVisible"
          class="absolute p-1 z-20 bg-white border rounded-md"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { nextTick, ref, watch } from 'vue'
import { POPOVER_POSITION } from '@/constants'
const props = defineProps({
  placement: {
    type: String,
    default: POPOVER_POSITION.BOTTOMCENTER,
    validator: (value) => {
      const validatores = Object.values(POPOVER_POSITION)
      const result = validatores.includes(value)
      if (!result) {
        throw new Error(
          `无效的 placement 值: ${value}，请选择 ${validatores.join(
            '、'
          )} 中的一个`
        )
      }
      return result
    }
  }
})
const referenceRef = ref(null)
const contentRef = ref(null)
const isVisible = ref(false)
const onMouseenter = () => {
  isVisible.value = true
}
const onMouseleave = () => {
  isVisible.value = false
}
const useElementSize = (elem) => {
  if (!elem) return {}
  return {
    width: elem.offsetWidth,
    height: elem.offsetHeight,
    top: elem.offsetTop,
    left: elem.offsetLeft,
    right: elem.offsetLeft + elem.offsetWidth,
    bottom: elem.offsetTop + elem.offsetHeight
  }
}
const renderContentPosition = () => {
  switch (props.placement) {
    case POPOVER_POSITION.TOPLEFT:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).top -
        useElementSize(contentRef.value).height
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left
      }px`
      break
    case POPOVER_POSITION.TOPCENTER:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).top -
        useElementSize(contentRef.value).height
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left
      }px`
      break
    case POPOVER_POSITION.TOPRIGHT:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).top -
        useElementSize(contentRef.value).height
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).right -
        useElementSize(contentRef.value).width
      }px`

    case POPOVER_POSITION.LEFTTOP:
      contentRef.value.style.top = `${useElementSize(referenceRef.value).top}px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left -
        useElementSize(contentRef.value).width
      }px`
      break
    case POPOVER_POSITION.LEFTCENTER:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).top +
        useElementSize(referenceRef.value).height / 2 -
        useElementSize(contentRef.value).height / 2
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left -
        useElementSize(contentRef.value).width
      }px`
      break
    case POPOVER_POSITION.LEFTBOTTOM:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).bottom -
        useElementSize(contentRef.value).height
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left -
        useElementSize(contentRef.value).width
      }px`
      break
    case POPOVER_POSITION.RIGHTTOP:
      contentRef.value.style.top = `${useElementSize(referenceRef.value).top}px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).right
      }px`
      break
    case POPOVER_POSITION.RIGHTCENTER:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).top +
        useElementSize(referenceRef.value).height / 2 -
        useElementSize(contentRef.value).height / 2
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).right
      }px`
      break
    case POPOVER_POSITION.RIGHTBOTTOM:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).bottom -
        useElementSize(contentRef.value).height
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).right
      }px`
      break
    case POPOVER_POSITION.BOTTOMLEFT:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).bottom
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left
      }px`
      break
    case POPOVER_POSITION.BOTTOMCENTER:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).bottom
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).left -
        useElementSize(contentRef.value).width / 2 +
        useElementSize(referenceRef.value).width / 2
      }px`
      break
    case POPOVER_POSITION.BOTTOMRIGHT:
      contentRef.value.style.top = `${
        useElementSize(referenceRef.value).bottom
      }px`
      contentRef.value.style.left = `${
        useElementSize(referenceRef.value).right -
        useElementSize(contentRef.value).width
      }px`
      break
  }
}
watch(isVisible, (value) => {
  if (!value) return
  nextTick(() => {
    renderContentPosition()
  })
})
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
