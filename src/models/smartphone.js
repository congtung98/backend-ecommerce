const mongoose = require('mongoose');
const smartPhoneSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    ram: {
        type: String,
        required: true,
        trim: true
    },
    storage: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: String,
        required: true,
        trim: true
    },
    resolutionType: {
        type: String,
        required: true,
        trim: true
    },
    primaryCamera: {
        type: Number,
        required: true
    },
    secondaryCamera: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    screenSize: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', 
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Product_SmartPhone', smartPhoneSchema);