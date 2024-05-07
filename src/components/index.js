import SvgIcon from './svgIcon/index.vue'
import PopUp from './popUp/index.vue'
export default {
  install(app) {
    app.component('SvgIcon', SvgIcon)
    app.component('PopUp', PopUp)
  }
}
