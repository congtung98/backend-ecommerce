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
                    { _id: items[i].smartphone},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
            }else if(items[i].clothing){
                Clothing.updateOne(
                    { _id: items[i].clothing},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
            }else if(items[i].laptop){
                Laptop.updateOne(
                    { _id: items[i].laptop},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
            }else if(items[i].television){
                Televison.updateOne(
                    { _id: items[i].television},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
            }else if(items[i].furniture){
                Furniture.updateOne(
                    { _id: items[i].furniture},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
            }else if(items[i].book){
                console.log('vao kooo');
                Book.updateOne(
                    { _id: items[i].book},
                    {
                        $inc: {
                            quantity: -items[i].purchasedQty
                        }
                    }
                )
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
        .exec();
    res.status(200).json({ orders });
}