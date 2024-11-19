import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_URL = `http://localhost:8080/api/loc`;

export const usePlaceStore = defineStore('place', () => {
  const searchResults = ref([]);

  const getSearchResults = async (keyword) => {
    try {
      // console.log("keyword: ", keyword);
      const resp = await axios.post(REST_API_URL + `/search`, { keyword });
      searchResults.value = resp.data; // Store에 저장
      // console.log("store에서 출력: ", searchResults.value);
      return resp.data; // 데이터를 반환
    } catch (error) {
      console.error("검색 결과 fetch 오류:", error.response?.data || error.message);
      return null; // 오류 시 null 반환
    }
  };

  return { searchResults, getSearchResults };
});
