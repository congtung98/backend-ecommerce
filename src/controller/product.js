const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');
const SmartPhone = require('../models/smartphone');
const Clothing = require('../models/clothing');

exports.createProduct = (req, res) => {
 
    // res.status(200).json({ file: req.files, body: req.body });
    const { name, price, description, category, quantity, createdBy } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }
    console.log({productPictures});
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product });
        }
    }));

};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .select('_id type')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({ error });
        }

        if(category){
            Product.find({ category: category._id })
            .exec((error, products) => {

                if(error){
                    return res.status(400).json({error});
                }

                if(category.type){
                    if(products.length > 0){
                        res.status(200).json({ 
                            products,
                            priceRange: {
                                under5mil: 5000000,
                                under10mil: 10000000,
                                under15mil: 15000000,
                                under20mil: 20000000,
                                under30mil: 30000000,
                            },
                            productsByPrice: {
                                under5mil: products.filter(product => product.price <= 5000000),
                                under10mil: products.filter(product => product.price > 5000000 && product.price <= 10000000),
                                under15mil: products.filter(product => product.price > 10000000 && product.price <= 15000000),
                                under20mil: products.filter(product => product.price > 15000000 && product.price <= 20000000),
                                under30mil: products.filter(product => product.price > 20000000 && product.price <= 30000000),
                            }
                        });
                    }
                }else{
                    res.status(200).json({ products });
                }
            });
        }
    });
    // res.status(200).json({ slug });
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if(productId){
        Product.findOne({ _id: productId })
        .exec((error, product) => {
            if(error) return res.status(400).json({ error });
            if(product){
                res.status(200).json({ product });
            }
        });
    }else{
        return res.status(400).json({ error: 'Params required' });
    }
}

exports.deleteProductById = (req, res) => {
    console.log(req.body);
    const { productId } = req.body.payload;
    if(productId){
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ result });
            }
        });
    }else{
        res.status(400).json({ error: "Params required" })
    }
};

exports.deleteSmartPhoneProductById = (req, res) => {
    const { productId, quantity, product } = req.body.payload;
    if(productId){
        SmartPhone.deleteOne({ _id: productId }).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ result });
            }
        });
        Product.updateOne(
            { _id: product },
            {
                $inc: {
                    quantity: -quantity
                }
            }
        ).exec();
    }else{
        res.status(400).json({ error: "Params required" })
    }
};

exports.deleteClothingProductById = (req, res) => {
    const { productId } = req.body.payload;
    if(productId){
        Clothing.deleteOne({ _id: productId }).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ result });
            }
        });
    }else{
        res.status(400).json({ error: "Params required" })
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find({ })
        .select("_id name price quantity slug description productPictures createdBy")
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({ products });
};

exports.updateProducts = async (req, res) => {
    const { _id, name, price, quantity, description, category, productPictures } = req.body;
    console.log(productPictures);
    let _productPictures = []; 
    let _oldProductPictures = [];
    let array = productPictures.split(",");
    console.log({ array });
    if(array.length > 0 && !array.includes('')){
        _oldProductPictures = array.map(file => {
            return { img: file }
        })
    }
    // _productPictures.push(productPictures);
    console.log(_oldProductPictures);
    // if(productPictures.length > 0){
    //     // console.log(name, price);
    //     _productPictures = productPictures.map(file => {
    //         return { img: file.img }
    //     })
    // }

    if(req.files.length > 0){
        _productPictures = req.files.map(file => {
            return { img: file.filename }
        })
        console.log('hellpo');
    }
    console.log({_productPictures});

    let finalProductPitures = _oldProductPictures.concat(_productPictures);
    
    const _updatedProduct = {
        name,
        price,
        quantity,
        description,
        category,
        productPictures: finalProductPitures,
        createdBy: req.user._id
    }

    if(_id){
        Product.findOneAndUpdate(
            { _id: _id },
            _updatedProduct,
            { new: true }
        ).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                return res.status(201).json({ updatedProduct: result });
            }
        });
    }else{
        res.status(400).json({ error: "Params required" })
    }
}

exports.updateSmartPhoneProductDetails = async (req, res) => {
    const { 
        _id, 
        quantity, 
        ram, 
        storage, 
        capacity, 
        resolutionType, 
        primaryCamera, 
        secondaryCamera, 
        color, 
        screenSize, 
        product 
    } = req.body;

    
    const productDetails = {
        quantity,
        ram,
        storage,
        capacity,
        resolutionType,
        primaryCamera,
        secondaryCamera,
        color,
        screenSize,
        product,
        createdBy: req.user._id
    }
    
    if(_id){
        const smartPhone = await SmartPhone.findOne({ _id: _id }).exec();
        const oldQuantity = smartPhone.quantity;
        const newQuantity = quantity - oldQuantity;

        SmartPhone.findOneAndUpdate(
            { _id: _id},
            productDetails,
            { new: true }
        ).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                return res.status(201).json({ productDetails: result });
            }
        });
        Product.updateOne(
            { _id: product },
            {
                $inc: {
                    quantity: newQuantity
                }
            }
        ).exec();
    }else{
        const smartPhone = new SmartPhone(productDetails);
        smartPhone.save(((error, productDetail) => {
            if(error) return res.status(400).json({ error });
            if(productDetail){
                res.status(201).json({ productDetail });
            }
        }));
        Product.updateOne(
            { _id: product },
            {
                $inc: {
                    quantity: quantity 
                }
            }
        ).exec();
    }
}

exports.getSmartPhoneProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if(productId){
        SmartPhone.find({ product: productId })
        .exec((error, product) => {
            if(error) return res.status(400).json({ error });
            if(product){
                res.status(200).json({ product });
            }
        });
    }else{
        return res.status(400).json({ error: 'Params required' });
    }
}

exports.updateClothingProductDetails = async (req, res) => {
    const { 
        _id, 
        quantity, 
        size,
        color,
        fabric,
        product 
    } = req.body;

    
    const productDetails = {
        quantity,
        size,
        color,
        fabric,
        product,
        createdBy: req.user._id
    }
   
    console.log(productDetails);

    if(_id){
        Clothing.findOneAndUpdate(
            { _id: _id},
            productDetails,
            { new: true }
        ).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                return res.status(201).json({ productDetails: result });
            }
        });
    }else{
        const clothing = new Clothing(productDetails);
        clothing.save(((error, productDetail) => {
            if(error) return res.status(400).json({ error });
            if(productDetail){
                res.status(201).json({ productDetail });
            }
        }));
    }
}

exports.getClothingProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if(productId){
        Clothing.find({ product: productId })
        .exec((error, product) => {
            if(error) return res.status(400).json({ error });
            if(product){
                res.status(200).json({ product });
            }
        });
    }else{
        return res.status(400).json({ error: 'Params required' });
    }
}