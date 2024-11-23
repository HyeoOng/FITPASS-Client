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
      throw error;
    }

  };

  const getAllSports = async () => {
    try {
      const response = await axios.get(REST_API_URL);
      return response.data;
    } catch (error) {
      console.error("sport 데이터를 불러 오는 중 오류 발생");
      throw error;
    }
  }

  const createSport = async (sport) => {
    try {
      const response = await axios.post(`${REST_API_URL}/create`, sport);
      return response.data;
    } catch (error) {
      console.error("sport 등록 중 오류 발생");
      throw error;
    }
  }

  const updateSport = async (sport) => {
    try {
      const response = await axios.post(`${REST_API_URL}/update`, sport);
      return response.data;
    } catch (error) {
      console.error("sport 종목 수정 중 오류 발생");
      throw error;
    }
  }

  const deleteSport = async (sportCode) => {
    try {
      const response = await axios.post(`${REST_API_URL}/delete`, {sportCode});
      return response.data;
    } catch (error) {
      console.error("운동 종목을 삭제하는 중 오류 발생");
      throw error;
    }
  }
  return{ sports, getSportsArr, getAllSports, createSport, updateSport, deleteSport };
});