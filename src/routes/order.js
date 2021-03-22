const { requireSignIn, userMiddleware } = require("../middleware");
const { addOrder, getOrders } = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignIn, userMiddleware, addOrder);
router.get("/getOrders", requireSignIn, userMiddleware, getOrders);

module.exports = router;