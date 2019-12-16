import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.240.197.117/"
});

export default instance;
