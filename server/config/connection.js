const mongoose = require("mongoose");
const mongouri = process.env.MONGO_URI;

module.exports = () => {
  mongoose.connect(
    mongouri + `-${process.env.NODE_ENV}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    err => {
      if (err) console.log("Failed To Connect DB");
      else console.log(`Connected To DB`);
    }
  );
};
