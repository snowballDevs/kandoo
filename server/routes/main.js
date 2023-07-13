const express = require('express');
const authController = require('../controllers/authController');
const {validateSignup, validateLogin} = require('../middleware/validators');

const router = express.Router();

router.get('/getUser', authController.getUser);

router.get('/logout', authController.logout);

router.post('/login', validateLogin, authController.login);

router.post('/signup', validateSignup, authController.signup);

module.exports = router;
