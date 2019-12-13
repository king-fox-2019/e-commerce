if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing'){
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const {errorHandler} = require('./middlewares/errorHandlers')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let NODE_ENV = process.env.NODE_ENV
// const db = NODE_ENV? `mongodb://localhost/nike-store${NODE_ENV}`:'mongodb://localhost/mini-e-commerce'
const db = `mongodb://dwitamaalfred:${process.env.ATLASPASSWORD}@cluster0-shard-00-00-dehxs.gcp.mongodb.net:27017,cluster0-shard-00-01-dehxs.gcp.mongodb.net:27017,cluster0-shard-00-02-dehxs.gcp.mongodb.net:27017/nike-store?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(_=> {
    console.log("mongoodb successfully connected");
})
.catch(console.log)



app.use('/',routes)
app.use(errorHandler)


app.listen(PORT,_=>{
    console.log(`listening on port ` + PORT)
})

module.exports = app