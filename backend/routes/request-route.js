const router = require("express").Router();
const requestController = require("../controller/requestCon");

router.post("/addBookRequest", requestController.addBookRequest);
router.get("/getRequestedBook", requestController.getRequestedBook);
router.post("/getAllDonateBook", requestController.getAllDonateBook);
router.post("/updateRequest", requestController.updateRequest);
router.post("/updateSellerRequest", requestController.updateSellerRequest);

module.exports = router;
