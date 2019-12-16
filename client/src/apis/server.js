import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://nike-server.dwitama-alfred.xyz/',
  Headers : {
    token : localStorage.getItem('token')
  }
})

export default instance