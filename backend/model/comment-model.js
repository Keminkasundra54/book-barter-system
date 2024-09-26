const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = new mongoose.model("comment", CommentSchema);
module.exports = Comment;
