const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = new mongoose.model("like", likeSchema);
module.exports = Like;
