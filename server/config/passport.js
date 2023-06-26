const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {usernameField: 'email'},
            async (email, password, done) => {
                try {
                    const user = await User.findOne({email: email});
                    if (!user) {
                        return done(null, false, {
                            message: `Email ${email} does not exist.`,
                        });
                    }
                    if(!user.password) {
                      return done(null, false, {
                        message: 'Password is required',
                      });
                    }
                    // compare
                    bcrypt.compare(password, user.password, (err, match) => {
                        if (match) {
                            // passwords match! log user in
                            return done(null, user);
                        } else {
                            // passwords do not match!
                            return done(null, false, {
                                message: 'Incorrect password',
                            });
                        }
                    });
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    // session setup
    passport.deserializeUser(async function (id, done) {
        try {
            // retrieve user object from the data base using the stored ID
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    passport.serializeUser((user, done) => {
        // store only the users ID in the session
        // Allows us to identify user across requests
        done(null, user.id);
      });


};
