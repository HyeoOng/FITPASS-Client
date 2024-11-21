import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_API_URL = `http://localhost:8080/api/post`;

export const usePostStore = defineStore('post', () => {

  const myPosts = ref([]);
  
  const registPost = async (input) => {
    await axios.post(REST_API_URL, input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => true).catch(() => false);
  }

  const getMyPosts = async (userId) => {
    try{
      const resp = await axios.get(REST_API_URL+ "/user/"+userId)
      myPosts.value = resp.data
      return myPosts;
    } catch(error){
      console.error("posts 불러오는 오류 (in post.js): ", error);
      return null;
    }
  }

  return { registPost, getMyPosts }
})
