const express = require('express');
const { requireSignIn, userMiddleware } = require('../middleware');
const { addAddress, getAddress, deleteAddress } = require('../controller/address');
const router = express.Router();

router.post('/user/address/create', requireSignIn, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignIn, userMiddleware, getAddress);
router.post('/user/deleteaddress', requireSignIn, userMiddleware, deleteAddress);

module.exports = router;