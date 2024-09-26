const commentCon = require("../controller/comment");
const router = require("express").Router();

router.post("/addComment", commentCon.addComment);
router.get("/getAllComment", commentCon.getAllComment);

module.exports = router;
