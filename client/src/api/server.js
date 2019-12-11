const axios = require('axios')

module.exports = axios.default.create({ baseURL: 'http://localhost:3000' })
