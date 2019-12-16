const http = require("http");
const app = require("../app");
const server = http.createServer(app);

server.listen(process.env.PORT, function() {
  console.log(`Listen to port : ${process.env.PORT}`);
});
