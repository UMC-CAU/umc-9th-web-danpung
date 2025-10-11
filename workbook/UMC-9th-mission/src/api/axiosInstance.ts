import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://umc-web.kyeoungwoon.kr/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
