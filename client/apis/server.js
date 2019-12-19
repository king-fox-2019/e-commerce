import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geomancy-server.hoandreasm.xyz/'
})

export default instance
