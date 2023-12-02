import axios from 'axios';
export const BASE_ADDRESS = 'http://localhost:5038';
export const BASE_URL = 'http://localhost:5038/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
