const router = require("express").Router();
const bookController = require("../controller/bookCon");
const multer = require("multer");
const path = require("path");

const dynamicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirPath = path.join(__dirname, "../upload/bookimage");
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: dynamicStorage });

router.get("/bookData", bookController.bookData);
router.post("/addBook", upload.array("file"), bookController.addBook);
router.post("/updateBook", upload.array("file"), bookController.updateBook);
router.get("/getUserSellBook", bookController.getUserSellBook);
router.post("/getBookByCategory", bookController.getBookByCategory);
router.post("/getOneBook", bookController.getOneBook);
router.post("/getBookByFilter", bookController.getBookByFilter);




module.exports = router;
