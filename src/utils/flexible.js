import { PC_DEVICE_WIDTH } from '@/constants'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
export const isMobileDevice = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
