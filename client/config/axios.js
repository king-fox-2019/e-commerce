import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'http://ec2-3-0-57-132.ap-southeast-1.compute.amazonaws.com'
})

export default axiosConfig