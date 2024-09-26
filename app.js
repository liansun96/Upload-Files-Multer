require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')


app.get('/' , (req , res) => {
    res.send('Yooooo! This is multer file upload section')
})

const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        
        app.listen(port , console.log(`Server is listening on ${port} . . .`))
    } catch (error) {
        console.log(error);
        
    }
}

start()