require('dotenv').config()
require('express-async-errors')

const express = require('express');
const connectDB = require('./db/connect');
const app = express()
const fileUpload = require('express-fileupload');

// product router
const productRouter = require('./routes/productRoutes');

// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/products', productRouter);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get('/' , (req, res) => {
    res.send('This is the server page')
})

const port = process.env.PORT || 3000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen( port , console.log(`Server is listening on ${port}...`))
        
    } catch (error) {
        console.log(error);
        
    }
}

start()
