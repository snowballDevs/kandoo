const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config({path: './config/.env'});

const PORT = process.env.SERVER_PORT || 5000;
const app = express();

// connect to database
connectDB();

// Passport config
require("./config/passport")(passport);

app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// body parsing
app.use(express.json());

// logging
app.use(logger('dev'));

// test routes
app.get('/', (req, res) => {
    res.json('hello');
});
app.get('/test', (req, res) => {
    res.json('Testing 123');
});

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}, you better catch it!`)
);
