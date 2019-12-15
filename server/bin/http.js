const http = require('http')
const app = require('../app')
const port = process.env.PORT || 7000


const server = http.createServer(app)


server.listen(port, (err)=>{
    if(err)
    { console.log("ERROR HAPPENED", err) }
    
    console.log('Server Listening on', port)
})