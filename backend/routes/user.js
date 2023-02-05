const express = require('express');
const router = express.Router()
const { 
    signinUser,
    loginUser, 
    updateProfile, 
    forgetPassword, 
    resetPassword, 
    changePassword,
    followAccount,
    unfollowAccount,
    deleteAccount,
    getAccount
    } = 
    require('../controllers/userController')

// // get user
router.post('/login', loginUser)

// // get account
router.post('/getprofile', getAccount)

// //new user
router.post('/signup', signinUser)

// //updateProfile
router.post('profile/update', updateProfile)

// //updateProfile
router.post('/follow', followAccount)

// //updateProfile
router.post('/unfollow', unfollowAccount)

// //updateProfile
router.post('/delete-account', deleteAccount)

// //forgetPassword
router.post('/forget-password', forgetPassword)

// //resetPassword
router.get('/reset-password/:id/:token', resetPassword)

// //change Password
router.post('/reset-password/:id/:token', changePassword)


module.exports = router