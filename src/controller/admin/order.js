const Book = require("../../models/book");
const Clothing = require("../../models/clothing");
const Furniture = require("../../models/furniture");
const Laptop = require("../../models/laptop");
const Order = require("../../models/order");
const Product = require("../../models/product");
const Smartphone = require("../../models/smartphone");
const Televison = require("../../models/televison");

exports.updateOrder = (req, res) => {
    const { items, type } = req.body;

    if(req.body.type === 'delivered'){
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            if(items[i].smartphone){
                Smartphone.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            }else if(items[i].clothing){
                Clothing.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            }else if(items[i].laptop){
                console.log();
                Laptop.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            }else if(items[i].television){
                Televison.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            }else if(items[i].furniture){
                Furniture.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            }else if(items[i].book){
                Book.updateOne(
                    { _id: items[i].variantProduct},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                ).exec()
            } 
            Product.updateOne(
                { _id: items[i].productId._id },
                {
                    $inc: {
                        quantity: -items[i].purchasedQty 
                    }
                }
            ).exec();
        }
    }
    Order.updateOne(
        { _id: req.body.orderId, "orderStatus.type": req.body.type },
        {
            $set: {
                "orderStatus.$": [{ type: req.body.type, date: new Date(), isCompleted: true }],
            },
        }
    ).exec((error, order) => {
        if(error) return res.status(400).json({ error });
        if(order){
            res.status(201).json({ order });
        }
    })
}

exports.getCustomerOrders = async (req, res) => {
    const orders = await Order.find({})
        .populate("items.productId", "name")
        .populate('items.smartphone')
        .populate('items.clothing')
        .populate('items.television')
        .populate('items.laptop')
        .populate('items.furniture')
        .populate('items.book')
        .exec();
    res.status(200).json({ orders });
}