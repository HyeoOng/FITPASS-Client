import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api/image`
export const usePhotoStore = defineStore('photo', () => {

  const user = useUserStore();

  const photoCache = ref(new Map());

  const getPhoto = async (photoUrl) => {
    if (photoCache.value.has(photoUrl)) {
      return photoCache.value.get(photoUrl);
    }
    try {
      const resp = await axios.post(REST_API_URL, { photoUrl }, {
        responseType: 'blob'
      });
  
      if (resp.headers['content-type'] && resp.headers['content-type'].startsWith('image/')) {
        const blobUrl = URL.createObjectURL(resp.data);
        photoCache.value.set(photoUrl, blobUrl);
        return blobUrl;
      } else {
        if(resp.data === "NF"){
          return null;
        }
        handleErrorResp(resp.data); // 백엔드 응답 메시지 처리
        return null;
      }
    } catch (error) {
      console.error("photo fetch 에러: ");
      if (error.response) {
        handleErrorResp(error.response.data);
        return null;
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
      return null;
    }
  };
  

  const loadProfileImage = async (user_id) => { 
    try {
      let path = null;
      if (user_id == null) path = `${REST_API_URL}/0`;
      else path = `${REST_API_URL}/${user_id}`;
  
      const resp = await axios.get(path, {
        responseType: 'blob'
      });
  
      if (resp.headers['content-type'] && resp.headers['content-type'].startsWith('image/')) {
        const blobUrl = URL.createObjectURL(resp.data);
        return blobUrl;
      } else {
        if(resp.data === "NF"){
          return null;
        }
        handleErrorResp(resp.data); // 백엔드 응답 메시지 처리
        return null;
      }
    } catch (error) {
      console.error("profile 로드 에러 : ", error);
    }
  };
  

  const handleErrorResp = (msg) => {
    switch (msg) {
      case "HK": // 경로 탈출
        alert("잘못된 시도입니다.");
        user.logout();
        router.push('/');
        break;
      case "JAL1": // JSON 파싱 에러
        alert("오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.");
        break;
      case "SAL2": // 서버 오류
        alert("오류가 발생했습니다. \n 잠시 후에 다시 시도해주세요.");
        break;
      case "SPL1": // 세션 만료
        alert("로그인을 다시 해주세요.");
        user.logout();
        router.push('/login');
        break;
    }
  };

  return { photoCache, user, getPhoto, loadProfileImage }
})
