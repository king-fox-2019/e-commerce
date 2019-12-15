const http = require('http'),
  app = require('../app'),
  server = http.createServer(app),
  port = process.env.PORT || 3000

server.listen(port, () => console.log('listening on : ', port))