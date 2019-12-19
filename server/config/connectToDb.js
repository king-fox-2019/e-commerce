const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    // "mongodb://localhost:27017/e-commerce",
    `${process.env.SERVER_MONGODB_ATLAS}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    },
    err => {
      if (err) console.log("Failed connect to Database");
      else console.log("Connected to Database");
    }
  );
};
