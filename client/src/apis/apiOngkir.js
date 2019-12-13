import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.rajaongkir.com/starter/',
})

export default instance