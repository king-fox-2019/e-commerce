import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'http://ecommerceserver.angelavanessa.com'
});

export default instance