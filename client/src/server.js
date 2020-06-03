import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/',
});

// export default axios.create({
//   baseURL: 'http://35.240.200.240/',
// });
