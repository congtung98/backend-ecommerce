const express = require('express');
const { addItemToCart, getCartItems, removeCartItems } = require('../controller/cart');
const { userMiddleware, requireSignIn } = require('../middleware');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignIn, userMiddleware, addItemToCart);
router.post('/user/getCartItems', requireSignIn, userMiddleware, getCartItems );
router.post('/user/cart/removeItem', requireSignIn, userMiddleware, removeCartItems);

module.exports = router;