const express = require('express');
const { signUp, signIn, signOut } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignIn } = require('../../middleware');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/admin/signout', signOut);

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;