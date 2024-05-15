import { createRouter, createWebHistory } from 'vue-router'
import { isMobileDevice } from '@/utils/flexible'
import mobileRoutes from './modules/mobileRoutes'
import pcRoutes from './modules/pcRoutes'
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes.concat(isMobileDevice.value ? mobileRoutes : pcRoutes)
})
export default router
