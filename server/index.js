const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cookieParser = require('cookie-parser')
var cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoutes)   // user route /user/register or login

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

