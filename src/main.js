import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import { useREM } from '@/utils/flexible'
import Components from '@/components'
import installFilters from '@/plugins/filters'
import directives from '@/directives'
import store from '@/store'
import useTheme from '@/utils/theme'

import './style/index.scss'
import 'virtual:svg-icons-register'
useREM()
useTheme()
const app = createApp(App)
  .use(router)
  .use(Components)
  .use(store)
  .use(directives)
installFilters(app)
app.mount('#app')
