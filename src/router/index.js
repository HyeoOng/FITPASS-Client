import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/MainPage.vue'),
      children : [
        {path: '/', name: 'main', component: () => import('@/components/main/MainPageView.vue')},
        {path: '/signup', name: 'signup', component : () => import('@/components/Singup.vue')},
        {path: '/write', name: 'write', component : () => import('@/components/write/WritePageView.vue')},
        {path: '/community', name: 'community', component : () => import('@/components/community/CommunityPageView.vue')},
        {path: '/admin', name: 'admin', component : () => import('@/components/adminPage/AdminPageView.vue')},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component : () => import('@/components/Login.vue'),
    },
    
  ],
})

export default router
