const Cart = require('../models/cart');


function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {

        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve())
            .catch(err => reject(err))
    });
}


exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart) {
            //Kiem tra neu gio hang da ton tai thi cap nhat so luong cua gio hang
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const variantProduct = cartItem.variantProduct;
                if(variantProduct){
                    const item = cart.cartItems.find(c => c.product == product && c.variantProduct == variantProduct );
                    let condition, update;
                    if(item){
                        condition = { "user": req.user._id, "cartItems.product": product, "cartItems.variantProduct": variantProduct };
                        update = {
                            "$set": {
                                "cartItems.$": cartItem
                            }
                        };
                    }else{
                        condition = { user: req.user._id };
                        update = {
                            "$push": {
                                "cartItems": cartItem
                            }
                        };
                    }
                    promiseArray.push(runUpdate(condition, update))
                }else{
                    const item = cart.cartItems.find(c => c.product == product );
                    let condition, update;
                    if(item){
                        condition = { "user": req.user._id, "cartItems.product": product };
                        update = {
                            "$set": {
                                "cartItems.$": cartItem
                            }
                        };
                    }else{
                        condition = { user: req.user._id };
                        update = {
                            "$push": {
                                "cartItems": cartItem
                            }
                        };
                    }
                    promiseArray.push(runUpdate(condition, update))
                }
                
                // Cart.findOneAndUpdate(condition, update)
                // .exec((error, _cart) => {
                //     if(error) return res.status(400).json({ error });
                //     if(_cart){
                //         return res.status(201).json({ cart: _cart });
                //     }
                // });
            });
            Promise.all(promiseArray)
            .then(response => res.status(201).json({ response }))
            .catch(error => res.status(400).json({ error }))
        }else{
            //Neu gio hng chua ton tai thi tao moi gio hang
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            });
        
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error })
                if(cart){
                    return res.status(201).json({ cart });
                }
            });
        }
    });
};

// exports.addToCart = (req, res) => {
//     const { cartItems } = req.body;
//     if(cartItems){
//         if(Object.keys(cartItems).length > 0){
//             Cart.findOneAndUpdate({
//                 "user": req.user._id
//             }, {
//                 "cartItems": cartItems
//             }, {
//                 upsert: true, new: true, setDefaultsOnInsert: true
//             }, (error, cartItems) => {
//                 if(error) return res.status(400).json({ error });
//                 if(cartItems) res.status(201).json({ message: 'Added Successfully' });
//             })
//         }
//     }
// }

exports.getCartItems = (req, res) => {
    Cart.findOne({ user: req.user._id })
    .populate('cartItems.product', '_id name price productPictures type')
    .populate('cartItems.smartphone')
    .populate('cartItems.clothing')
    .populate('cartItems.television')
    .populate('cartItems.laptop')
    .populate('cartItems.furniture')
    .populate('cartItems.book')
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            let cartItems = {};
            cart.cartItems.forEach((item, index) => {
                if(item.smartphone){
                    cartItems[item.smartphone._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.smartphone._id.toString(),
                        smartphone: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        ram: item.smartphone.ram,
                        storage: item.smartphone.storage,
                        color: item.smartphone.color
                    }
                }else if(item.laptop){
                    cartItems[item.laptop._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.laptop._id.toString(),
                        laptop: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        ram: item.laptop.ram,
                        hardDiskCapacity: item.laptop.hardDiskCapacity
                    }
                }else if(item.television){
                    cartItems[item.television._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.television._id.toString(),
                        television: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        screenSize: item.television.screenSize,
                    }
                }else if(item.clothing){
                    cartItems[item.clothing._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.clothing._id.toString(),
                        clothing: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        color: item.clothing.color,
                        size: item.clothing.size,
                        fabric: item.clothing.fabric
                    }
                }else if(item.furniture){
                    cartItems[item.furniture._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.furniture._id.toString(),
                        furniture: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        primaryColor: item.furniture.primaryColor,
                        material: item.furniture.material
                    }
                }else if(item.book){
                    cartItems[item.book._id.toString()] = {
                        _id: item.product._id.toString(),
                        variantId: item.book._id.toString(),
                        book: true,
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                        type: item.product.type,
                        author: item.book.author,
                        genre: item.book.genre
                    }
                }else{
                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity
                    }
                }
            });
            res.status(200).json({ cartItems });
        }
    })
}

exports.removeCartItems = (req, res) => {
    const { productId, variantId } = req.body.payload;
    if(variantId){
        Cart.update(
            { user: req.user._id },
            {
                $pull: {
                    cartItems: {
                        product: productId,
                        variantProduct: variantId
                    },
                },
            }
        ).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ result });
            }
        });
    }else if(productId){
        Cart.update(
            { user: req.user._id },
            {
                $pull: {
                    cartItems: {
                        product: productId,
                    },
                },
            }
        ).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ result });
            }
        });
    }
};