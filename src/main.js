import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import { useREM } from '@/utils/flexible'
import Components from '@/components'
import installFilters from '@/plugins/filters'
import './style/index.scss'
import 'virtual:svg-icons-register'
useREM()
const app = createApp(App).use(router).use(Components)
installFilters(app)
app.mount('#app')
