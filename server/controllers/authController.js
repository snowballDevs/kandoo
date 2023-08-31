const passport = require('passport');
const {validationResult} = require('express-validator');
const User = require('../models/User');

module.exports = {
    getUser: (req, res) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            console.log('responding from server, the user is: ', req.user);

            return res.json({user: req.user.toJSON()});
        }
        console.log('Not signed in');
        return res.json(null);
    },

    login: (req, res, next) => {
        passport.authenticate('local', (authErr, user, info) => {
            if (authErr) {
                // Handle authentication error
                return next(authErr);
            }
            if (!user) {
                // Handle authentication failure
                return res.status(401).json({message: info.message});
            }

            req.login(user, (loginErr) => {
                if (loginErr) {
                    // Handle login error
                    return next(loginErr);
                }

                // Authentication and login successful

                return res.status(200).json({
                    message: 'Login successful',
                    user: user.toJSON(),
                });
            });

            return undefined;
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
                console.log(user);
                return res.status(200).json({
                    message: 'Signup and login successful',
                    user: user.toJSON(),
                });
            });
        } catch (err) {
            next(err);
        }
    },

    logout: (req, res) => {
        try {
            req.logout(() => {
                console.log('User has logged out.');
            });

            res.json({message: 'Logged out successfully'});
        } catch (e) {
            console.log('This E', e);
        }
    },
};
