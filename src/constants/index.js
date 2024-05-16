export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_SYSTEM = 'system'
export const EMIT_CLICK = 'click'
export const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
export const EMIT_SEARCH = 'search'
export const EMIT_CLEAR = 'clear'
export const EMIT_INPUT = 'input'
export const EMIT_BLUR = 'blur'
export const EMIT_FOCUS = 'focus'
export const TYPE_SUCCESS = 'success'
export const TYPE_INFO = 'info'
export const TYPE_WARNING = 'warning'
export const TYPE_ERROR = 'error'
export const ROUTER_TYPE_NONE = 'none'
export const ROUTER_TYPE_PUSH = 'push'
export const ROUTER_TYPE_BACK = 'back'
export const POPOVER_POSITION = {
  TOPLEFT: 'top-left',
  TOPCENTER: 'top-center',
  TOPRIGHT: 'top-right',
  BOTTOMLEFT: 'bottom-left',
  BOTTOMCENTER: 'bottom-center',
  BOTTOMRIGHT: 'bottom-right',
  LEFTTOP: 'left-top',
  LEFTCENTER: 'left-center',
  LEFTBOTTOM: 'left-bottom',
  RIGHTTOP: 'right-top',
  RIGHTCENTER: 'right-center',
  RIGHTBOTTOM: 'right-bottom'
}
export const PC_DEVICE_WIDTH = 1280
export const ALL_CATEGORY_ITEM = {
  id: 'all',
  name: '全部'
}
export const THEME_DROPDOWN_LIST = [
  {
    name: '极夜白',
    type: THEME_LIGHT,
    icon: 'sun',
    value: 0
  },
  {
    name: '极夜黑',
    type: THEME_DARK,
    icon: 'moon',
    value: 1
  },
  {
    name: '跟随系统',
    type: THEME_SYSTEM,
    icon: 'colorPalette',
    value: 2
  }
]
export const USER_DROPDOWN_LIST = [
  {
    name: '个人资料',
    icon: 'userProfile',
    value: 0,
    path: '/profile'
  },
  {
    name: '升级VIP',
    icon: 'vip',
    value: 1,
    path: 'vip-profile'
  },
  {
    name: '退出登录',
    icon: 'exit',
    value: 2
  }
]
