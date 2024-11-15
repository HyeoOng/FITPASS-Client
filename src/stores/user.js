// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogined: false, // 초기값 설정
  }),
  actions: {
    // 로그인 상태를 변경하는 메서드
    logIn() {
      this.isLogined = true;
    },
    logOut() {
      this.isLogined = false;
    },
  },
});
