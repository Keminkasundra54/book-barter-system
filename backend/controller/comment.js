const Comment = require("../model/comment-model");
const User = require("../model/user-model");

exports.addComment = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = await User.findOne({ token: req.headers.token });
    const newComment = new Comment({
      name: name,
      email: email,
      message: message,
      user: user._id,
    });
    await newComment.save();

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllComment = async (req, res) => {
  try {
    const commentData = await Comment.find({}).populate({
      path: "user",
    });
    res.status(200).json({ message: "ok", data: commentData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
