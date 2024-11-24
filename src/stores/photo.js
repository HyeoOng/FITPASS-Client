import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'

const REST_API_URL = `http://localhost:8080/api/image`
export const usePhotoStore = defineStore('photo', () => {

  const user = useUserStore();

  const photoCache = ref(new Map());

  const getPhoto = async (photoUrl) => {
    // 이미 캐싱된 데이터가 존재하면 반환
    if(photoCache.value.has(photoUrl)){
      return photoCache.value.get(photoUrl);
    }
    // 캐시 값이 없다면..
    try{
      const resp = await axios.post(REST_API_URL, {photoUrl}, {
        responseType: 'blob'
      });
       
      if(resp.data){
        // console.log("pinia에서 응답 데이터: ", resp.data)
        const blobUrl = URL.createObjectURL(resp.data);
        photoCache.value.set(photoUrl, blobUrl);
        return blobUrl;
      } else {
        console.log("이미지 응답 실패")
        return null;
      }
    }catch(error){
      console.error("photo fetch 에러: ");
      if(error.response){
        handleErrorResp(error.response.data);
        return
      }else if (error.request) {
        // 서버가 응답하지 않음
        console.error('No response received from server:', error.request);
      } else {
        // 요청 설정 중 에러 발생
        console.error('Request error:', error.message);
      }
      return null;
    }
  }

  const loadProfileImage = async () => { 
    try{   
      const resp = await axios.get(REST_API_URL, {
        responseType: 'blob'
      });
      if(resp.data){
        const blobUrl = URL.createObjectURL(resp.data);
        return blobUrl;
      } else {
        return null;
      }
    } catch (error){
      console.error("profile 로드 에러 : ", error);
    }
  }

  const handleErrorResp = (msg) => {
    switch(msg){
      case "hacker":
        alert("비정상적인 접근이 시도되었습니다.");
        user.logout();
        break;
      case "not found":
        alert("이미지를 찾을 수 없습니다.")
        break;
      case "server":
        alert("서버 문제")
        break;
      default:
        alert("다른 문제")
    }
  }

  return { photoCache, user, getPhoto, handleErrorResp, loadProfileImage }
})
