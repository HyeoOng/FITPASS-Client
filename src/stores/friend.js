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
    return response.data;
  }

  const getFriends = async (userId) => {
    const response = await axios.get(`${REST_API_URL}/${userId}`);
    console.log(response);
    return response.data;
  }

  const getFriendRequests = async (userId) => {
    const response = await axios.get(`${REST_API_URL}/request/${userId}`);
    console.log(response);
    return response.data;
  }

  const deleteFriendRequest = async (fromUser, toUser) => {
    const response = await axios.post(`${REST_API_URL}/request/delete`, {
      fromUser, toUser
    })
    return response.data;
  }

  const deleteFriend = async (fromUser, toUser) => {
    const response = await axios.post(`${REST_API_URL}/delete`, {
      fromUser, toUser
    })
    return response.data;
  }

  return { sendFriendRequest, getFriends, getFriendRequests, deleteFriendRequest, deleteFriend };
});
