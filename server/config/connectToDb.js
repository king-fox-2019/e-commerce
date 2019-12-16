const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://localhost:27017/e-commerce",
    // "mongodb+srv://miniWP:6661SyxMongodbAtlas@miniwp-3inqr.gcp.mongodb.net/test?retryWrites=true&w=majority",
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
