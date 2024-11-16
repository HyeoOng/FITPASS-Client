import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/MainPage.vue'),
      children: [
        { path: '/', name: 'main', component: () => import('@/components/main/MainPageView.vue') },
        { path: '/signup', name: 'signup', component: () => import('@/components/Singup.vue') },
        { path: '/write', name: 'write', component: () => import('@/components/write/WritePageView.vue') },
        { path: '/community', name: 'community', component: () => import('@/components/community/CommunityPageView.vue') },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/components/adminpage/AdminPageView.vue'),
          redirect: '/admin/list', // 기본 경로 설정
          children: [
            { path: 'list', name: 'admin-list', component: () => import('@/components/adminpage/AdminListView.vue') },
            { path: 'sport', name: 'admin-sport', component: () => import('@/components/adminpage/AdminSportView.vue') },
            { path: 'request', name: 'admin-request', component: () => import('@/components/adminpage/AdminRequestView.vue') },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue'),
    },
  ],
})

export default router
