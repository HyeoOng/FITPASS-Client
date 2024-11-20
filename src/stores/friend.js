import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true; // 필요 시 유지

const REST_API_URL = `http://localhost:8080/api/friend`;

export const useFriendStore = defineStore('friend', () => {
  const sendFriendRequest = async (fromUser, toUser) => {
    const response = await axios.post(`${REST_API_URL}`, {
      fromUser, toUser
    })
    console.log(response);
  }

  return { sendFriendRequest };
});
