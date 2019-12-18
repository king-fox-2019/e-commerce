import axios from 'axios';

export default axios.create({
  baseURL: 'http://35.247.176.70',
  headers: {
    token: localStorage.getItem('token'),
  },
});
