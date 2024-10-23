const commentCon = require("../controller/comment");
const router = require("express").Router();

router.post("/addComment", commentCon.addComment);
router.get("/getAllComment", commentCon.getAllComment);
router.post("/addReplay", commentCon.addReplay);

module.exports = router;
