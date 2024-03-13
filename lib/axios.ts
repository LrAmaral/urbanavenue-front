import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PULIC_API_URL,
});

export default api;
