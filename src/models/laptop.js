const mongoose = require('mongoose');
const laptopSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    ram: {
        type: String,
        required: true,
        trim: true
    },
    hardDiskCapacity: {
        type: String,
        required: true,
        trim: true
    },
    screenResolution: {
        type: String,
        required: true,
        trim: true
    },
    operatingSystem: {
        type: String,
        required: true,
        trim: true
    },
    processor: {
        type: String,
        required: true,
        trim: true
    },
    graphicProcessor: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true
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

module.exports = mongoose.model('Product_Laptop', laptopSchema);