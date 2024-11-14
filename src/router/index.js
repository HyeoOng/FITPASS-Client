import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/main/Header.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component : () => import('@/components/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component : () => import('@/components/Singup.vue'),
    },
    {
      path: '/myhome',
      name: 'myhome',
      component: () => import('@/components/myhome/MyHome.vue'),
    }
  ],
})

export default router
