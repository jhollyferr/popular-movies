import axios from "axios";
import { API_TOKEN } from "../../secret";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});
