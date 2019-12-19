import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.240.197.117/"
  // baseURL: "http://localhost:3000"
});

export default instance;
