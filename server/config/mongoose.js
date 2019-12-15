const mongoose = require("mongoose")
const db = process.env.URL_DB + '-' + process.env.NODE_ENV
const dbatlas = process.env.MONGO_ATLAS

if (process.env.NODE_ENV === 'testing') {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, function (err) {
        if (err) console.log("mongoose connect failed", err)
        else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧e-commerce successfully connect to mongodb `);
    })
} else {
    mongoose.connect(process.env.MONGO_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, function (err) {
        if (err) console.log("mongoose connect failed", err)
        else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧e-commerce successfully connect to atlas `);
    })
}

// mongoose.connect(`${db}`, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// },
//     err => {
//         if (err) console.log("mongoose connect failed", err);
//         else console.log("e-commerce successfully connect to mongodb");
//     }
// )