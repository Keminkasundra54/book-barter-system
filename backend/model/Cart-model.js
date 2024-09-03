const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = new mongoose.model("cart", cartSchema);
module.exports = Cart;
