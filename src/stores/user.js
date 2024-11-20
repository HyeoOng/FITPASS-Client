import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true; // 필요 시 유지

const REST_API_URL = `http://localhost:8080/api/users`;

export const useUserStore = defineStore('user', () => {
  const isLogined = ref(sessionStorage.getItem('userId') !== null);
  const userNn = ref(sessionStorage.getItem("nickname") || "USER");

  const setNickname = (nn) => {
    userNn.value = nn; // 화면에 표시되는 닉네임 값
    sessionStorage.setItem('nickname', nn)
  }

  const clearNickname = () => {
    userNn.value = null;
    sessionStorage.removeItem('nickname');
  }

  const signup = async function (user) {
    try {
      const response = await axios.post(`${REST_API_URL}/signup`, user);
      const msg = response.data.msg;

      if (msg === "success") {
        alert("회원 가입에 성공했습니다. 로그인 창으로 이동해주세요");
        router.push("/");
      } else {
        alert("회원 가입에 실패했습니다: " + msg);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("회원 가입 중 오류가 발생했습니다.");
    }
  };

  const login = async function (user) {
    try {
      const response = await axios.post(`${REST_API_URL}/login`, user);
      isLogined.value = true;
      console.log("isLogined:", isLogined.value);
      console.log("로그인 정보 : ", response)

      sessionStorage.setItem("userId", response.data.userId);
      setNickname(response.data.nickname);
      // sessionStorage.setItem("nickname", response.data.nickname);

      router.push("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    }
  };

  const logout = async function () {
    try {
      await axios.get(`${REST_API_URL}/logout`);
      sessionStorage.removeItem("userId");
      clearNickname();
      isLogined.value = false;
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const getUserByUserId = async function (userId) {
    try {
      const response = await axios.get(`${REST_API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("getUserByUserId error:", error.response?.data || error.message);
      throw error;
    }
  };

  return { signup, login, isLogined, logout, getUserByUserId, userNn, setNickname, clearNickname };
});
