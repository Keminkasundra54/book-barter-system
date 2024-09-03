const router = require("express").Router();
const cartController = require("../controller/cartCon");

router.post("/addToCart", cartController.addToCart);
router.get("/getUserCart", cartController.getUserCart);
router.post("/removeCart", cartController.removeCart);
router.post("/updateCart", cartController.updateCart);

module.exports = router;
