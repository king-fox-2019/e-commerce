import axios from 'axios'

let instance = axios.create({
  // baseURL: 'http://localhost:3000/'
  baseURL: 'http://click-server.devita.xyz/'
})

export default instance
