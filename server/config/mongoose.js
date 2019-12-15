const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/e-commerce-${process.env.NODE_ENV}`, 
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