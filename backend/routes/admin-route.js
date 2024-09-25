const adminController = require("../controller/adminCon");
const router = require("express").Router();

router.get("/getAllRequestedOrder", adminController.getAllRequestedOrder);
router.get("/getAllDeliverOrder", adminController.getAllDeliverOrder);
router.get("/getAllDonatedRequest", adminController.getAllDonatedRequest);
router.get("/getAllDonated", adminController.getAllDonated);

module.exports = router;
