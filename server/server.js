const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = process.env.PORT || 8000
const logger = require('morgan')

const connectDB = require('./config/database')


// use .env file in config folder
require('dotenv').config({ path: './config/.env' });

//connect to database
connectDB()

app.use(cors());

// body parsing
app.use(express.json());

//logging
app.use(logger('dev'))

// test routes
app.get('/' , (req,res) => {
  res.json('Home')
})
app.get('/test', (req,res) => {
  res.json('Testing 123')
})


app.listen(PORT, () => {
  console.log("Server is running, you better catch it!");
});