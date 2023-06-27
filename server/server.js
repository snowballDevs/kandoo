const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

// test routes
app.get('/', (req, res) => {
    res.json('hello');
});
app.get('/test', (req, res) => {
    res.json('Testing 123');
    req.logOut(() => console.log('User logged out'));
});

app.post('/sign-up', async (req, res, next) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        });

        console.log(user);

        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
});

app.post(
    '/log-in',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/test',
    })
);

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}, you better catch it!`)
);
