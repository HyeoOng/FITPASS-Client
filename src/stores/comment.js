import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { errorHandler } from '@/util/errorHandler';

const REST_API_URL = "http://localhost:8080/api/cmt"

const { showError } = errorHandler();

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
          if(resp.data.msg) showError(resp.data.code, resp.data.msg);
          else showError(resp.data.code)
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
          if(resp.data.msg) showError(resp.data.code, resp.data.msg);
          else showError(resp.data.code)
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
