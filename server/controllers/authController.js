const passport = require('passport');
const {validationResult} = require('express-validator');
const User = require('../models/User');

module.exports = {
    getUser: (req, res) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            console.log('responding from server, the user is: ',req.user);
            return res.json({isLoggedIn: true, user: req.user});
        }
        console.log('Not signed in');
        return res.json({isLoggedIn: false});
    },

    login: (req, res, next) => {
        console.log(req.body);
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                // Handle authentication error
                return next(err);
            }
            if (!user) {
                // Handle authentication failure
                return res.status(401).json({message: info.message});
            }

            req.login(user, (err) => {
                if (err) {
                    // Handle login error
                    return next(err);
                }

                console.log(user);
                // Authentication and login successful
                return res.status(200).json({message: 'Login successful'});
            });
        })(req, res, next);
    },

    signup: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({error: errors.array()});
            }

            const {email, password, firstName, lastName} = req.body;
            const user = await User.signup(
                email,
                password,
                firstName,
                lastName
            );

            // Log in the newly registered user
            req.login(user, (err) => {
                if (err) {
                    // Handle login error
                    return res.status(500).json({error: 'Login error'});
                }
                // User is logged in
                return res
                    .status(200)
                    .json({message: 'Signup and login successful'});
            });
        } catch (err) {
            next(err);
        }
    },

    logout: (req, res) => {
        req.logout(() => {
            console.log('User has logged out.');
        });
        res.json({message: 'Logged out successfully'});
    },
};
