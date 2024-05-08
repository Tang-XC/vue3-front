import store from '@/store'
import { watch } from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * 监听系统主题变化
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = (themeType) => {
  let themeClassName = ''
  switch (themeType) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
    default:
  }
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      // 修改主题
      changeTheme(val)
    },
    {
      // 初始执行一次
      immediate: true
    }
  )
}
