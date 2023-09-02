const express = require('express')
const app = express()
const Post = require('./routes/post')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
app.use(express.json());


app.use("/post", Post)

mongoose.connect(process.env.DB_CONNECTION)

app.listen(3000, ()=>{
    console.log("app rodando na http://localhost:3000")
})