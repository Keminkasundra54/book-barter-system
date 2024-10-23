const mongoose = require("mongoose");

const chatSchmema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require,
    },
    message: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = new mongoose.model("chat", chatSchmema);
module.exports = Chat;
