import { createRouter, createWebHistory } from 'vue-router'
import { isMobileDevice } from '@/utils/flexible'
import mobileRoutes from './modules/mobileRoutes'
import pcRoutes from './modules/pcRoutes'
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileDevice.value ? mobileRoutes : pcRoutes
})
export default router
