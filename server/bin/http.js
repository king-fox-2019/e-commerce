const app = require('../app')
const port = 3000
const http = require('http')
const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`listening on ${port}`)
})

module.exports = server