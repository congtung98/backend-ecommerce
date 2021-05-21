const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
const stripe = require('stripe')('sk_test_51It8V8CyrW0u6wi2f9An7WD6yt6ZG9nfmK6Vo6ZyWSUIpyeqjCaaTtTKbcJ0McZAedy6p7q5oW9pZsvZwfpEifNu00qeBi9G5N');

exports.addOrder = (req, res) => {
    Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
        if(error) return res.status(400).json({ error });
        if(result){
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true,
                },
                {
                    type: "packed",
                    isCompleted: false,
                },
                {
                    type: "shipped",
                    isCompleted: false,
                },
                {
                    type: "delivered",
                    isCompleted: false,
                },
            ];
            const order = new Order(req.body);
            order.save((error, order) => {
                if(error) return res.status(400).json({ error });
                if(order){
                    res.status(201).json({ order });
                }
            });
        }
    });
};

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
        .select("_id paymentStatus paymentType orderStatus items")
        .populate("items.productId", "_id name productPictures")
        .exec((error, orders) => {
            if(error) return res.status(400).json({ error });
            if(orders){
                res.status(200).json({ orders });
            }
        });
};

exports.getOrder = (req, res) => {
    Order.findOne({ _id: req.body.orderId })
        .populate("items.productId", "_id name productPictures")
        .populate('items.smartphone')
        .populate('items.clothing')
        .populate('items.television')
        .populate('items.laptop')
        .populate('items.furniture')
        .populate('items.book')
        .lean()
        .exec((error, order) => {
            if(error) return res.status(400).json({ error });
            if(order){
                Address.findOne({
                    user: req.user._id,
                }).exec((error, address) => {
                    if(error) return res.status(400).json({ error });
                    order.address = address.address.find(
                        (adr) => adr._id.toString() == order.addressId.toString()
                    );
                    res.status(200).json({
                        order,
                    });
                });
            }
        });
}

exports.paymentOrder = async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "VND",
            description: "Flipkart Company",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        })

    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}