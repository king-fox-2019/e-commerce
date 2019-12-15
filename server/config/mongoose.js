const mongoose = require("mongoose");
let URI
if (process.env.NODE_ENV === "development") {
  URI = process.env.URL_DB
}
if (process.env.NODE_ENV === "test") {
  URI = process.env.URL_DB_TEST
}
mongoose.connect(URI, 
  { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() { 
  console.log("Connected!") 
});

module.exports = mongoose;