import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'http://104.197.156.53'
  // baseURL: 'http://localhost:3000'
})

export default axiosConfig