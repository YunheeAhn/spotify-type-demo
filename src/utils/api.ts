import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// api 호출 전 가로채서 호출
api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return request;
});

export default api;
