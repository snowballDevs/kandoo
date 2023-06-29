const {body} = require('express-validator');

module.exports = {
    validateSignup: [
        body('email', 'Please enter a valid email address').trim().isEmail(),
        body('password', 'Password must be at least 8 characters long')
            .trim()
            .isLength({min: 8}),
        body('firstName', 'Enter your first name').trim().isLength({min: 1}),
        body('lastName', 'Enter your last name').trim().isLength({min: 1}),
    ],

    validateLogin: [
        body('email', 'Email is required').trim().notEmpty(),
        body('password', 'Password is required').trim().notEmpty(),
    ],
};
