import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/admin/request"

export const useAdminRequestStore = defineStore('adminRequest', () => {

  const addAdminRequest = async (request) => {
    try {
        const response = await axios.post(`${REST_API_URL}/create`, request);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    } 
  }

  const getAllRequests = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  const removeAdminRequest = async (requestId) => {
    try {
        const response = await axios.post(`${REST_API_URL}/remove`, {requestId});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  return { addAdminRequest, getAllRequests, removeAdminRequest }
})
