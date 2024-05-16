export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload/index.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/personal/index.vue')
  }
]
