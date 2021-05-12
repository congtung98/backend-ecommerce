const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            variantProduct: {
                type: mongoose.Schema.Types.ObjectId
            },
            smartphone: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_SmartPhone'
            },
            clothing: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_Clothing'
            },
            laptop: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_Laptop'
            },
            television: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_Television'
            },
            furniture: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_Furniture'
            },
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product_Book'
            },
            // price: {
            //     type: Number,
            //     required: true
            // }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);