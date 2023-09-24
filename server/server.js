const express = require('express');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const boardRoutes = require('./routes/boards');
const columnRoutes = require('./routes/columns');
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');
require('dotenv').config({path: './config/.env'});

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// Passport config
require('./config/passport')(passport);

// Allow requests from the frontend specifically. Credientials must be true to allow cookies. Should only be needed for development!
if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    );
}

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
            // secure: true  /*!!!when in production will need to uncomment this!!!*/
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/boards', boardRoutes);
app.use('/boards/:boardId/columns/', columnRoutes);
app.use('/boards/:boardId/columns/:columnId/tasks', taskRoutes);
app.use(
    '/boards/:boardId/columns/:columnId/tasks/:taskId/comments',
    commentRoutes
);

// Serve frontend from same server as backend
if (process.env.NODE_ENV === 'production') {
    // Render React as the view
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Serve the React html file for any non-API routes
    app.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname, '..', 'client', 'dist', 'index.html')
        );
    });
} else {
    // A message if trying to access homepage while in dev mode
    app.get('/', (req, res) => {
        res.send('Server running in development mode');
    });
}

// Connect to db befor listening
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`Server is running on ${PORT}, you better catch it!`)
    );
});
