import { API_TOKEN } from "../secret/index.js";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});
