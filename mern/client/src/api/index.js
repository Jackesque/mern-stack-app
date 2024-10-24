import axios from "axios";
import { SERVER_URL } from "../../constants";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true
});

export default api;
