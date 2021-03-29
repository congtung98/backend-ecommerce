const express = require('express');
const { requireSignIn, adminMiddleware } = require("../../middleware");
const { updateOrder, getCustomerOrders } = require("../../controller/admin/order");
const router = express.Router();

router.post(`/order/update`, requireSignIn, adminMiddleware, updateOrder);
router.post(
    `/order/getCustomerOrders`,
    requireSignIn,
    adminMiddleware,
    getCustomerOrders
);
module.exports = router;