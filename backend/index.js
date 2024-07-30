// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const DB_NAME='Ecommerce'
dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Mongo db connected");
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error;
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error;
    }
})()

// Routes
app.use('/api/auth', require('./src/Routes/auth'));
app.use('/api/products', require('./src/Routes/product'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
