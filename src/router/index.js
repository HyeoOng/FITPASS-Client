import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

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
          path: '/profile',
          name: 'profile',
          component: () => import('@/components/profile/ProfileView.vue'),
        },
        {
          path: 'profile/edit',
          name: 'profile-edit',
          component: () => import('@/components/profile/ProfileEditView.vue'),
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/components/adminpage/AdminPageView.vue'),
          redirect: '/admin/list', // 기본 경로 설정
          meta: { requiresAdmin: true }, // 관리자 권한 필요
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
});

// 전역 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Pinia 스토어 사용
  const isAdmin = userStore.isAdmin; // isAdmin 값 가져오기

  if (to.meta.requiresAdmin && !isAdmin) {
    // 관리자가 아니면 접근을 막고 알림을 띄운 후 이동을 취소
    alert("관리자 권한이 필요합니다.");
    next(false); // 화면 이동을 막음
  } else {
    // 관리자 권한이 충족되면 다음 라우트로 이동
    next();
  }
});

export default router;
