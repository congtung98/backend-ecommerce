const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {
 
    // res.status(200).json({ file: req.files, body: req.body });
    const { name, price, description, category, quantity, createdBy } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

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

exports.getProducts = async (req, res) => {
    const products = await Product.find({})
        .select("_id name price quantity slug description productPictures createdBy")
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({ products });
};