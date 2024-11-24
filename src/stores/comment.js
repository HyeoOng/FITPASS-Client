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
    console.log(comment)
    try{
      const resp = await axios.post(REST_API_URL, comment)
      if(resp.data.msg === "fail with ai"){
        alert("비난, 혐오, 욕설이 포함된 글은 작성할 수 없습니다.");
      }
      return true;
    } catch(error){
      console.error("댓글 등록 오류: ", error)
      return false;
    }
  }

  return { getComments, comments, registComment }
})
