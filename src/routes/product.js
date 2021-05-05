const express = require('express');
const { createProduct, 
    getProductsBySlug, 
    getProductDetailsById, 
    getProducts, 
    deleteProductById, 
    updateProducts, 
    updateSmartPhoneProductDetails, 
    getSmartPhoneProductDetailsById, 
    deleteSmartPhoneProductById, 
    updateClothingProductDetails, 
    getClothingProductDetailsById, 
    deleteClothingProductById, 
    updateTelevisionProductDetails, 
    getTelevisionProductDetailsById, 
    deleteTelevisionProductById, 
    updateLaptopProductDetails, 
    getLaptopProductDetailsById, 
    deleteLaptopProductById } = require('../controller/product');
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

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct )
router.get('/products/:slug', getProductsBySlug)
router.get('/product/:productId', getProductDetailsById);
router.delete('/product/deleteProductById', requireSignIn, adminMiddleware, deleteProductById);
router.post('/product/getProducts', requireSignIn, adminMiddleware, getProducts);
router.post('/product/editProductById', requireSignIn, adminMiddleware, upload.array('productPicture'), updateProducts);
//smartphone
router.post('/product/editSmartPhoneProductDetail', requireSignIn, adminMiddleware, updateSmartPhoneProductDetails);
router.get('/product/smartPhone/:productId', getSmartPhoneProductDetailsById);
router.delete('/product/deleteSmartPhoneProductById', requireSignIn, adminMiddleware, deleteSmartPhoneProductById);
//clothing
router.post('/product/editClothingProductDetail', requireSignIn, adminMiddleware, updateClothingProductDetails);
router.get('/product/clothing/:productId', getClothingProductDetailsById);
router.delete('/product/deleteClothingProductById', requireSignIn, adminMiddleware, deleteClothingProductById);
//television
router.post('/product/editTelevisionProductDetail', requireSignIn, adminMiddleware, updateTelevisionProductDetails);
router.get('/product/television/:productId', getTelevisionProductDetailsById);
router.delete('/product/deleteTelevisionProductById', requireSignIn, adminMiddleware, deleteTelevisionProductById);
//laptop
router.post('/product/editLaptopProductDetail', requireSignIn, adminMiddleware, updateLaptopProductDetails);
router.get('/product/laptop/:productId', getLaptopProductDetailsById);
router.delete('/product/deleteLAptopProductById', requireSignIn, adminMiddleware, deleteLaptopProductById);

module.exports = router;