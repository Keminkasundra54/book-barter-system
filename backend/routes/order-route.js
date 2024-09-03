const router = require("express").Router();
const orderController = require("../controller/orderCon");

router.post("/addOrder", orderController.addOrder);
router.get("/getUserOrder", orderController.getUserOrder);
router.post("/getOrderDetail", orderController.getOrderDetail);

module.exports = router;
