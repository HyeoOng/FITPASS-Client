import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_API_URL = `http://localhost:8080/api/post`;

// axios 설정
// axios.defaults.withCredentials = true;

export const usePostStore = defineStore('post', () => {

  const myPosts = ref([]);
  
  const registPost = async (input) => {
    await axios.post(REST_API_URL, input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => true).catch(() => false);
  }
  

  const getMyPosts = async (page, size) => {
    try{
      const resp = await axios.get(REST_API_URL+ "/user", {
        params: {
          page: page-1,
          size,
        }
      })
      console.log("pagenation: ",resp.data);
      myPosts.value = resp.data
      return myPosts;
    } catch(error){
      console.error("posts 불러오는 오류 (in post.js): ", error);
      return null;
    }
  }

  const getAllPosts = async (page, size) => {
    try{
      const resp = await axios.get(REST_API_URL, {
        params: {
          page: page-1,
          size
        }
      });
      myPosts.value = resp.data;
      return myPosts;

    }catch(error){
      console.error("전체 게시글 로드 중 오류(fetch error): ", error);
    }
  }

  const getFriendsPosts = async (page, size) => {
    try{
      const resp = await axios.get(REST_API_URL + "/friend", {
        params: {
          page: page-1,
          size
        }
      });
      myPosts.value = resp.data;
      return myPosts;

    }catch(error){
      console.error("친구 게시글 로드 중 오류(fetch error): ", error);
    }
  }

  return { registPost, getMyPosts, getAllPosts, getFriendsPosts }
})
