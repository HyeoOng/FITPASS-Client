import {ref} from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_URL = `http://localhost:8080/api/sport`;

export const useSportStore = defineStore('sport', () => {
  const sports = ref([]);
  
  const getSportsArr = async () => {
    try{
      const resp = await axios.get(REST_API_URL);
      console.log("resp: ", resp.data)
      sports.value = resp.data;
      // console.log(sports);
    }catch(error){
      console.error("sports 배열 fetch 오류: ", error.response?.data || error.message);
    }

  };
  return{ sports, getSportsArr };
});