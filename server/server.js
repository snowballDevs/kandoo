const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');
require('dotenv').config({path: './config/.env'});

const PORT = process.env.SERVER_PORT || 8888;
const app = express();

// connect to database
connectDB();

// Passport config
require('./config/passport')(passport);

// Enable CORS with specific origin
app.use(
    cors({
        // need this while in development, since front/backend are running on seperate origins
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

// body parsing
app.use(express.json());

// logging
app.use(logger('dev'));

app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING,
            dbName: 'kandoo',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec),
            // secure: true  !!!when in production will need to uncomment this!!!
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// });

// Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/boards', boardRoutes);
app.use('/boards/:boardId/tasks', taskRoutes);
app.use('/boards/:boardId/tasks/:taskId/comments', commentRoutes);

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}, you better catch it!`)
);
