import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_API_URL = `http://localhost:8080/api/post`;

export const usePostStore = defineStore('post', () => {
  
  const registPost = async (input) => {
    console.log("input: ", input)
    try {
      const response = await axios.post(REST_API_URL, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("데이터 전송 성공");
    } catch (error) {
      console.error(error);
      alert("데이터 전송 실패");
    }
  }

  return { registPost }
})
