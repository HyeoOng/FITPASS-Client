import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/admin"

export const useAdminStore = defineStore('admin', () => {
  const getAllAdmin = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
  }

  const addAdmin = async (userId) => {
    try {
        const response = await axios.post(`${REST_API_URL}/create`, {userId});
        return response.data;
    } catch (error) {
        console.log(error);
    } 
  }

  const deleteAdmin = async (userId) => {
    try {
        const response = await axios.post(`${REST_API_URL}/delete`, {userId});
        return response.data;
    } catch (error) {
        console.log(error);
    }
  }

  return { getAllAdmin, addAdmin, deleteAdmin }
})
