const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: { 
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            firstName: { type: mongoose.Schema.Types.String, ref: 'User' },
            lastName: { type: mongoose.Schema.Types.String, ref: 'User' },
            review: String,
            rating: Number,
            productPictures: [
                { img: { type: String } }
            ],
            createdAt: Date
        },
    ],
    rating: {
        type: Object,
        default: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    },
    type: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    updatedAt: Date
}, { timestamps: true });

productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);