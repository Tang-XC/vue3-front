import { useIntersectionObserver } from '@vueuse/core'
export default {
  mounted(el, binding) {
    const temp = el.src
    el.src = ''
    //更改data-*
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        setTimeout(() => {
          el.src = temp
          el.setAttribute('data-test', 'yes')
        }, 1000)
        stop()
      }
    })
  }
}
