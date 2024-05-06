import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import { useREM } from '@/utils/flexible'
import Components from '@/components'
import './style/index.scss'
import 'virtual:svg-icons-register'
useREM()
createApp(App).use(router).use(Components).mount('#app')
