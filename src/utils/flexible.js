import { PC_DEVICE_WIDTH } from '@/constants'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
export const isMobileDevice = computed(() => {
  return width.value < PC_DEVICE_WIDTH
}).value

export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    if (fontSize > MAX_FONT_SIZE) {
      fontSize = MAX_FONT_SIZE
    }
    html.style.fontSize = fontSize + 'px'
  })
}
