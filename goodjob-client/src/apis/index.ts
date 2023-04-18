import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_GOOD_JOB_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    Accept: "*/*",
  },
});
