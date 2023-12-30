import axios from 'axios';
export const BASE_ADDRESS = 'https://tms-management-backend.vercel.app';
export const BASE_URL = 'https://tms-management-backend.vercel.app/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
