import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'http://3.0.183.33/'
  // baseURL: 'http://localhost:3000'
})

export default axiosConfig