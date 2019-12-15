import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://34.69.139.2/'
})

export default instance
