const app = require('../app');
const http = require('http');

if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

let port = process.env.PORT || 3000

let server = http.createServer(app);

server.listen(port);
server.on('error', () => {
  console.log('Server error')
});
server.on('listening', () => {
  console.log('Serving on port', port)
});
