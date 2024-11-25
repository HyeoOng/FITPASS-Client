import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_API_URL = `http://localhost:8080/api/post`;

export const usePostStore = defineStore('post', () => {

  const myPosts = ref([]);
  const myAllPosts = ref([]);
  
  const registPost = async (input) => {
    const resp = await axios.post(REST_API_URL, input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    try{
      if(resp.data != null){
        if(resp.data.flag){
          return true;
        }else{
          // 에러 핸들링
          return false;
        }
      }
    } catch (error) {
      console.error("예상치 못한 에러(in post.js: ", error);
      return false;
    }
  }
  

  const getMyPosts = async (page, size) => {
    try{
      const resp = await axios.get(`${REST_API_URL}/user`, {
        params: {
          page: page-1,
          size,
        }
      })

      if(resp.data != null){
        if(resp.data.flag){
          myPosts.value = resp.data.posts;
          return myPosts;
        }else{
          // 에러 핸들링
        }
      }
      return null;
      // console.log("pagenation: ",resp.data);
      // myPosts.value = resp.data
      // return myPosts;
    } catch(error){
      console.error("예상치 못한 에러(in post.js): ", error);
      return null;
    }
  }

  const getMyAllPosts = async () => {
    try{
      const resp = await axios.get(`${REST_API_URL}/user-all`);
      if(resp.data != null){
        if(resp.data.flag){
          myAllPosts.value = resp.data.posts;
          return myAllPosts;
        }else{
          // 에러 핸들링
        }
      }
      return null;
      // myAllPosts.value = resp.data;
      // return myAllPosts;
    }catch(error){
      console.error("예상치 못한 에러(in post.js): ", error);
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

      if(resp.data != null){
        if(resp.data.flag){
          myPosts.value = resp.data.posts;
          return myPosts;
        }else{
          // 에러 핸들링
        }
      }
      return null;
      // myPosts.value = resp.data;
      // return myPosts;

    }catch(error){
      console.error("예상치 못한 에러(in post.js): ", error);
      return null;
    }
  }

  const getFriendsPosts = async (page, size) => {
    try{
      const resp = await axios.get(`${REST_API_URL}/friend`, {
        params: {
          page: page-1,
          size
        }
      });

      if(resp.data != null){
        if(resp.data.flag){
          myPosts.value = resp.data.posts;
          return myPosts;
        }else{
          // 에러 핸들링
        }
      }
      return null;
      // myPosts.value = resp.data;
      // return myPosts;

    }catch(error){
      console.error("예상치 못한 에러(in post.js): ", error);
      return null;
    }
  }

  return { registPost, getMyPosts, getAllPosts, getFriendsPosts, getMyAllPosts }
})
