import axios from 'axios';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.allergylink.net',
  withCredentials: true,
});
