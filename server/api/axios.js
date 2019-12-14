const axios = require('axios')
const rajaOngkir = axios.create({
    baseURL: 'https://api.rajaongkir.com/starter/',
    headers: {key : `fabd964c98d58b14d275f0ae37234817`},
    // Accept: 'application/vnd.github.v3+json'
  });

//   console.log(process.env.TOKEN_authorization)
module.exports = rajaOngkir