const router = require("express").Router();
const orderController = require("../controller/orderCon");

router.post("/addOrder", orderController.addOrder);
router.get("/getUserOrder", orderController.getUserOrder);
router.post("/getOrderDetail", orderController.getOrderDetail);
router.get("/getSellerOrder", orderController.getSellerOrder);
router.get("/getAllOrderData", orderController.getAllOrderData);
router.post("/updateOrder", orderController.updateOrder);
router.post("/updateSellerStatus", orderController.updateSellerStatus);

module.exports = router;
