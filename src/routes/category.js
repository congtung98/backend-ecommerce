const express = require('express');
const { addCategory, getCategory } = require('../controller/category');
const { adminMiddleware, requireSignIn } = require('../middleware');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

// Xu ly viec luu hinh anh brand trong may
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/category/create', requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getcategory', getCategory);

module.exports = router;