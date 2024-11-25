import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_API_URL = `http://localhost:8080/api/post`;

// axios 설정
// axios.defaults.withCredentials = true;

export const usePostStore = defineStore('post', () => {

  const myPosts = ref([]);
  const myAllPosts = ref([]);
  
  const registPost = async (input) => {
    await axios.post(REST_API_URL, input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.data.msg === "fail with ai") {
        alert("비난, 혐오, 욕설이 포함된 글은 작성할 수 없습니다.");  // 알림 창 띄우기
        return false;  // false 반환
      }
      return true;  // 성공 시 true 반환
    })
    .catch(() => {
      return false;  // 에러 발생 시 false 반환
    });
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

  const getMyAllPosts = async () => {
    try{
      const resp = await axios.get(`${REST_API_URL}/user-all`)
      myAllPosts.value = resp.data;
      return myAllPosts;
    }catch(error){
      console.error("내 모든 글 불러오는 중 오류: ", error);
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

  return { registPost, getMyPosts, getAllPosts, getFriendsPosts, getMyAllPosts }
})
