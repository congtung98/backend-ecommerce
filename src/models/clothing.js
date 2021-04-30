const mongoose = require('mongoose');
const clothSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    fabric: {
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

module.exports = mongoose.model('Product_Clothing', clothSchema);