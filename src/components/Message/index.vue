<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-show="isVisable"
      class="fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <SvgIcon
        :name="styles[type].icon + '-fill'"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></SvgIcon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>
<script>
const typeEnum = [TYPE_SUCCESS, TYPE_ERROR, TYPE_INFO, TYPE_WARNING]
</script>
<script setup>
import { ref, onMounted } from 'vue'
import { TYPE_SUCCESS, TYPE_INFO, TYPE_WARNING, TYPE_ERROR } from '@/constants'
import SvgIcon from '../SvgIcon/index.vue'
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        console.warn(`Message type must be one of ${typeEnum.join(', ')}`)
      }
      return result
    }
  },
  content: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  destory: {
    type: Function
  }
})
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
const isVisable = ref(false)
onMounted(() => {
  isVisable.value = true
  /**
   * 延迟时间关闭
   */
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
