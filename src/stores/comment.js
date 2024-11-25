import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/cmt"

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([]);

  const getComments = async (postId) => {
    try{
      const resp = await axios.get(REST_API_URL, {
        params:{
          postId
        }
      })
      if(resp.data != null){
        if(resp.data.flag){
          comments.value = resp.data.comments;
          return comments;
        }else{
          // 에러 핸들링
        }
      }
    } catch(error){
      console.error("예상치 못한 에러 (in comment) : ", error)
      return null;
    }
  }

  const registComment = async (comment) => {
    console.log(comment)
    try{
      const resp = await axios.post(REST_API_URL, comment);
      if(resp.data != null){
        if(resp.data.flag){
          return true;
        }else{
          // 에러 핸들러
          return false;
        }
      }
      return false;
    } catch(error){
      console.error("예상치 못한 에러 (in comment) : ", error)
      return false;
    }
  }

  return { getComments, comments, registComment }
})
