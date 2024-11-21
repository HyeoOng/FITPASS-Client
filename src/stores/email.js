import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true; // 필요 시 유지

const REST_API_URL = `http://localhost:8080/api/email`;

export const useEmailStore = defineStore(`email`, () => {
  
  const sendVerificationCode = async (email) => {
    try {
        const response = await axios.post(`${REST_API_URL}/send-code`, {email});
        return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const verifyCode = async (email, code) => {
    try {
      const response = await axios.post(`${REST_API_URL}/verify-code`, {email, code});
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return { sendVerificationCode, verifyCode };
});
