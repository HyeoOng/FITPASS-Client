import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'

const REST_API_URL = `http://localhost:8080/api/image`
export const usePhotoStore = defineStore('photo', () => {
  const user = useUserStore();
  const getphoto = async (photoUrl) => {
    await axios.post(REST_API_URL, {photoUrl})
    .then((resp) => {
      // 사진 가져오기 성공
      console.log("응답 사진 파일: ", resp.data)
    })
    .catch((error) => {
      if(error.response){
        handleErrorResp(error.response.data);
      }else if (error.request) {
        // 서버가 응답하지 않음
        console.error('No response received from server:', error.request);
      } else {
        // 요청 설정 중 에러 발생
        console.error('Request error:', error.message);
      }
    })
  }

  const handleErrorResp = (msg) => {
    switch(msg){
      case "hacker":
        alert("비정상적인 접근이 시도되었습니다.");
        user.logout();
        break;
      case "server":
        alert("죄송합니다. 잠시 후 다시 시도해주세요.")
        break;
      default:
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
    }
  }

  return { count, doubleCount, increment }
})
