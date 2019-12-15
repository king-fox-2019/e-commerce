if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const routes = require("./routes")
const { errorHandler } = require("./middlewares")

require("./config/mongoose")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Hello, there!")
})

app.use("/", routes)
app.use(errorHandler)

module.exports = app