// stores/user.js
import {ref} from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
axios.defaults.withCredentials = true; // withCredentials 전역 설정

const REST_API_URL = `http://localhost:8080/api/users`

export const useUserStore = defineStore('user', () => {
  const isLogined = ref(false);

  const login = function(user) {
    axios({
      url: REST_API_URL + "/login",
      method: "POST",
      data: user
    })
    .then((response) => {
      console.log("완료2222");
      isLogined.value = true;
      console.log("isLogin: " , isLogined);
      router.push("/");
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("nickname", response.data.nickname);

    })
    .catch((response) => {
      console.log(response);
    })
  }
  return {login,isLogined};
});
