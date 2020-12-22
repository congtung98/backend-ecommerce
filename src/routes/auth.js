const express = require('express');
const { signUp, signIn } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/signin', validateSigninRequest, isRequestValidated, signIn);

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;