import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_API_URL = `http://localhost:8080/api/users`;

export const useUserStore = defineStore('user', () => {
  const isLogined = ref(sessionStorage.getItem('userId') !== null);
  const userNn = ref(sessionStorage.getItem("nickname") || "USER");
  const userId = ref(sessionStorage.getItem("userId"));
  const searchFriendsList = ref([])

  const setNickname = (nn) => {
    userNn.value = nn; // 화면에 표시되는 닉네임 값
    sessionStorage.setItem('nickname', nn)
  }

  const clearNickname = () => {
    userNn.value = null;
    sessionStorage.removeItem('nickname');
  }

  const signup = async function (user, profile) {
    const formData = new FormData();
    formData.add("user", new Blob([JSON.stringify(user)], {
      type: "application/json"
    }));
    formData.append("profile", profile);


    try {
      const response = await axios.post(`${REST_API_URL}/signup`,formData, {
        headers: {
          "Content-Type" : "multipart/form-data",
        }
      });
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
      console.log("로그인 실패 성공 여부: ", response.status)

      setNickname(response.data.nickname);
      userId.value = response.data.userId;
      sessionStorage.setItem("userId", userId.value)
      return response.data;

      router.push("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
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
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  // 프로필 수정 시 사용
  const getUserByUserId = async function (userId) {
    try {
      const response = await axios.get(`${REST_API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("getUserByUserId error:", error.response?.data || error.message);
      throw error;
    }
  };

    // 커뮤니티 페이지에서 친구 검색 시 사용
  const getUsersByNn = async function (nn) {
    try {
      const response = await axios.get(`${REST_API_URL}/search?nn=${nn}`);
      // console.log("친구 응답: ", response.data);
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

  return { userId, signup, login, isLogined, logout, getUserByUserId, userNn, setNickname, clearNickname, getUsersByNn, searchFriendsList, emailCheck, nnCheck, getCurrentUser };
});
