const express = require('express');
const router = express.Router()
const { signinUser, loginUser, updateProfile, forgetPassword, resetPassword, changePassword} = require('../controllers/userController')

// // get user
router.post('/login', loginUser)


// //new user
router.post('/signup', signinUser)

// //forgetPassword
router.post('/update', updateProfile)

// //forgetPassword
router.post('/forget-password', forgetPassword)

// //resetPassword
router.get('/reset-password/:id/:token', resetPassword)

// //change Password
router.post('/reset-password/:id/:token', changePassword)


module.exports = router