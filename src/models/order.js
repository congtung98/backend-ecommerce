const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAddress.address",
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
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
                payablePrice: {
                    type: Number,
                    required: true
                },
                purchasedQty: {
                    type: Number,
                    required: true
                },
            },
        ],
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "cancelled", "refund"],
            required: true
        },
        paymentType: {
            type: String,
            enum: ["cod", "card"],
            required: true

        },
        orderStatus: [
            {
                type: {
                    type: String,
                    enum: ["ordered", "packed", "shipped", "delivered"],
                    default: "orderd"
                },
                date: {
                    type: Date
                },
                isCompleted: {
                    type: Boolean,
                    default: false
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);