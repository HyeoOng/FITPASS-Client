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
    console.log("resp: ",resp.data);
    comments.value = resp.data
    return resp.data
  } catch(error){
    console.error(postId, " 불러오는 중 error: ,", error)
  }
  }

  const registComment = async (comment) => {
    try{
      await axios.post(REST_API_URL, comment)
      return true;
    } catch(error){
      console.error("댓글 등록 오류: ", error)
      return false;
    }
  }

  return { getComments, comments, registComment }
})
