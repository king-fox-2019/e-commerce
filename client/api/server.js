const axios = require('axios')

const instance = axios.create({
    // baseURL: 'http://34.87.35.176'
    baseURL: 'http://localhost:3000'
})

module.exports = instance