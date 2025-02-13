const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
var cors = require('cors')
const connectDB = require('./config/db')


connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.json('Recyclink project')
})

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

