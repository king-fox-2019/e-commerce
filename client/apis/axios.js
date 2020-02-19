import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

// deploy
// const instance = axios.create({
//     baseURL: 'http://minipc-sportstation.anggabanny.online'
// });

export default instance
