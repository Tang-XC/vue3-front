import { useIntersectionObserver } from '@vueuse/core'
export default {
  mounted(el) {
    const temp = el.src
    el.src = ''
    el.style.background = 'red'
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = temp
        stop()
      }
    })
  }
}
