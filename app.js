require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json())
app.use('/api/v1/products/' , productRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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