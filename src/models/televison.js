const mongoose = require('mongoose');
const tvSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    resolution: {
        type: String,
        required: true,
        trim: true
    },
    screenType: {
        type: String,
        required: true,
        trim: true
    },
    operatingSystem: {
        type: String,
        required: true,
        trim: true
    },
    screenSize: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Product_Television', tvSchema);