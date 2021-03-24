const express = require('express');
const { requireSignIn, adminMiddleware } = require("../../middleware");
const { updateOrder } = require("../../controller/admin/order");
const router = express.Router();

router.post(`/order/update`, requireSignIn, adminMiddleware, updateOrder);

module.exports = router;