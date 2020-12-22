const express = require('express');
const { signUp, signIn, requireSignIn } = require('../controller/auth');
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;