import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: `http://35.240.247.40`
});

export default instance