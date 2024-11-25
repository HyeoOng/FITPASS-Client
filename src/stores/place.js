import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_URL = `http://localhost:8080/api/loc`;

export const usePlaceStore = defineStore('place', () => {
  const cityList = ref([]);
  const getSearchResults = async (keyword) => {
    try {
      const resp = await axios.post(`${REST_API_URL}/search`, { keyword });
      if(resp.data != null){
        if(resp.data.flag){
          return resp.data.places;
        }else{
          // error 핸들링
        }
      }
      return null;
    } catch (error) {
      console.error("예상치 못한 에러 (in place):", error);
      return null; // 오류 시 null 반환
    }
  };

  const getCity = async (posts) => {
    try{
      const resp = await axios.post(`${REST_API_URL}/list`, posts);
      if(resp.data != null){
        if(resp.data.flag){
          cityList.value = resp.data.places;
          return cityList;
        }else {
          // error 핸들링
        }
      }
      return null;
    } catch (error) {
      console.error("예상치 못한 에러 (in place):", error);
      return null; // 오류 시 null 반환
    }

  }

  const getPlaceName = async (placeId) => {
    try{
      const resp = await axios.get(`${REST_API_URL}/name/${placeId}`);
      if(resp.data != null){
        if(resp.data.flag){
          return resp.data.name;
        }else{
          // 에러 핸들링
        }
      }
      return null;
    }catch (error) {
      console.error("예상치 못한 에러 (in place): ", error);
      return "";
    }
  }

  return { getSearchResults, getPlaceName, getCity };
});
