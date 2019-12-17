if(process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(`mongodb://localhost:27017/projectecommerce`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(routes)

app.listen(port, () => console.log(`listening on port ${port}`))