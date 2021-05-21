const { requireSignIn, userMiddleware } = require("../middleware");
const { addOrder, getOrders, getOrder, paymentOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignIn, userMiddleware, addOrder);
router.get("/getOrders", requireSignIn, userMiddleware, getOrders);
router.post("/getOrder", requireSignIn, userMiddleware, getOrder);
router.post('/paymentOrder', requireSignIn, userMiddleware, paymentOrder);

module.exports = router;