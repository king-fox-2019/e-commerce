import axios from 'axios'

const axiosServer = axios.create({
  baseURL: 'http://35.225.142.4:3000'
})

export default axiosServer
