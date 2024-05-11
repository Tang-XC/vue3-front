<template>
  <div>
    <transition name="fade">
      <div
        v-if="visible"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <transition name="up">
      <div
        v-if="visible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <div class="flex justify-end">
          <Button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </Button>
          <Button type="primary" @click="onConfirmClick">
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import Button from '../Button/index.vue'
import { onMounted, ref } from 'vue'
const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelHandler: {
    type: Function
  },
  confirmHandler: {
    type: Function
  },
  closeHandler: {
    type: Function
  }
})
const visible = ref(false)
const duration = '0.5s'

const close = () => {
  visible.value = false
  setTimeout(() => {
    props.closeHandler?.()
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}
const show = () => {
  visible.value = true
}
const onCancelClick = () => {
  props.cancelHandler?.()
  close()
}
const onConfirmClick = () => {
  props.confirmHandler?.()
  close()
}
onMounted(() => {
  show()
})
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  transform: translate(-50%, 20%);
  opacity: 0;
}
</style>
