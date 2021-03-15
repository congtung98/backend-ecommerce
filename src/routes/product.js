const express = require('express');
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controller/product');
// const { addCategory, getCategory } = require('../controller/category');
const { adminMiddleware, requireSignIn } = require('../middleware');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

// Xu ly viec luu hinh anh sp trong may
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'),  createProduct )
router.get('/products/:slug', getProductsBySlug)
// router.get('/category/getcategory', getCategory);
router.get('/product/:productId', getProductDetailsById);

module.exports = router;