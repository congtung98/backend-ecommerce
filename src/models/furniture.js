const mongoose = require('mongoose');
const furnitureSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    primaryColor: {
        type: String,
        required: true,
        trim: true
    },
    material: {
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

module.exports = mongoose.model('Product_Furniture', furnitureSchema);