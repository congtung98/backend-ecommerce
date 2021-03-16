const express = require('express');
const { addItemToCart, getCartItems } = require('../controller/cart');
const { userMiddleware, requireSignIn } = require('../middleware');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignIn, userMiddleware, addItemToCart);
router.post('/user/getCartItems', requireSignIn, userMiddleware, getCartItems );
module.exports = router;