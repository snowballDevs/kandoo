const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/database');
const User = require('./models/User');
require('dotenv').config({path: './config/.env'});

const PORT = process.env.SERVER_PORT || 5000;
const app = express();

// connect to database
connectDB();

// Passport config
require('./config/passport')(passport);

app.use(cors());

// body parsing
app.use(express.json());

// logging
app.use(logger('dev'));

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_STRING}),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// test routes
app.get('/', (req, res) => {
    res.json('hello');
});
app.get('/test', (req, res) => {
    res.json('Testing 123');
});

app.post('/sign-up', async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        });

        console.log(user);

        res.redirect('/');
    } catch (err) {
        return next(err);
    }
});

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}, you better catch it!`)
);
