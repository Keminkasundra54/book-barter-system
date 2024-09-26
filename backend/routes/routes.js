const router = require("express").Router();
const usercontroller = require("../controller/userCon");
const multer = require("multer");
const path = require("path");

const dynamicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirPath;
    if (file.fieldname === "file") {
      dirPath = path.join(__dirname, "../upload/bookimage");
    } else if (file.fieldname === "image") {
      dirPath = path.join(__dirname, "../upload/categoryimage");
    } else if (file.fieldname === "profile") {
      dirPath = path.join(__dirname, "../upload/profile");
    } else {
      dirPath = path.join(__dirname, "../upload/others");
    }
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: dynamicStorage });

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post("/resetpassword", usercontroller.resetpass);
router.post("/frgtpassword", usercontroller.frgtpassword);

router.post("/getUser", usercontroller.getUser);

router.post(
  "/updateProfile",
  upload.single("profile"),
  usercontroller.updateProfile
);

module.exports = router;
