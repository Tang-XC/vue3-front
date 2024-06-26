<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnim
      }
    ]"
    @click.stop="onBtnClick"
  >
    <Loading v-if="loading" />
    <SvgIcon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
    />
    <slot v-else></slot>
  </button>
</template>
<script>
const typeEnum = {
  primary:
    'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc300 active:bg-zinc200 dark:text-zinc-300 dark::bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>
<script setup>
import { computed } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'
import Loading from '../Loading/index.vue'
import { EMIT_CLICK } from '@/constants'

const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的size必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMIT_CLICK])
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
const onBtnClick = () => {
  if (props.loading) return
  emits(EMIT_CLICK)
}
</script>
