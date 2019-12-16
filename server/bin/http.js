const port = process.env.PORT || 3000;
const app = require('../app')

require('http').createServer(app).listen(port);

console.log("Listening to port " + port);
