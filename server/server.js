const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//connect to mongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to MongoDB")
})





//Import Routes
// const userRoute = require('./routes/user')?
//middleware
// app.use('/user', userRoute)


app.get('/home', (req, res) => {
    res.send('Hello')
})





app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
