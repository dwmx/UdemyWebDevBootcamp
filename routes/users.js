const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('./../utilities/catch_async');
const users = require('./../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.registerNewUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.authorizeUserLogin)

router.route('/logout')
    .get(users.userLogout)

module.exports = router;