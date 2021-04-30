const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Product_Book', bookSchema);