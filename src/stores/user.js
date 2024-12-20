import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import { errorHandler } from '@/util/errorHandler';

const REST_API_URL = `http://localhost:8080/api/users`;
const { showError } = errorHandler();

export const useUserStore = defineStore('user', () => {
  const isLogined = ref(sessionStorage.getItem('userId') !== null);
  const isAdmin = ref(false); // 관리자 여부를 추적하는 변수
  const userNn = ref(sessionStorage.getItem("nickname") || "USER");
  const userId = ref(sessionStorage.getItem("userId"));
  const userRegDate = ref(null);
  const searchFriendsList = ref([])

  const setNickname = (nn) => {
    userNn.value = nn; // 화면에 표시되는 닉네임 값
    sessionStorage.setItem('nickname', nn)
  }

  const clearNickname = () => {
    userNn.value = null;
    sessionStorage.removeItem('nickname');
  }

  const signup = async function (input) {
    try {
      const response = await axios.post(`${REST_API_URL}/signup`,input, {
        headers: {
          "Content-Type" : "multipart/form-data",
        }
      });
      const flag = response.data.flag;

      if (flag) {
        alert("회원 가입에 성공했습니다. 로그인 창으로 이동해주세요");
        router.push("/");
      } else {
        if(response.data.msg) showError(response.data.code, response.data.msg);
        else showError(response.data.code);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원 가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const login = async function (user) {
    try {
      const response = await axios.post(`${REST_API_URL}/login`, user);
      isLogined.value = true;
      console.log("isLogined:", isLogined.value);
      console.log("로그인 정보 : ", response)
      console.log("로그인 실패 성공 여부: ", response.status)

      setNickname(response.data.nickname);
      userId.value = response.data.userId;
      userRegDate.value = new Date - new Date(response.data.regDate);
      sessionStorage.setItem("userId", userId.value)

      // admin이 1 또는 2일 경우에만 관리자로 처리
      console.log(response.data.admin);
      if (response.data.admin === 1 || response.data.admin === 2) {
        isAdmin.value = true;
      } else {
        isAdmin.value = false;
      }

      return response.data;

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("로그인 실패");
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(REST_API_URL + '/curr');
      if (response.data != null) {
        console.log(response)
        const { user, login } = response.data;
        if(login){
          isLogined.value = true;
          setNickname(user.nn);
          userId.value = user.userId;
          userRegDate.value = new Date - new Date(user.regDate);
        }else{
          sessionStorage.clear();
          router.push('/');
        }
      }
    } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
    }
  };

  const logout = async function () {
    try {
      await axios.get(`${REST_API_URL}/logout`);
      sessionStorage.removeItem("userId");
      clearNickname();
      isLogined.value = false;
      isAdmin.value = false; // 로그아웃 시 관리자 상태 초기화
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  // 프로필 수정 시 사용
  const getUserByUserId = async function (userId) {
    try {
      const response = await axios.get(`${REST_API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("getUserByUserId error:", error);
      throw error;
    }
  };

  // 커뮤니티 페이지에서 친구 검색 시 사용
  const getUsersByNn = async function (nn) {
    try {
      const response = await axios.get(`${REST_API_URL}/search?nn=${nn}`);
      searchFriendsList.value = response.data;
      console.log("sera124", searchFriendsList.value);
      return searchFriendsList;
    } catch (error) {
      throw error;
    }
  }

  const emailCheck = async (email) => {
    try {
      const response = await axios.post(`${REST_API_URL}/emailCheck`, {
        email
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const nnCheck = async (nn) => {
    try {
      const response = await axios.post(`${REST_API_URL}/nnCheck`, {
        nn
      })
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { userId, signup, login, isLogined, isAdmin, logout, getUserByUserId, userNn, setNickname, clearNickname, getUsersByNn, searchFriendsList, emailCheck, nnCheck, getCurrentUser, userRegDate };
});
