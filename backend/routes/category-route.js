const router = require("express").Router();
const categoryController = require("../controller/categoryCon");
const multer = require("multer");
const path = require("path");

const dynamicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirPath = path.join(__dirname, "../upload/categoryimage");
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: dynamicStorage });

router.post(
  "/addCategory",
  upload.single("image"),
  categoryController.addCategory
);
router.post(
  "/updateCategory",
  upload.single("image"),
  categoryController.updateCategory
);

router.get("/getAllCategory", categoryController.getAllCategory);
router.post("/removeCategory", categoryController.removeCategory);


module.exports = router;