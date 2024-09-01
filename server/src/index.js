const express = require("express");
const cors = require("cors")
const router = require("./routes")
const bodyParser = require('body-parser');
require("dotenv").config()

const app = express();
// const pool = require("./config/db.config")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text());

// parse application/json
app.use(bodyParser.json())
//middleware
app.use(cors())
app.use(express.json())

app.use("/",(req,res) => res.send("Server is Running"))
app.use(router)

module.exports = app